import { TipStyle } from './consts'
class Tips {
    constructor (tpl, opt, timer = 800, state) {
        if (Tips.instance) {
           return Tips.show(tpl, timer, state)
        }
        this.init(tpl, opt, timer, state)
    }
    init (tpl, opt, timer, state) {
        Tips.instance = this
        let div = document.createElement('div')
        Object.assign(div.style, TipStyle, opt)
        div.innerHTML = tpl
        Tips.tip = div
        document.body.appendChild(div)
        Tips.shouldHide(state, timer)
    }
    static shouldHide (state, timer) {
        if (!state) {
            let T = setTimeout(function () {
                Tips.hide()
                clearTimeout(T)
            }, timer)
        }
    }
    static show (tpl, timer, state) {
      Tips.tip.innerHTML = tpl
      Tips.tip.style.display = 'block'
      Tips.shouldHide(state, timer)
    }
    static hide () {
        Tips.tip.style.display = 'none'
    }

}
Tips.tip = null
Tips.instance = null
export default Tips
