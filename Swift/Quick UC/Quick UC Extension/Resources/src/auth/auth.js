document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cas-login-form");
    const saveButton = document.getElementById("save-cas-info");
    const usernameChecker = document.getElementById("username-checker");
    const passwordInput = document.getElementById("password");
    const togglePasswordButton = document.getElementById("toggle-password");
  
    // Generate a key for AES encryption
    async function generateKey() {
      return crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );
    }
  
    // Encrypt data using AES
    async function encryptData(key, data) {
      const encoder = new TextEncoder();
      const encodedData = encoder.encode(data);
      const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
      const encrypted = await crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        key,
        encodedData
      );
      return {
        iv: Array.from(iv), // Store IV for decryption
        encrypted: Array.from(new Uint8Array(encrypted)), // Convert to array for storage
      };
    }
  
    // Decrypt data using AES
    async function decryptData(key, encryptedData) {
      const { iv, encrypted } = encryptedData;
      const ivArray = new Uint8Array(iv);
      const encryptedArray = new Uint8Array(encrypted);
      const decrypted = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: ivArray,
        },
        key,
        encryptedArray
      );
      const decoder = new TextDecoder();
      return decoder.decode(decrypted);
    }
  
    // Validate username
    function validateUsername(username) {
      if (username.includes("@uc.cl") || username.includes("uc.cl")) {
        usernameChecker.style.display = "block";
        usernameChecker.textContent = "Invalid username: UC domains are not allowed.";
        usernameChecker.style.color = "red";
        return false;
      }
      usernameChecker.style.display = "block";
      usernameChecker.textContent = "Username is valid!";
      usernameChecker.style.color = "lightgreen";
      return true;
    }
  
    // Toggle password visibility
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
    saveButton.addEventListener("click", async () => {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      if (!username || !password) {
        alert("Please fill in both fields.");
        return;
      }
  
      if (!validateUsername(username)) {
        alert("Please enter a valid username.");
        return;
      }
  
      // Generate encryption key
      const key = await generateKey();
  
      // Encrypt username and password
      const encryptedUsername = await encryptData(key, username);
      const encryptedPassword = await encryptData(key, password);
  
      // Save encrypted data to localStorage
      localStorage.setItem("casLoginInfo", JSON.stringify({
        username: encryptedUsername,
        password: encryptedPassword,
      }));
  
      alert("CAS Login Info saved successfully!");
    });
  });