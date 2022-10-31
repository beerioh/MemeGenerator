let gText
let gSelectedText = 0
let gFontSize = 60
let gStartPos
let gId = {}
let imgCounter = 0
let gMemes = []
const MEME_TO_STORAGE = "memeArray"
function createText({ a, b ,width}) {
  gFontSize=width/11
  gText = [{
    id:makeId(),
    pos:a,
    size: gFontSize,
    font: 'Impact',
    isDrag: false,
    text: 'Lets MeMe A',
    lineWidth: 3,
    textAlign: 'center',
    isStroke: 'black',
    color: 'white',
    stroke: 'black',
    active:true
  },
    {
    id:makeId(),
    pos:b,
    size: gFontSize,
    font: 'Impact',
    isDrag: false,
    text: 'Lets MeMe B',
    lineWidth: 3,
    textAlign: 'center',
    isStroke: true,
    color: 'white',
    stroke: 'black',
    active:false
    }]
}
function addText({ x, y }) {
  gText[gSelectedText].active=false
  gText.push(
    {
    id:makeId(),
    pos:{x,y},
    size: gFontSize,
    font: 'Impact',
    isDrag: false,
    text: `Lets MeMe ${gText.length}`,
    lineWidth: 3,
    textAlign: 'center',
    isStroke: true,
    color: 'white',
      stroke: 'black',
    active:true
    }
  )
  gSelectedText=gText.length-1
  return gText[gText.length-1].text
}
function getText() {
  return gText
}
function getTextForDrag() {
  gText[gSelectedText].active = true
  return gText[gSelectedText].isDrag
  
}
function mapTexts() {
   gText.map((text,indx) => {
        drawText(text.text,text.pos.x,text.pos.y,text.size,text.font,text.lineWidth,text.textAlign,text.isStroke,text.color,text.stroke,text.active)
        })
}
function setTextDrag( ) {
  gText[gSelectedText].isDrag = false
}
function moveText(dx, dy) {
  gText[gId.indx].pos.x += dx
  gText[gId.indx].pos.y += dy
}
function updateText(text) {
  gText[gSelectedText].text = text
}
function nextLine() {
  gText[gSelectedText].active=false
  if (gSelectedText === gText.length-1) { gSelectedText = -1 }
  gSelectedText++
  gText[gSelectedText].active = true
  return gText[gSelectedText].text
}
function getClickedText(pos, gCtx) {
  const clickedText = gText.find(line => {
    return pos.x > line.pos.x - (0.5 * gCtx.measureText(line.text).width) && pos.x < line.pos.x + (gCtx.measureText(line.text).width * 0.5) &&
        pos.y < line.pos.y && pos.y > line.pos.y - line.size
  })
  if (clickedText) {
    gText[gSelectedText].isDrag = false
    gText[gSelectedText].active = false
    gSelectedText=findIndex(gText, clickedText.id)
    gText[gSelectedText].isDrag = true
    gId = {id:clickedText.id, indx:gSelectedText}
    text = gText[gId.indx].text
    let textInfo = { text, clickedText: clickedText.id }
    gText[gSelectedText].active = true
    return textInfo
  }
}
function deleteSelectedMeme() {
  gText.splice(gSelectedText, 1)
  gSelectedText=0
}
function incSize() {
  let textSizePre = gText[gSelectedText].text.length * gText[gSelectedText].size
  gText[gSelectedText].size = gText[gSelectedText].size + 5
  let textSizePost = gText[gSelectedText].text.length * gText[gSelectedText].size
  gText[gSelectedText].pos.x=gText[gSelectedText].pos.x+((textSizePost-textSizePre)*0.1)
}
function decSize() {
  let textSizePre = gText[gSelectedText].text.length * gText[gSelectedText].size
  gText[gSelectedText].size = gText[gSelectedText].size - 5
  let textSizePost = gText[gSelectedText].text.length * gText[gSelectedText].size
  gText[gSelectedText].pos.x=gText[gSelectedText].pos.x+((textSizePost-textSizePre)*0.1)
  
}
function setAlinement(type) {
gText[gSelectedText].textAlign=type
}
function changeTextHight(direction, height) {
  let element = gText[gSelectedText].pos.y
    if(element<10&& direction==='down'|| element>height-10&& direction==='up'){return}
    if(direction === 'down') { gText[gSelectedText].pos.y = gText[gSelectedText].pos.y - 15 }
    if(direction==='up'){gText[gSelectedText].pos.y=gText[gSelectedText].pos.y+15}
}
function setFont(font) {
  gText[gSelectedText].font=`${font}`
}
function colorStroke(color) {
  gText[gSelectedText].stroke=color
 = color
}
function changeTextColor(value) {
  gText[gSelectedText].color=value
}
function saveDataUrl(imgData) {
  gMemes.push(imgData)
  localStorage.setItem(MEME_TO_STORAGE, gMemes);
}
function loadCanvas() {
localStorage.getItem(MEME_TO_STORAGE);
imgCounter++
renderMemesToGallery(gMemes)
}
function cancelActive() {
  console.log(gText[gSelectedText])
  gText[gSelectedText].active=false
}