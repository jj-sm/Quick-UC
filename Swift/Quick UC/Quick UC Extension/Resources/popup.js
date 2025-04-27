import { links, settingsButton } from './buttons.js';

// const debugDiv = document.createElement('div');
// debugDiv.style.padding = '10px';
// debugDiv.style.marginTop = '10px';
// debugDiv.style.border = '1px solid #ccc';
// debugDiv.innerHTML = `<p>Links loaded: ${links ? links.length : 'none'}</p>`;
// document.body.appendChild(debugDiv);

console.log('Imported links:', links);
console.log('Imported settingsButton:', settingsButton);


document.addEventListener("DOMContentLoaded", () => {
  const selected = JSON.parse(localStorage.getItem('selectedLinks') || "[]");
  const container = document.getElementById('button-container');

  // Filter buttons from localStorage
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
        browser.tabs.create({ url: link.url }); // Open the original link
      } else {
        // Redirect directly for non-CAS links
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
});