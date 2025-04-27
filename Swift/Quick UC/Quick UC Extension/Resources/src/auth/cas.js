(async () => {
    // Check if we are on the CAS login page
    if (window.location.href.includes("https://sso.uc.cl/cas/login")) {
      console.log("CAS login page detected.");
  
      // Retrieve encrypted credentials from localStorage
      const casLoginInfo = JSON.parse(localStorage.getItem("casLoginInfo"));
      if (!casLoginInfo) {
        console.warn("No CAS login info found in localStorage.");
        return;
      }
  
      try {
        // Generate or retrieve the encryption key
        const key = await deriveKey("your-secure-passphrase"); // Replace with a secure method
  
        // Decrypt the credentials
        const username = await decryptData(key, casLoginInfo.username);
        const password = await decryptData(key, casLoginInfo.password);
  
        console.log("Decrypted username and password retrieved.");
  
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
      } catch (error) {
        console.error("Error during decryption or form auto-fill:", error);
      }
    }
  })();