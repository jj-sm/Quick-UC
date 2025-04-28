//
//  buttons.js
//  Quick UC
//
//  Created by Juan José Sánchez Medina on 27/04/25.
//

export const links = [
    {
        url: "https://portal.uc.cl/",
        imgSrc: chrome.runtime.getURL("images/buttons/uc-logo.svg"),
        imgAlt: "Portal UC Icon",
        label: "Portal UC",
        auth: "CAS"
    },
    {
        url: "https://outlook.office.com/mail/",
        imgSrc: chrome.runtime.getURL("images/buttons/outlook-logo.svg"),
        imgAlt: "Correo UC Icon",
        label: "Correo UC",
        auth: "Microsoft"
    },
    {
        url: "https://cursos.canvas.uc.cl/",
        imgSrc: chrome.runtime.getURL("images/buttons/canvas-logo.svg"),
        imgAlt: "Canvas Icon",
        label: "Canvas",
        auth: "CAS"
    },
    {
        url: "https://cas-v2.mat.uc.cl/jwt/login?app=labmat-v2",
        imgSrc: chrome.runtime.getURL("images/buttons/labmat-logo.svg"),
        imgAlt: "LABMAT Icon",
        label: "LABMAT",
        auth: "LABMAT"
    },
    {
        url: "https://intrawww.ing.puc.cl/siding/acceso/login.phtml?CAS=1",
        imgSrc: chrome.runtime.getURL("images/buttons/ing-logo.png"),
        imgAlt: "SIDING Icon",
        label: "SIDING",
        auth: "CAS"
    },
    {
        url: "https://bibliotecas.uc.cl/",
        imgSrc: chrome.runtime.getURL("images/buttons/biblioteca-logo.svg"),
        imgAlt: "Biblioteca Icon",
        label: "Biblioteca",
        auth: "None"
    },
    {
        url: "https://buscacursos.uc.cl/",
        imgSrc: chrome.runtime.getURL("images/buttons/buscacursos-logo.svg"),
        imgAlt: "BuscaCursos Icon",
        label: "BuscaCursos",
        auth: "None"
    },
    {
        url: "https://tarjeta.informatica.uc.cl/",
        imgSrc: chrome.runtime.getURL("images/buttons/tarjeta-logo.svg"),
        imgAlt: "Tarjeta UC Icon",
        label: "Tarjeta UC",
        auth: "CAS",
    },
    {
        url: "https://ubicate.osuc.dev/",
        imgSrc: chrome.runtime.getURL("images/buttons/ubicate-logo.svg"),
        imgAlt: "UbiCate Icon",
        label: "UbiCate",
        auth: "None"
    }
];

export const settingsButton = {
    url: "src/settings/settings.html",
    imgSrc: chrome.runtime.getURL("images/misc/settings.svg"),
    imgAlt: "Settings Icon",
    label: "Settings"
};