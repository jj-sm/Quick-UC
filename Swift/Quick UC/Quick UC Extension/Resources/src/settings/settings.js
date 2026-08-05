import { links } from '../buttons.js';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("settings-container");
  const saveButton = document.getElementById("save-button");

  // Load saved preferences from localStorage
  const savedPreferences = JSON.parse(localStorage.getItem("selectedLinks") || "[]");

  // Set placeholders dynamically for input fields
  document.getElementById("username").placeholder = chrome.i18n.getMessage("cas_username_placeholder");
  document.getElementById("password").placeholder = chrome.i18n.getMessage("cas_password_placeholder");
  document.getElementById("labmat-username").placeholder = chrome.i18n.getMessage("labmat_username_placeholder");
  document.getElementById("labmat-password").placeholder = chrome.i18n.getMessage("labmat_password_placeholder");

  // Automatically translate elements with data-i18n attributes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const message = chrome.i18n.getMessage(el.getAttribute("data-i18n"));
    if (message) {
      el.textContent = message;
    }
  });

  // Dynamically populate buttons from links.js
  links.forEach((link) => {
    const button = document.createElement("button");
    button.className = "this-button";
    button.dataset.url = link.url;
    button.dataset.auth = link.auth;

    // Add logo
    const img = document.createElement("img");
    img.src = link.imgSrc;
    img.alt = link.imgAlt;

    // Add label
    const span = document.createElement("span");
    span.className = "button-label";
    span.textContent = link.label;

    // Append logo and label to button
    button.appendChild(img);
    button.appendChild(span);

    // Mark as selected if in saved preferences
    if (savedPreferences.includes(link.label)) {
      button.classList.add("selected");
    }

    // Toggle selection on click
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
    alert(chrome.i18n.getMessage("settings_preferences_saved"));
  });
});