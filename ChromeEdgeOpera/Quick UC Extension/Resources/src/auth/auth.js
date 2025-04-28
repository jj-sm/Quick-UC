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
      usernameChecker.textContent = "Invalid username: Only UC username is allowed. (manuech2m)";
      usernameChecker.style.color = "red";
      return false;
    }
    usernameChecker.style.display = "block";
    usernameChecker.textContent = "Username is valid!";
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
      labmatUsernameChecker.textContent = "Invalid username: Must be an email ending with .uc.cl";
      labmatUsernameChecker.style.color = "red";
      return false;
    }
  
    labmatUsernameChecker.style.display = "block";
    labmatUsernameChecker.textContent = "Username is valid!";
    labmatUsernameChecker.style.color = "lightgreen";
    return true;
  }

  // Toggle CAS password visibility
  togglePasswordButton.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePasswordButton.src = "../../images/misc/eye-off.svg"; // Switch to "eye-off" icon
    } else {
      passwordInput.type = "password";
      togglePasswordButton.src = "../../images/misc/eye.svg"; // Switch to "eye" icon
    }
  });

  // Save CAS Login Info
  saveButton.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
      alert("Please fill in both fields.");
      return;
    }

    if (!validateCASUsername(username)) {
      alert("Please enter a valid username.");
      return;
    }

    // Save credentials to chrome.storage.local
    chrome.storage.local.set({ casLoginInfo: { username, password } }, () => {
      console.log("CAS Login Info saved to chrome.storage.local.");
      alert("CAS Login Info saved successfully!");
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
      alert("Please fill in both fields.");
      return;
    }

    if (!validateLabMatUsername(username)) {
      alert("Please enter a valid LabMat username.");
      return;
    }

    // Save credentials to chrome.storage.local
    chrome.storage.local.set({ labmatLoginInfo: { username, password } }, () => {
      console.log("LabMat Login Info saved to chrome.storage.local.");
      alert("LabMat Login Info saved successfully!");
    });
  });
});