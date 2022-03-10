
/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
    const log = console.log;
    const sections = querySelector("section[data-nav]", "all");
    const ul = querySelector("#navbar__list");
    const activeOffset = 80; //px

    // nav menu controls
    const burgerbtn = querySelector(".burger__menu");
    const header = querySelector(".page__header");
    let expand = false;
    let timeoutRef = -1;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
    function querySelector(selector, invoke="") {

        if(invoke === "all") {
            return document.querySelectorAll(selector);
        }
        
        return document.querySelector(selector);
    }

    // detect the menu height and apply the total height for animation purpose
    // set "show" class to display menu
    function openMenu() {
        ul.setAttribute("class", "show"); // display flex

        const menuHeight = ul.offsetHeight;
        header.style.height = `${ menuHeight + 52 }px`;
    }

    // remove the style for animation purpose
    // remove the show class to close the menu
    function closeMenu() {
        header.removeAttribute("style");
        timeoutRef = setTimeout(() => ul.removeAttribute("class"), 300)
    }

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

    // build the nav
    function appendNavSections() {

        const tempContainer = document.createDocumentFragment();
        
        sections.forEach(
            section => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="#" class="menu__link">${section.dataset.nav}</a>`;
                
                tempContainer.append(li);
            }
        );

        ul.appendChild(tempContainer);
    }

    // Add class 'active' to section when near top of viewport
    function handleActiveSection() {
        // get list items
        const listItems = querySelector("li", "all");

        sections.forEach(( section, i ) => {
        const { top, bottom } = section.getBoundingClientRect();
        const isActive = section.classList.contains("active");

        if ( top <= activeOffset && bottom > activeOffset ) {
            if ( !isActive ) {
                section.classList.add("active");
                listItems[i].classList.add("active");
            }
            
        } else {
                
            if( isActive ) {
                section.classList.remove("active");
                listItems[i].classList.remove("active");
            }
        }
    })
    }

    // Scroll to anchor ID using scrollTO event
    function scrollToSection(e) {
        const { target } = e;
        e.preventDefault();

        if( !target.classList.contains("menu__link") ) {
            return;
        }

        const id = target.textContent
                .toLowerCase()
                .replace(/\s/, "");
                
        const section = querySelector(`#${ id }`);
        const top = section.offsetTop;

        window.scrollTo({
            top: top - activeOffset,
            left: 0,
            behavior: 'smooth',
        });
    };

    // toggle menu
    function toggleMenu() {
        expand = !expand;

        if(!expand) {
            closeMenu();
            return;
        }

        if (timeoutRef > -1) {
            clearTimeout(timeoutRef);
        }

        openMenu();
    }

    // re-intiate the toggle menu states on resizeing
    function reInit () {
        if (window.innerWidth > 786) {
            expand = false;

            ul.removeAttribute("class");
            header.removeAttribute("style");
        }
    }

    // close the navifarion menu on page click
    function closeMenuOnpageClick({ target } ) {
        if(burgerbtn.contains( target )){ 
            return;
        }

        if(window.innerWidth <= 786 && expand){ 

            toggleMenu();
        }
    }

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
appendNavSections();

// Scroll to section on link click
ul.addEventListener("click", scrollToSection);

// Set sections as active
document.addEventListener("scroll", handleActiveSection);

// toggle the menu on burger menu button clicked
burgerbtn.addEventListener("click", toggleMenu);

// reintiate the menu state if the width greater than 786px
window.addEventListener("resize", reInit);

// close the menu on page click
document.addEventListener( "click", closeMenuOnpageClick);