class Header extends HTMLElement {
    constructor() {
        super();
    }

    
connectedCallback() {
    this.innerHTML = `
        <header>
            <section class="header">
                <img class="menu-icon" src="assets/icons/hamburger-menu-icon.svg">
                <span class="header-title">Web 1 <span class="title-section header-title hide">&nbsp;-
                        Inicio</span></span>
            </section>

            <nav class="navbar hide">
                <div class="navbar-links">
                    <ul>
                        <a href="index.html">
                            <li class="navbar-link">Inicio</li>
                        </a>
                        <a href="resources.html">
                            <li class="navbar-link">Material</li>
                        </a>
                        <a href="students.html">
                            <li class="navbar-link">Alumnos</li>
                        </a>
                        <a href="contact.html">
                            <li class="navbar-link">Contacto</li>
                        </a>
                    </ul>
                </div>
                <div class="theme-container">
                    <img class="theme-icon menu-icon" src="assets/icons/dark-mode.svg">
                </div>
            </nav>
        </header>
    `;
    }
}

document.addEventListener("DOMContentLoaded", setUpHeader);

function setUpHeader() {
    const body = document.querySelector('#body');
    const menuBtn = document.querySelector('.menu-icon');
    const navbar = document.querySelector('.navbar');
    const themeIcon = document.querySelector('.theme-icon');
    
    let menuOpen = false;
    let theme;
    
    menuBtn.addEventListener('click', menuIconHandler);
    themeIcon.addEventListener('click', themeIconHandler);
    
    function themeHandler() {
        theme = localStorage.getItem("theme");
        body.classList.remove('dark-theme');
        if (theme) {
            body.classList.remove('light-theme');
            body.classList.add(theme);
        } else {
            localStorage.setItem("theme", "light-theme");
            body.classList.add("light-theme");
        }
    }
    
    function menuIconHandler() {
        if(!menuOpen) {
            openMenuIcon();
        } else {
            closeMenuIcon();
        }
    }
    
    function openMenuIcon() {
        menuBtn.src = "assets/icons/close-line-icon.svg";
        navbar.classList.toggle('hide');
        menuOpen = true;
    }
    
    function closeMenuIcon() {
        menuBtn.src = "assets/icons/hamburger-menu-icon.svg";
        navbar.classList.toggle('hide');
        menuOpen = false;
    }
    
    function themeIconHandler() {
        theme = localStorage.getItem("theme");
        if(theme == 'light-theme') {
            themeIcon.src = "assets/icons/light-mode.svg";
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem("theme", "dark-theme");
            closeMenuIcon();
        } else {
            themeIcon.src = "assets/icons/dark-mode.svg";
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
            localStorage.setItem("theme", "light-theme");
            closeMenuIcon();
        }
    }
    
    themeHandler();
}

customElements.define('header-component', Header);