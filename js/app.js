



appendNavSections(4)


function appendNavSections(num) {

    const ul = document.querySelector("#navbar__list");
    const tempContainer = document.createDocumentFragment();

    for ( let i = 1; i <= num; i++ ) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.setAttribute("href", "#");
        a.classList.add("menu__link");
        a.textContent = `section ${ i }`;
        li.appendChild(a);

        tempContainer.appendChild(li);
    }

    ul.appendChild(tempContainer);

}