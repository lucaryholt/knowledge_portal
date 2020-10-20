function scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ block: "center" });
}

function scrollToTop() {
    window.scrollTo(0, 0);
}