


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
