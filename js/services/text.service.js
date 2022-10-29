let gText
let gSelectedText = 0
let gFontSize = 60
let gStartPos
let gId={}

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
    isStroke: true,
    color: 'white',
    stroke: 'black'
  },
    {
    id:makeId(),
    pos:b,
    size: gFontSize,
    font: 'Impact',
    isDrag: false,
    text: 'Lets MeMe B',
    lineWidth: 1,
    textAlign: 'center',
    isStroke: true,
    color: 'white',
    stroke: 'black'
    
    }]
}
function addText({x,y}) {
  gText.push(
    {
    id:makeId(),
    pos:{x,y},
    size: gFontSize,
    font: 'Impact',
    isDrag: false,
    text: `Lets MeMe ${gText.length}`,
    lineWidth: 1,
    textAlign: 'center',
    isStroke: true,
    color: 'white',
    stroke: 'black'
    }
  )
  gSelectedText=gText.length-1
  return gText[gText.length-1].text
}
function getText() {
  return gText
}
function getTextForDrag(  ) {
  console.log(gText[gId.indx].isDrag)
 return gText[gId.indx].isDrag
}
function getTextLine() {
  return gText[gSelectedText].text
}
function mapTexts() {
   gText.map((text,indx) => {
        drawText(text.text,text.pos.x,text.pos.y,text.size,text.font,text.lineWidth,text.textAlign,text.isStroke,text.color)
        })
}
function isTextClicked(pos) {
  const canvas = document.getElementById("canvas");
  const gCtx = canvas.getContext("2d");
  const clickedText = gText.find(line => {
    return pos.x > line.pos.x-(0.5*gCtx.measureText(line.text).width) && pos.x < line.pos.x + (gCtx.measureText(line.text).width*0.5) &&
    pos.y < line.pos.y && pos.y > line.pos.y - line.size
  })
  if (clickedText) {
    gText[findIndex(gText, clickedText.id)].isDrag = true
     console.log(gText)
    gId = { id: clickedText.id, indx: findIndex(gText, clickedText.id) }
    return clickedText.id
  }
}
function setTextDrag( ) {
  gText[gId.indx].isDrag = false
  gId={}
}
function moveText(dx, dy) {
  console.log('yes')
  gText[gId.indx].pos.x += dx
  gText[gId.indx].pos.y += dy
}
function updateText(text) {
  gText[gSelectedText].text = text
}
function nextLine() {
  if (gText.length === 1) { return }
  gText[gSelectedText].lineWidth = 1
  gSelectedText === gText.length-1 ? gSelectedText = 0 : gSelectedText++
  gText[gSelectedText].lineWidth = 3
  changeColorPickerBorder(gText[gSelectedText].color)
  return gText[gSelectedText].text
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
  console.log(type)
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
function toggleStroke() {
  gText[gSelectedText].isStroke = !gText[gSelectedText].isStroke
}
function changeTextColor(value) {
  gText[gSelectedText].color=value
}

