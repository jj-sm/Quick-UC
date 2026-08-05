#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import tempfile
import zipfile
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
DIST_DIR = REPO_ROOT / "dist"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Export Quick UC browser releases into dist/ for Chromium, Firefox, and Safari."
    )
    parser.add_argument(
        "version",
        nargs="?",
        help="Release version to stamp into the exported artifacts.",
    )
    parser.add_argument(
        "-v",
        "--version",
        dest="version_flag",
        help="Release version to stamp into the exported artifacts.",
    )
    parser.add_argument(
        "--dist-dir",
        default=str(DIST_DIR),
        help="Output directory for the exported artifacts.",
    )
    return parser.parse_args()


def resolve_version(args: argparse.Namespace) -> str:
    version = args.version_flag or args.version
    if not version:
        raise SystemExit("A version must be provided, for example: python scripts/export_release.py 1.2.3")
    return version


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def copy_tree_contents(source_dir: Path, destination_dir: Path) -> None:
    ensure_dir(destination_dir)
    for item in source_dir.iterdir():
        target = destination_dir / item.name
        if item.is_dir():
            shutil.copytree(item, target)
        else:
            shutil.copy2(item, target)


def update_manifest_version(manifest_path: Path, version: str) -> None:
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    manifest["version"] = version
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


def zip_directory(source_dir: Path, destination_zip: Path) -> None:
    ensure_dir(destination_zip.parent)
    with zipfile.ZipFile(destination_zip, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(source_dir.rglob("*")):
            if path.is_file():
                archive.write(path, path.relative_to(source_dir).as_posix())


def export_browser_zip(browser_name: str, resource_dir: Path, output_name: str, version: str, dist_dir: Path) -> Path:
    with tempfile.TemporaryDirectory(prefix=f"quick-uc-{browser_name}-") as temp_dir:
        stage_dir = Path(temp_dir) / browser_name
        copy_tree_contents(resource_dir, stage_dir)
        update_manifest_version(stage_dir / "manifest.json", version)

        zip_path = dist_dir / f"{output_name}-{version}.zip"
        zip_directory(stage_dir, zip_path)
        return zip_path


def run_command(command: list[str], *, cwd: Path | None = None) -> None:
    try:
        subprocess.run(command, cwd=cwd, check=True)
    except subprocess.CalledProcessError as error:
        raise RuntimeError(f"Command failed: {' '.join(command)}") from error


def build_safari_app(version: str, dist_dir: Path) -> Path:
    project_dir = REPO_ROOT / "Swift/Quick UC"
    project_path = project_dir / "Quick UC.xcodeproj"
    manifest_path = project_dir / "Quick UC Extension/Resources/manifest.json"

    original_manifest = manifest_path.read_text(encoding="utf-8")

    with tempfile.TemporaryDirectory(prefix="quick-uc-safari-") as temp_dir:
        temp_path = Path(temp_dir)
        derived_data_path = temp_path / "DerivedData"

        try:
            update_manifest_version(manifest_path, version)

            try:
                run_command(
                    [
                        "xcodebuild",
                        "-project",
                        str(project_path),
                        "-scheme",
                        "Quick UC",
                        "-configuration",
                        "Release",
                        "-derivedDataPath",
                        str(derived_data_path),
                        f"MARKETING_VERSION={version}",
                        "CURRENT_PROJECT_VERSION=1",
                        "build",
                    ],
                    cwd=project_dir,
                )
            except RuntimeError as error:
                raise RuntimeError(
                    "Safari export could not start because xcodebuild failed. "
                    "This Xcode installation appears to be missing or has mismatched components. "
                    "Run `xcodebuild -runFirstLaunch` or reinstall/update Xcode, then retry."
                ) from error

            built_app = next(
                (
                    path
                    for path in derived_data_path.glob("Build/Products/Release/*.app")
                    if path.name == "Quick UC.app"
                ),
                None,
            )
            if built_app is None:
                raise RuntimeError("Could not locate the built Quick UC.app in DerivedData.")

            staging_dir = temp_path / "dmg-staging"
            ensure_dir(staging_dir)
            staged_app = staging_dir / built_app.name
            shutil.copytree(built_app, staged_app)

            dmg_path = dist_dir / f"Quick-UC-Safari-{version}.dmg"
            run_command(
                [
                    "hdiutil",
                    "create",
                    "-ov",
                    "-volname",
                    "QuickUC",
                    "-srcfolder",
                    str(staged_app),
                    "-format",
                    "UDZO",
                    str(dmg_path),
                ]
            )
            return dmg_path
        finally:
            manifest_path.write_text(original_manifest, encoding="utf-8")


def main() -> int:
    args = parse_args()
    version = resolve_version(args)
    dist_dir = Path(args.dist_dir).resolve()
    ensure_dir(dist_dir)

    chromium_zip = export_browser_zip(
        "chromium",
        REPO_ROOT / "ChromeEdgeOpera/Quick UC Extension/Resources",
        "Quick-UC-Chromium",
        version,
        dist_dir,
    )
    firefox_zip = export_browser_zip(
        "mozilla",
        REPO_ROOT / "Mozilla/Quick UC Extension/Resources",
        "Quick-UC-Mozilla",
        version,
        dist_dir,
    )
    safari_dmg = build_safari_app(version, dist_dir)

    print("Exported:")
    print(f"- {chromium_zip}")
    print(f"- {firefox_zip}")
    print(f"- {safari_dmg}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())