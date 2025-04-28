(async () => {
    chrome.storage.local.get("autoLoginEnabled", (result) => {
      const isEnabled = result.autoLoginEnabled ?? true; // Default to true if not set
      if (!isEnabled) {
        console.log("Auto Login is OFF. LabMat script is sleeping.");
        return;
      }
  
      if (window.location.href.includes("https://cas-v2.mat.uc.cl/jwt/login?app=labmat-v2")) {
        console.log("LabMat login page detected.");
  
        // Retrieve LabMat credentials from chrome.storage.local
        chrome.storage.local.get("labmatLoginInfo", (result) => {
          const labmatLoginInfo = result.labmatLoginInfo;
  
          if (!labmatLoginInfo || !labmatLoginInfo.username || !labmatLoginInfo.password) {
            console.warn("No LabMat login info found in chrome.storage.local.");
            return;
          }
  
          const { username, password } = labmatLoginInfo;
  
          // Fill in the login form
          const emailField = document.querySelector('input[name="login"]');
          const passwordField = document.querySelector('input[name="password"]');
          const loginForm = document.querySelector('form#login');
          const submitButton = document.querySelector('button[type="submit"]');
  
          if (emailField && passwordField && loginForm) {
            console.log("Filling in the LabMat login form...");
            emailField.value = username;
            passwordField.value = password;
  
            // Submit the form programmatically
            console.log("Submitting the LabMat login form...");
            if (submitButton) {
              console.log("Clicking the submit button...");
              submitButton.click(); // Simulate a button click
            } else {
              console.log("Forcing form submission...");
              loginForm.onsubmit = null; // Disable any onsubmit event listeners
              loginForm.submit(); // Force form submission
            }
          } else {
            if (!emailField) console.warn("Email field not found.");
            if (!passwordField) console.warn("Password field not found.");
            if (!loginForm) console.warn("Login form not found.");
          }
        });
      }
  
      // Redirect logic after login
      if (window.location.href.includes("https://www.labmat.puc.cl/avisos#")) {
        console.log("Redirecting to the LabMat dashboard...");
        window.location.href = "https://www.labmat.puc.cl/";
      }
  
      // Handle blank page with error message
      if (document.body.innerText.includes('{"error":"Method is invalid.","success":0,"successText":"error"}')) {
        console.error("Blank page detected with error message.");
        alert("An error occurred during login. Please try again.");
        window.location.href = "https://cas-v2.mat.uc.cl/jwt/login?app=labmat-v2"; // Redirect back to the login page
      }
    });
  })();