let gText
let gSelectedText=0

function createText({a,b}) {
  gText = [{
    id:makeId(),
    pos:a,
    size: 60,
    font: 'Impact',
    isDrag: false,
    text: 'Lets MeMe A',
    lineWidth: 3,
    textAlign: 'center',
    isStroke: true,
    color:'white'
  },
    {
    id:makeId(),
    pos:b,
    size: 60,
    font: 'Impact',
    isDrag: false,
    text: 'Lets MeMe B',
    lineWidth: 1,
    textAlign: 'center',
    isStroke: true,
    color:'white'
    
    }]
}
function addText({x,y}) {
  gText.push(
    {
    id:makeId(),
    pos:{x,y},
    size: 60,
    font: 'Impact',
    isDrag: false,
    text: `Lets MeMe ${gText.length + 1}`,
    lineWidth: 1,
    textAlign: 'center',
    isStroke: true,
    color:'white'
    }
  )
  gSelectedText=gText.length-1
  return gText[gText.length-1].text
}
function getText() {
  return gText
}
function getTextLine() {
  return gText[gSelectedText].text
}
function mapTexts() {
   gText.map((text,indx) => {
        drawText(text.text,text.pos.x,text.pos.y,text.size,text.font,text.lineWidth,text.textAlign,text.isStroke,text.color)
        })
}
function isTextClicked({ x, y }) {
  const clickedText = gText.find(line => {
    return line.size=55
  })  
     return 
}
function setTextDrag(isDrag) {
  gText.isDrag = isDrag
}
function moveText(dx, dy) {
  gText.pos.x += dx
  gText.pos.y += dy
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
  gText[gSelectedText].size=gText[gSelectedText].size + 5
}
function decSize() {
  gText[gSelectedText].size=gText[gSelectedText].size - 5
  console.log(gText[gSelectedText].size)
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

