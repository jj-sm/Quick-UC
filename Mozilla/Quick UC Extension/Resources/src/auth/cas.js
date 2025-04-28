(async () => {
  chrome.storage.local.get("autoLoginEnabled", (result) => {
    const isEnabled = result.autoLoginEnabled ?? true; // Default to true
    if (!isEnabled) {
      console.log("Auto Login is OFF. CAS script is sleeping.");
      return;
    }

    if (window.location.href.includes("https://sso.uc.cl/cas/login")) {
      console.log("CAS login page detected.");

      // Check for "Access Denied" message
      const accessDeniedMessage = document.querySelector('#content h2');
      if (accessDeniedMessage && accessDeniedMessage.textContent.includes("Access Denied")) {
        console.log("Access Denied detected. Triggering password issue popup.");
        triggerPasswordIssuePopup();
        return;
      }

      // Retrieve credentials from chrome.storage.local
      chrome.storage.local.get("casLoginInfo", (result) => {
        const casLoginInfo = result.casLoginInfo;
        if (!casLoginInfo) {
          console.warn("No CAS login info found in chrome.storage.local.");
          return;
        }

        const { username, password } = casLoginInfo;

        // Auto-fill the login form
        const usernameField = document.querySelector("#username");
        const passwordField = document.querySelector("#password");
        const loginButton = document.querySelector("button[type='submit']");

        if (usernameField && passwordField && loginButton) {
          console.log("Filling in the login form...");
          usernameField.value = username;
          passwordField.value = password;

          // Automatically submit the form
          console.log("Submitting the login form...");
          loginButton.click();
        } else {
          console.warn("CAS login form fields not found.");
        }
      });
    }
  });

  // Function to trigger the password issue popup
  function triggerPasswordIssuePopup() {
    // Disable auto-login
    chrome.storage.local.set({ autoLoginEnabled: false }, () => {
      console.log("Auto Login has been disabled due to password issues.");
    });

    // Create the popup
    const popup = document.createElement('div');
    popup.id = 'password-issue-popup';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.color = 'black';
    popup.style.padding = '20px';
    popup.style.border = '1px solid #ccc';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popup.style.zIndex = '1000';
    popup.style.textAlign = 'center';

    const message = document.createElement('p');
    message.textContent = "It seems your password might be incorrect. Please update it in the settings.";

    const link = document.createElement('a');
    link.href = chrome.runtime.getURL('settings.html');
    link.textContent = "Go to Settings";
    link.style.display = 'block';
    link.style.marginTop = '10px';
    link.style.color = '#007bff';
    link.style.textDecoration = 'none';

    const closeButton = document.createElement('button');
    closeButton.textContent = "Close";
    closeButton.style.marginTop = '15px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.backgroundColor = '#007bff';
    closeButton.style.color = 'white';
    closeButton.style.cursor = 'pointer';

    closeButton.addEventListener('click', () => {
      popup.remove();
    });

    popup.appendChild(message);
    popup.appendChild(link);
    popup.appendChild(closeButton);

    document.body.appendChild(popup);
  }
})();