(async () => {
  // Check if we are on the CAS login page
  if (window.location.href.includes("https://sso.uc.cl/cas/login")) {
    console.log("CAS login page detected.");

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
})();