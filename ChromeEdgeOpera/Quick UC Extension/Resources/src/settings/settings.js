import { links } from '../buttons.js';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("settings-container");
  const saveButton = document.getElementById("save-button");

  // Load from localStorage
  const savedPreferences = JSON.parse(localStorage.getItem("selectedLinks") || "[]");

  // from buttons.js
  links.forEach((link) => {
    const button = document.createElement("button");
    button.className = "this-button";
    button.dataset.url = link.url;
    button.dataset.auth = link.auth;

    // logo
    const img = document.createElement("img");
    img.src = link.imgSrc;
    img.alt = link.imgAlt;

    // label & span
    const span = document.createElement("span");
    span.className = "button-label";
    span.textContent = link.label;

    // append img and span to button
    button.appendChild(img);
    button.appendChild(span);

    // add it to selected
    if (savedPreferences.includes(link.label)) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      button.classList.toggle("selected");
    });

    container.appendChild(button);
  });

  // Save selected buttons to localStorage
  saveButton.addEventListener("click", () => {
    const selectedButtons = Array.from(
      container.querySelectorAll(".this-button.selected")
    ).map((btn) => btn.querySelector(".button-label").textContent);

    localStorage.setItem("selectedLinks", JSON.stringify(selectedButtons));
    alert("Preferences saved!");
  });
});