//
//  buttons.js
//  Quick UC
//
//  Created by Juan José Sánchez Medina on 27/04/25.
//

export const links = [
    {
        url: "https://portal.uc.cl/",
        imgSrc: "images/buttons/uc-logo.svg",
        imgAlt: "Portal UC Icon",
        label: "Portal UC",
        auth: "CAS"
    },
    {
        url: "https://outlook.office.com/mail/",
        imgSrc: "images/buttons/outlook-logo.svg",
        imgAlt: "Correo UC Icon",
        label: chrome.i18n.getMessage("button_mail_uc"),
        auth: "Microsoft"
    },
    {
        url: "https://cursos.canvas.uc.cl/",
        imgSrc: "images/buttons/canvas-logo.svg",
        imgAlt: "Canvas Icon",
        label: "Canvas",
        auth: "CAS"
    },
    {
        url: "https://cas-v2.mat.uc.cl/jwt/login?app=labmat-v2",
        imgSrc: "images/buttons/labmat-logo.svg",
        imgAlt: "LABMAT Icon",
        label: "LABMAT",
        auth: "LABMAT"
    },
    {
        url: "https://intrawww.ing.puc.cl/siding/acceso/login.phtml?CAS=1",
        imgSrc: "images/buttons/ing-logo.png",
        imgAlt: "SIDING Icon",
        label: "SIDING",
        auth: "CAS"
    },
    {
        url: "https://bibliotecas.uc.cl/",
        imgSrc: "images/buttons/biblioteca-logo.svg",
        imgAlt: "Biblioteca Icon",
        label: chrome.i18n.getMessage("button_library_uc"),
        auth: "None"
    },
    {
        url: "https://buscacursos.uc.cl/",
        imgSrc: "images/buttons/buscacursos-logo.svg",
        imgAlt: "BuscaCursos Icon",
        label: "BuscaCursos",
        auth: "None"
    },
    {
        url: "https://tarjeta.informatica.uc.cl/",
        imgSrc: "images/buttons/tarjeta-logo.svg",
        imgAlt: "Tarjeta UC Icon",
        label: "TUC",
        auth: "CAS",
    },
    {
        url: "https://ubicate.osuc.dev/",
        imgSrc: "images/buttons/ubicate-logo.svg",
        imgAlt: "UbiCate Icon",
        label: "UbiCate",
        auth: "None"
        
    }
];

export const settingsButton = {
    url: "settings.html",
    imgSrc: "images/misc/settings.svg",
    imgAlt: "Settings Icon",
    label: "Settings"
};