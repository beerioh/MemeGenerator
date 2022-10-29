'use strict'
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }];
var gMeme = { selectedImgId: 5, selectedLineIdx: 0, lines: [{ txt: 'I sometimes eat Falafel', size: 20, align: 'left', color: 'red' }] }
// function getMeme()
// a) update the gMeme using the memeService function setLineTxt()
// function setLineTxt()
// b) then renderMeme()
function getImgSize(img, canWidth, canHeight) {
    let imgProp = img.width/img.height
    let canProp =  canWidth/canHeight 
    // console.log(imgProp,img.height,img.width ,canProp ,canHeight ,canWidth)
    if (imgProp > canProp) {
        return { canHeight: img.height * canWidth / img.width, canWidth}
    }
    if (imgProp <= canProp) {
        console.log(img.height * canHeight / img.width,img.height,canHeight,img.width)
        return { canHeight, canWidth: img.width * canHeight /img.height }
    }
}
