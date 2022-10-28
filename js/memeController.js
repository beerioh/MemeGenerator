'use strict'
let gElCanvas
let gCtx
let gTextItem = []
let gImgName
let gFont
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
function memeInit(imgName) {
    gImgName=imgName
    const gridContainer = document.querySelector('.gallery-container')
    gridContainer.classList.add("hide")
    const editorContainer = document.querySelector('.editor-container')
    editorContainer.classList.remove("hide")
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log(gElCanvas)
    const pos = { a: { x: gElCanvas.width * 0.5, y: gElCanvas.height * 0.2 }, b: { x: gElCanvas.width * 0.5, y: gElCanvas.height*1.1  } }
    createText(pos)
    addListeners()
    renderMeme(imgName)
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
    gElCanvas.height = canProportion.canHeight - 1
    gElCanvas.width = canProportion.canWidth
    gTextItem = getText()
    
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        // document.querySelector('.item1').value = getTextLine()
        mapTexts()
       
        
    // memeInit(gElCanvas.width, gElCanvas.height)
  }
}
function onDown(ev) {
  //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    console.log(pos)
    console.log(isTextClicked(pos))
  if (!isTextClicked(pos)) return
  setTextDrag(true)
  //Save the pos we start from 
  gStartPos = pos
  document.body.style.cursor = 'grabbing'

}
function onMove(ev) {
  console.log('Im from onMove')
  const { isDrag } = getText()
  if (!isDrag) return
  const pos = getEvPos(ev)
  //Calc the delta , the diff we moved
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveText(dx, dy)
  //Save the last pos , we remember where we`ve been and move accordingly
  gStartPos = pos
  //The canvas is render again after every move
  renderCanvas()
}
function onUp() {
  console.log('Im from onUp')
  setTextDrag(false)
  document.body.style.cursor = 'grab'
}
function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}
function getEvPos(ev) {

  //Gets the offset pos , the default pos
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY
  }
  // Check if its a touch ev
  if (TOUCH_EVS.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
    }
  }
  return pos
}
function drawText(text, x, y, size,font,lineWidth,textAlign,isStroke,color) {
    gCtx.lineWidth = lineWidth||1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.textAlign= textAlign
    gCtx.font = `${size}px ${font}`
  gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    if (isStroke) {
        gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
    }
  }
function clearCanvas() {
  // Sets all pixels in the rectangle defined by starting point (x, y) and size (width, height)
  // to transparent black, erasing any previously drawn content.
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  // You may clear part of the canvas
  // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height / 4)
}
function downloadCanvas(elLink) {
    console.log('hi')
  // Gets the canvas content and convert it to base64 data URL that can be save as an image
  const data = gElCanvas.toDataURL(/* DEFAULT: 'image/png'*/) // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
  console.log('data', data) // Decoded the image to base64 
  elLink.href = data // Put it on the link
  elLink.download = 'shuki' // Can change the name of the file
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
    const center = { x: gElCanvas.width * 0.5, y: gElCanvas.height / 2 + 30 }
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
    console.log(font)
    if (font === gFont) { return }
    setFont(font)
    gFont=font
    renderMeme()
}
function onStrokeToggle() {
    toggleStroke()
   
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