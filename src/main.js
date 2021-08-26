const T = require('./translate')

const setBtnStyle = btn => {
    btn.innerHTML = 'T'
    btn.className = 'btn btn-icon'
    btn.style.display = 'inline-flex' 
    btn.style.width = '12px' 
    btn.style.height = '12px' 
    btn.style.marginLeft = '12px' 
    btn.style.background = 'blueviolet' 
    btn.style.color = 'white' 
    btn.style.alignItems = 'center' 
    btn.style.justifyContent = 'center' 
    btn.style.fontWeight = 'bold' 
}
const setBtnEvent = btn => {
    const transDom = document.querySelector('#translation')
    const isEmpty = () => !transDom.value
    const insertTransVal = () => {
        const transPlace = document.querySelector('.hwt-highlights.hwt-content')
        const cn= document.querySelector('.singular').innerText
        const tw = T.cn2tw(cn)

        transDom.value = tw
        transPlace.innerText = tw
    }

    btn.onclick = () => {
        if(isEmpty()) {
            insertTransVal()
        } else {
            if(confirm('当前已有翻译值，确认覆盖吗？')) {
                insertTransVal()
            }
        }
    }
}
const addBtn = () => {
    const container = document.querySelector('.editor-buttons-simple .btn-toolbar.pull-left')
    const btn = document.createElement('div')

    setBtnStyle(btn)
    setBtnEvent(btn)
    container.appendChild(btn)
}

addBtn()