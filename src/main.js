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
    const transTextDom = document.querySelector('#translation')
    const isEmpty = () => !transTextDom.value
    const mockInputEvt = (el) => {
      const evt = document.createEvent('HTMLEvents');

      evt.initEvent('input', true, true);
      el.dispatchEvent(evt);
    }
    const insertTransVal = () => {
        const transDivDom = document.querySelector('.hwt-highlights.hwt-content')
        const cnDom= document.querySelector('.singular')
        const tw = T.cn2tw(cnDom.innerText)

        if (transDivDom) {
          transDivDom.innerText = tw
          transDivDom.focus()
          mockInputEvt(transDivDom)
        }

        transTextDom.value = tw
        transTextDom.focus()
        mockInputEvt(transTextDom)
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
