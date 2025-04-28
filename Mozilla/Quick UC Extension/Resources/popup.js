import { links, settingsButton } from './src/buttons.js';

console.log('Imported links:', links);
console.log('Imported settingsButton:', settingsButton);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('button-container');

  // Filter buttons from localStorage for saved links
  const selected = JSON.parse(localStorage.getItem('selectedLinks') || "[]");
  links.filter(link => selected.includes(link.label)).forEach(link => {
    const button = document.createElement('button');
    button.className = 'button';
    button.dataset.url = link.url;
    button.dataset.auth = link.auth;

    const img = document.createElement('img');
    img.src = link.imgSrc;
    img.alt = link.imgAlt;

    const span = document.createElement('span');
    span.className = 'button-label';
    span.textContent = link.label;

    button.appendChild(img);
    button.appendChild(span);

    button.addEventListener("click", async () => {
      if (link.auth === "CAS") {
        const casLoginUrl = `https://sso.uc.cl/cas/login?service=${encodeURIComponent(link.url)}`;
        chrome.tabs.create({ url: link.url }); // Open the original link
      } else {
        // Redirect directly for non-CAS links
        chrome.tabs.create({ url: link.url });
      }
    });

    container.appendChild(button);
  });

  // Init Settings button
  const settingsBtn = document.createElement('button');
  settingsBtn.id = 'settings-button';
  settingsBtn.className = 'button';

  const settingsImg = document.createElement('img');
  settingsImg.src = settingsButton.imgSrc;
  settingsImg.alt = settingsButton.imgAlt;

  const settingsSpan = document.createElement('span');
  settingsSpan.className = 'button-label';
  settingsSpan.textContent = settingsButton.label;

  settingsBtn.appendChild(settingsImg);
  settingsBtn.appendChild(settingsSpan);

  settingsBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: settingsButton.url });
  });

  container.appendChild(settingsBtn);

  // Add Auto-Login Toggle Button
  const toggleButton = document.createElement('button');
  toggleButton.id = 'toggle-auto-login';
  toggleButton.style.display = 'flex'; // Use flexbox for centering
  toggleButton.style.justifyContent = 'center'; // Horizontally center content
  toggleButton.style.alignItems = 'center'; // Vertically center content
  toggleButton.style.backgroundColor = 'red';
  toggleButton.style.color = 'white';
  toggleButton.style.padding = '10px';
  toggleButton.style.border = 'none';
  toggleButton.style.borderRadius = '5px';
  toggleButton.style.cursor = 'pointer';
  toggleButton.textContent = 'Auto Login: OFF';

  // Initialize the button state from chrome.storage.local
  chrome.storage.local.get("autoLoginEnabled", (result) => {
    const isEnabled = result.autoLoginEnabled ?? true; // Default to true
    console.log("Auto Login Enabled:", result.autoLoginEnabled);
    updateButtonState(isEnabled);
  });

  // Add click event listener to toggle the state
  toggleButton.addEventListener('click', () => {
    chrome.storage.local.get("autoLoginEnabled", (result) => {
      const currentState = result.autoLoginEnabled ?? true;
      const newState = !currentState;

      // Update the state in chrome.storage.local
      chrome.storage.local.set({ autoLoginEnabled: newState }, () => {
        console.log(`Auto Login is now ${newState ? 'ON' : 'OFF'}`);
        updateButtonState(newState);
      });
    });
  });

  // Update the button's appearance and text
  function updateButtonState(isEnabled) {
    toggleButton.style.backgroundColor = isEnabled ? 'green' : 'red';
    toggleButton.textContent = `Auto Login: ${isEnabled ? 'ON' : 'OFF'}`;
  }

  container.appendChild(toggleButton);
});