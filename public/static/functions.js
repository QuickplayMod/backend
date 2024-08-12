function scrollToDownloads(event) {
    const downloadsElem = document.querySelector("#downloads");
    if(!downloadsElem) {
        return;
    }

    event.preventDefault()
    downloadsElem.scrollIntoView({
        behavior: "smooth"
    })
}
