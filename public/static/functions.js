function scrollToDownloads(event) {
    const downloadsElem = document.querySelector("#downloads");
    if(!downloadsElem) {
        return;
    }

    event.preventDefault()
    downloadsElem.scrollIntoView({
        behavior: "smooth"
    })
    downloadsElem.querySelector('a').focus({preventScroll: true})
}

function showAdditionalDownloads(element) {
    const allAdditionalOptions = document.querySelectorAll('.additional-dl-option');
    allAdditionalOptions.forEach(e => e.style.display = 'initial');

    if(allAdditionalOptions.length > 0) {
        allAdditionalOptions[0].focus()
    }

    element.style.display = 'none';
}
