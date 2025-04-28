document.addEventListener("DOMContentLoaded", () => {
  // CAS Login Info Elements
  const saveButton = document.getElementById("save-cas-info");
  const usernameChecker = document.getElementById("username-checker");
  const passwordInput = document.getElementById("password");
  const togglePasswordButton = document.getElementById("toggle-password");

  // LabMat Login Info Elements
  const saveLabMatButton = document.getElementById("save-labmat-info");
  const labmatUsernameChecker = document.getElementById("labmat-username-checker");
  const labmatPasswordInput = document.getElementById("labmat-password");
  const toggleLabMatPasswordButton = document.getElementById("toggle-labmat-password");

  // Validate CAS username
  function validateCASUsername(username) {
    if (username.includes("@uc.cl") || username.includes("uc.cl") || username.includes("@") ) {
      usernameChecker.style.display = "block";
      usernameChecker.textContent = chrome.i18n.getMessage("invalid_username_message");
      usernameChecker.style.color = "red";
      return false;
    }
    usernameChecker.style.display = "block";
    usernameChecker.textContent = chrome.i18n.getMessage("valid_username_message");
    usernameChecker.style.color = "lightgreen";
    return true;
  }

  // Validate LabMat username
  function validateLabMatUsername(username) {
    if (!labmatUsernameChecker) {
      console.error("LabMat username checker element not found.");
      return false;
    }
  
    // Check if the username contains @ and ends with .uc.cl
    const isValid = username.includes("@") && username.endsWith(".uc.cl");
  
    if (!isValid) {
      labmatUsernameChecker.style.display = "block";
      labmatUsernameChecker.textContent = chrome.i18n.getMessage("invalid_labmat_username_message");
      labmatUsernameChecker.style.color = "red";
      return false;
    }
  
    labmatUsernameChecker.style.display = "block";
    labmatUsernameChecker.textContent = chrome.i18n.getMessage("valid_username_message");
    labmatUsernameChecker.style.color = "lightgreen";
    return true;
  }

  // Toggle CAS password visibility
  togglePasswordButton.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePasswordButton.src = "../../images/misc/eye-off.svg";
    } else {
      passwordInput.type = "password";
      togglePasswordButton.src = "../../images/misc/eye.svg"; 
    }
  });

  // Save CAS Login Info
  saveButton.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
      alert(chrome.i18n.getMessage("cas_issue_1"));
      return;
    }

    if (!validateCASUsername(username)) {
      alert(chrome.i18n.getMessage("cas_issue_2"));
      return;
    }

    // Save credentials to chrome.storage.local
    chrome.storage.local.set({ casLoginInfo: { username, password } }, () => {
      console.log("CAS Login Info saved to chrome.storage.local.");
      alert(chrome.i18n.getMessage("cas_alert"));
    });
  });

  // Toggle LabMat password visibility
  toggleLabMatPasswordButton.addEventListener("click", () => {
    if (labmatPasswordInput.type === "password") {
      labmatPasswordInput.type = "text";
      toggleLabMatPasswordButton.src = "../../images/misc/eye-off.svg"; // Switch to "eye-off" icon
    } else {
      labmatPasswordInput.type = "password";
      toggleLabMatPasswordButton.src = "../../images/misc/eye.svg"; // Switch to "eye" icon
    }
  });

  // Save LabMat Login Info
  saveLabMatButton.addEventListener("click", () => {
    const username = document.getElementById("labmat-username").value;
    const password = document.getElementById("labmat-password").value;

    if (!username || !password) {
      alert(chrome.i18n.getMessage("cas_issue_1"));
      return;
    }

    if (!validateLabMatUsername(username)) {
      alert(chrome.i18n.getMessage("lm_issue_2"));
      return;
    }

    // Save credentials to chrome.storage.local
    chrome.storage.local.set({ labmatLoginInfo: { username, password } }, () => {
      console.log("LabMat Login Info saved to chrome.storage.local.");
      alert(chrome.i18n.getMessage("lm_alert"));
    });
  });
});