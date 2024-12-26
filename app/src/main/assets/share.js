const menuWrapper = document.querySelector(".side-menu");

menuWrapper.onclick = function (e) {
    if(e.target === menuWrapper)
        menuWrapper.classList.remove("open")
}

function toggleMenu () {
    menuWrapper.classList.toggle("open")
}