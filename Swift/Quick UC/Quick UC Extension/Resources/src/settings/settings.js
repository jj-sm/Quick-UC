import { links } from '../buttons.js';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("settings-container");
  const saveButton = document.getElementById("save-button");
  const languageToggle = document.getElementById("language-toggle");

  // Load saved preferences from localStorage
  const savedPreferences = JSON.parse(localStorage.getItem("selectedLinks") || "[]");

  // Load saved language from chrome.storage.local
  chrome.storage.local.get("language", (result) => {
    const savedLanguage = result.language || "es"; // Default to Spanish
    setLanguage(savedLanguage, false); // Initialize without reloading
  });

  // Event listener for language toggle
  languageToggle.addEventListener("click", () => {
    const currentLanguage = languageToggle.textContent;
    const newLanguage = currentLanguage === "ES" ? "en" : "es";
    setLanguage(newLanguage, true); // Change language and reload
  });

  function setLanguage(language, shouldReload) {
    // Save language to chrome.storage.local
    chrome.storage.local.set({ language }, () => {
      console.log(`Language set to: ${language}`);
    });

    // Update the toggle button text
    languageToggle.textContent = language.toUpperCase();

    // Reload the page only if necessary
    if (shouldReload) {
      location.reload();
    } else {
      applyTranslations(); // Apply translations without reloading
    }
  }

  function applyTranslations() {
    // Replace placeholders with localized messages
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const message = chrome.i18n.getMessage(el.getAttribute("data-i18n"));
      if (message) {
        el.textContent = message;
      }
    });

    // Set placeholders dynamically for input fields
    document.getElementById("username").placeholder = chrome.i18n.getMessage("cas_username_placeholder");
    document.getElementById("password").placeholder = chrome.i18n.getMessage("cas_password_placeholder");
    document.getElementById("labmat-username").placeholder = chrome.i18n.getMessage("labmat_username_placeholder");
    document.getElementById("labmat-password").placeholder = chrome.i18n.getMessage("labmat_password_placeholder");
  }

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