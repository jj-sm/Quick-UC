# Quick-UC 
**Safari Extension for Pontificia Universidad Católica de Chile (PUC) Students**

This project is a browser extension that allows users to auto-login into the most frequent websites used by students at the University.

>[!CAUTION]
>**Privacy** 🔐
>
>_(See below, section: How to use?)_
>
>The credentials (username/password)) you give the extension **ARE NEVER** send to us, they're stored locally on your computer.
>We will never have access to that information.


<p align="center">
  <img height="400" alt="Landing Banner" src="https://jj-sm.github.io/Quick-UC/brand/landing-1.png">
</p>

\* _Project not affiliated with the university._


> [!NOTE]
> Inspired by [directUC](https://github.com/wachunei/directUC) • Updated (for Chromium based browsers) and added support for Safari 

---

## Installation 🗂️

### Non-Safari Browsers

>[!DANGER]
>Currently the extension is under revision for the browsers below. (TBD) In the future you will be able to download the extension direclty from the browser.
>For now, you can go to the latest release and download the `.crx` or `.zip` of the extension.

<a href="https://chromewebstore.google.com/detail/nbeicnbapmgfgkpijpaafihppjpmicmc?utm_source=item-share-cb">
  <img src="https://jj-sm.github.io/Quick-UC/imgs/chrome.png" height="60" />
</a>
<a href="https://addons.mozilla.org/es-ES/firefox/addon/quick-uc/">
  <img src="https://jj-sm.github.io/Quick-UC/imgs/firefox.png" height="60" />
</a>
<a href="">
  <img src="https://jj-sm.github.io/Quick-UC/imgs/opera.png" height="60" />
</a>
<a href="">
  <img src="https://jj-sm.github.io/Quick-UC/imgs/edge.png" height="60" />
</a>


### Safari (macOS only) 🍎

1. **[Download the DMG installer](https://github.com/jj-sm/Quick-UC/releases/download/v1.2/QuickUC-Installer.dmg)**
2. Open the `.dmg` file and drag `Quick-UC.app` to your `Applications` folder
3. Enable in Safari

>[!NOTE]
> You might be prompted with a warning of an unidentified developer this happens because macOS shows this alert due to the following reasons:
> - The app isn't notarized (you are required to have an $99/year Apple Developer account (I don't))
> - It's distributed outside the App Store  
> - 🔒 Your security isn't compromised - [verify the code yourself](https://github.com/jj-sm/Quick-UC)

---

## How to use?
You have the posibility to customize the layout of your Quick UC shorcuts. Head to the extension and then settings. Where you can add your accounts for CAS Login (used by: portal uc, canvas, tarjeta uc, siding) or labmat credentials.

Also you can select which services you want to display.
<p align="center">
<img height="500" alt="Settings Picture" src="https://jj-sm.github.io/Quick-UC/brand/landing-2.png" />
</p>

>[!CAUTION]
>You always have the option to disable auto-login if it fails.
>1. Head to the extension
>2. Scroll down to auto-login toggle
>3. Set it to ON or OFF depending your case

## Featured Services ⚙️
One-click access to PUC's essential platforms:

| Service | URL |
|---------|-----|
| Portal UC | [portal.uc.cl](https://portal.uc.cl/) |
| Canvas | [cursos.canvas.uc.cl](https://cursos.canvas.uc.cl/) |
| LABMAT | [labmat.puc.cl](https://labmat.puc.cl/) |
| SIDING | [intrawww.ing.puc.cl](http://intrawww.ing.puc.cl/siding/index.phtml) |
| Biblioteca UC | [bibliotecas.uc.cl](https://bibliotecas.uc.cl/) |
| BuscaCursos | [buscacursos.uc.cl](https://buscacursos.uc.cl/) |
| Tarjeta UC | [tarjeta.informatica.uc.cl](https://tarjeta.informatica.uc.cl/) |
| UbiCate | [ubicate.osuc.dev](https://ubicate.osuc.dev/) |

---

## Developers

### Contributing
You're very welcome to contribute. The project relies on three identical directories `Swift`, `ChromeEdgeOpera` and `Mozilla`. They share most of the code but some exceptions when handling local storage (e.g. `broser.*` vs `chrome.*`) or some browser specific methods. Also they have different `manifest.json`.

#### Swift (Safari)
If you want to contribute to the safari extension you have to keep in mind that you have to use Xcode to compile the app. Then, there's a script to convert it to an image. 

>[!CAUTION]
>The imports, exports and other relative paths **work** differently in the safari extension. Because the compiler puts "virtually" all files under the same level.

#### Mozilla
Development process for the mozilla extension is mostly the same but you have to keep in mind that in `manifest.json` it uses `v2` while all the others use `v3`.

#### Chromium based browsers
Development process is the same for the tree browsers. The only changes can be how you import your extension into your browser but everything keeps being the same.
