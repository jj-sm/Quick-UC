document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById('button-container');
  const { links, settingsButton, calendarButton } = window.QuickUCButtons;

  // Get current tab
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const tab = tabs[0];

  // Add Calendar button if on BuscaCursos
  if (tab && tab.url && tab.url.includes("buscacursos.uc.cl")) {
    const calendarBtn = document.createElement('button');
    calendarBtn.id = 'calendar-button';
    calendarBtn.className = 'button'; // use same style as quick links

    const img = document.createElement('img');
    img.src = calendarButton.imgSrc;
    img.alt = calendarButton.imgAlt;

    const span = document.createElement('span');
    span.className = 'button-label';
    span.textContent = calendarButton.label;

    calendarBtn.appendChild(img);
    calendarBtn.appendChild(span);

    calendarBtn.addEventListener('click', async () => {
      try {
        await browser.tabs.sendMessage(tab.id, { action: "fetchCalendar" });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    container.insertBefore(calendarBtn, container.firstChild);
  }

  // Load selected quick links
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

    button.addEventListener("click", () => {
      if (link.auth === "CAS") {
        const casLoginUrl = `https://sso.uc.cl/cas/login?service=${encodeURIComponent(link.url)}`;
        browser.tabs.create({ url: link.url });
      } else {
        browser.tabs.create({ url: link.url });
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
    browser.tabs.create({ url: settingsButton.url });
  });

  container.appendChild(settingsBtn);

  // Add Auto-Login Toggle Button
  const toggleButton = document.createElement('button');
  toggleButton.id = 'toggle-auto-login';
  toggleButton.style.display = 'flex';
  toggleButton.style.justifyContent = 'center';
  toggleButton.style.alignItems = 'center';
  toggleButton.style.backgroundColor = 'red';
  toggleButton.style.color = 'white';
  toggleButton.style.padding = '20px';
  toggleButton.style.border = 'none';
  toggleButton.style.borderRadius = '5px';
  toggleButton.style.cursor = 'pointer';
  toggleButton.textContent = 'Auto Login: OFF';

  browser.storage.local.get("autoLoginEnabled", (result) => {
    const isEnabled = result.autoLoginEnabled !== undefined ? result.autoLoginEnabled : true;
    updateButtonState(isEnabled);
  });

  toggleButton.addEventListener('click', () => {
    browser.storage.local.get("autoLoginEnabled", (result) => {
      const currentState = result.autoLoginEnabled !== undefined ? result.autoLoginEnabled : true;
      const newState = !currentState;

      browser.storage.local.set({ autoLoginEnabled: newState }, () => {
        console.log(`Auto Login is now ${newState ? 'ON' : 'OFF'}`);
        updateButtonState(newState);
      });
    });
  });

  function updateButtonState(isEnabled) {
    toggleButton.style.backgroundColor = isEnabled ? 'green' : 'red';
    toggleButton.textContent = `Auto Login: ${isEnabled ? 'ON' : 'OFF'}`;
  }

  container.appendChild(toggleButton);
});
