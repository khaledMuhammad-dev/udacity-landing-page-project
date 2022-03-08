


const log = console.log;
appendNavSections()


function appendNavSections() {
    const sections = document.querySelectorAll("section[data-nav]");

    const ul = document.querySelector("#navbar__list");
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
