


const log = console.log;

const sections = document.querySelectorAll("section[data-nav]");
const ul = document.querySelector("#navbar__list");

appendNavSections()
document.addEventListener("scroll", handleActiveSection);

function appendNavSections() {

    const tempContainer = document.createDocumentFragment();

    sections.forEach(
        section => {
            const { nav } = section.dataset;
            const li = document.createElement("li");
            const a = document.createElement("a");

            a.setAttribute("href", "#");
            a.classList.add("menu__link");
            a.textContent = nav;
            li.appendChild(a);
    
            tempContainer.appendChild(li);
        }
    );

    ul.appendChild(tempContainer);
}


 const lis = document.querySelectorAll("li");

 function handleActiveSection() {
     sections.forEach(( section, i ) => {
        const { top, bottom } = section.getBoundingClientRect();
        const isActive = section.classList.contains("active");
 
        if ( top <= 5 && bottom > 5 ) {
            if( !isActive ){
                section.classList.add("active");
                lis[i].classList.add("active");
            };
            
        } else {
             
            if( isActive ) {
                section.classList.remove("active");
                lis[i].classList.remove("active");
 
            }
        }
    })
}


ul.addEventListener("click", (e) => {
    const { target } = e;
    e.preventDefault();

    if( !target.classList.contains("menu__link") ) {
        return;
    }

    const id = target.textContent
               .toLowerCase()
               .replace(/\s/, "");
               
    const section = document.querySelector(`#${ id }`);
    const top = section.offsetTop;

    window.scrollTo({
        top,
        left: 0,
        behavior: 'smooth',
    })
})


const burgerbtn = document.querySelector(".burger__menu");
const header = document.querySelector(".page__header");
let expand = false;
let timeoutRef = -1;

burgerbtn.addEventListener("click", toggleMenu);
window.addEventListener("resize", reInit);

document.addEventListener( "click", function({ target } ) {
    if(burgerbtn.contains( target )){ 
        return;
    }

    if(window.innerWidth <= 786 && expand){ 

        toggleMenu()
    }
    
})

function openMenu() {
    ul.setAttribute("class", "show");

    const menuHeight = ul.offsetHeight;
    header.style.height = `${ menuHeight + 52 }px`;
}

function closeMenu() {
    header.removeAttribute("style");
    timeoutRef = setTimeout(() => ul.removeAttribute("class"), 300)
}

function toggleMenu() {
    expand = !expand;

    if(!expand) {
        closeMenu()
        return;
    }

    if (timeoutRef > -1) {
        clearTimeout(timeoutRef);
    }

    openMenu()
}

function reInit () {
    if (window.innerWidth > 786) {
        expand = false;
        ul.removeAttribute("class");
        header.removeAttribute("style");
    }
    
}