'use strict'

const selected = document.querySelectorAll('ul.navBar li');
function onInit() {
renderGallery()

selected.forEach((el) => {
    el.addEventListener('click', () => {
        if (!el.classList.contains('active')) {
            selected.forEach((others) => {others.classList.remove('active')})
            el.classList.add('active')
}})})
}
function renderGallery() {
     const imgs = createImgArray()
    const elGallery = document.querySelector('.gallery-grid-container')
  const strHtml = imgs.map(({ imgName }) => {
        return `
        <container onclick="onImgSelect(${imgName})" class="itemContainer"><img class="imgItem" src="img/memesGallery/${imgName}.jpg"/></container>
        `
         }).join('')
    elGallery.innerHTML =strHtml
}

function onImgSelect(imgName) {
    memeInit(imgName)
}




