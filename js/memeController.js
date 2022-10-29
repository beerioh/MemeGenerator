'use strict'
let gElCanvas
let gCtx
let gTextItem = []
let gImgName
let gFont
let gIndx
let menuBtn=1
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
function memeInit(imgName) {
  gImgName = imgName
  const gridContainer = document.querySelector('.gallery-container')
  console.log(gridContainer)
  gridContainer.classList.add("hide")
  const editorContainer = document.querySelector('.editor-container')
  editorContainer.classList.remove("hide")
  gElCanvas = document.querySelector('#canvas')
  let imgUrl=`url("img/memesGallery/${imgName}.jpg")`
  document.querySelector('.canvas').style.backgroundImage=imgUrl
  gCtx = gElCanvas.getContext('2d')
  addListeners()
  console.log(gElCanvas)
  renderMeme(imgName)
  const pos = { a: { x: gElCanvas.width * 0.5, y: gElCanvas.height * 0.22 }, b: { x: gElCanvas.width * 0.5, y: gElCanvas.height * 0.9},width:gElCanvas.width,height:gElCanvas.height }
  createText(pos,gElCanvas)
}
function onPageChange(page) {
    const editorContainer=document.querySelector('.editor-container')
    const gridContainer = document.querySelector('.gallery-container') 
    const saved = document.querySelector('.saved-meme-gallery')
    const aboutPage = document.querySelector('.about')
    gridContainer.classList.add("hide")
    if (page === 'gallery') {
        gridContainer.classList.remove("hide")
        aboutPage.classList.add("hide")
        saved.classList.add("hide")
        editorContainer.classList.add("hide")
    }
    if (page === 'memes') {
        gridContainer.classList.add("hide")
        aboutPage.classList.add("hide")
        saved.classList.remove("hide")
        editorContainer.classList.add("hide")
    }
    if (page === 'about') {
        gridContainer.classList.add("hide")
        aboutPage.classList.remove("hide")
        saved.classList.add("hide")
        editorContainer.classList.add("hide")
    }
}
function renderMeme() {
    const img = new Image()
    const canvasContainer = document.querySelector('.canvas-container')
    const editorContainer=document.querySelector('.editor-container')
    img.src = `img/memesGallery/${gImgName}.jpg`
    let canProportion = getImgSize(img, canvasContainer.clientWidth, editorContainer.clientHeight)
    gElCanvas.height = canProportion.canHeight
    gElCanvas.width = canProportion.canWidth
    gTextItem = getText()
    img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    mapTexts()
  }
}
function onDown(ev) {
  const pos = getEvPos(ev)
  let textInfo = isTextClicked(pos)
  if (!textInfo) return
  gIndx=textInfo.clickedText
  document.querySelector('.item1').value = textInfo.text
  gStartPos = pos
  document.body.style.cursor = 'grabbing'
}
function onMove(ev) {
  const isDrag  = getTextForDrag()
  if (!isDrag) return
  const pos = getEvPos(ev)
  onChangeLine()
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveText(dx, dy,gIndx)
  gStartPos = pos
  renderMeme()
}
function onUp() {
  setTextDrag()
  document.body.style.cursor = 'grab'
}
function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}
function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY
  }
  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
    }
  }
  return pos
}
function drawText(text, x, y, size,font,lineWidth,textAlign,isStroke,color,stroke) {
    gCtx.lineWidth = lineWidth||1
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color
    gCtx.textAlign= textAlign
    gCtx.font = `${size}px ${font}`
    gCtx.fillText(text, x, y)
    if (isStroke) {
        gCtx.strokeText(text, x, y)
    }
  }
function clearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}
function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL() 
  elLink.href = data 
  elLink.download = 'canva' 
}
function addListeners() {
  addMouseListeners()
  addTouchListeners()
  window.addEventListener('resize', () => {
    resizeCanvas()
    renderMeme()
  })
}
function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mouseup', onUp)
}
function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchend', onUp)
}
function onTextEdit(text) {
    updateText(text) 
    renderMeme(gImgName)
}
function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL()
  elLink.href = data
  elLink.download = 'my-img.jpg'
}
function onChangeLine() {
    let text=nextLine()
    renderMeme()   
    document.querySelector('.item1').value = text
}
function onCreateText() {
    const center = { x: gElCanvas.width * 0.5, y: gElCanvas.height / 2  }
    let text = addText(center)
    document.querySelector('.item1').value = text
     renderMeme() 
}
function onDeleteMeme() {
    deleteSelectedMeme()
    renderMeme()
}
function onIncreaseSize() {
    incSize()
    renderMeme()
}
function onDecreaseSize() {
    decSize()
    renderMeme()
}
function onAlineText(type) {
    console.log(type)
    setAlinement(type)
    renderMeme()
}
function onArrowChange(direction) {
    changeTextHight(direction, gElCanvas.width)
    renderMeme()
}
function onSetFont() {
    let font = document.querySelector(".font-selector").value
    if (font === gFont) { return }
    setFont(font)
    gFont=font
    renderMeme()
}
function onStrokeToggle() {
    toggleStroke()
    renderMeme()
}
function onOpenColorPicker() {
    document.querySelector(".colorP").click()
}
function onSetColor(value) {
    console.log(`"${value}"`)
    document.querySelector(".img10").style.border = `3px ridge ${value}`
    changeTextColor(value)
     renderMeme()
}
function changeColorPickerBorder(value) {
    document.querySelector(".img10").style.border = `3px ridge ${value}`
}
function toggleMenu() {
  let burgerMenu = `url("img/icons/menu-icon-24.png")`
  let xMenu=`url("img/icons/x.png")`
  document.body.classList.toggle('menu-open');
  if (menuBtn === 2) {
    document.querySelector('.btn-menu').style.backgroundImage = burgerMenu
    menuBtn=1
  }
  else { document.querySelector('.btn-menu').style.backgroundImage = xMenu, menuBtn = 2 }
}
function onSaveImg() {
  let imgData = gElCanvas.toDataURL();
  if (typeof (localStorage) !== "undefined") {
    saveDataUrl(imgData)
 } else {
    document.getElementById("save").innerHTML.dataURL = "Local Storage not supported";
  }
  onRenderMemesGallery()
}
function onRenderMemesGallery() {
  loadCanvas()
}
function renderMemesToGallery(gMemes) {
    const memeGallery = document.querySelector('.saved-meme-gallery')
    const strHtml = gMemes.map(meme => {
      return `< img src =data:image/png;base64, "${meme}"/>`
    }).join('')
    memeGallery.innerHTML = strHtml
  }


    
     