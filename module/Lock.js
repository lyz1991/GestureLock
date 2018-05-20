import * as L from './consts'
import generateData from './utils'
import Tip from './Tip'
class Lock {
    constructor (id, opt) {
        this.assign(opt)
        this.createCanvas(id)
        this.ctx = this.canvas.getContext('2d')
        this.maps = generateData(L.opt.styles.w, L.opt.styles.padding, L.opt.styles.circleRadius,  L.LockData)
        this.records = []
        this.recordsT = []
        this.firstCompeted = false
        this.startX = null
        this.startY = null
        this.from = null
        this.left = this.canvas.getBoundingClientRect().left
        this.drawcircles(this.maps)
        this.top = this.canvas.getBoundingClientRect().top
        this.bind()
    }
    initlock () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.from = null
        Lock.restore(this.maps)
        this.drawcircles(this.maps, true)
    }
    assign (opt) {
        this.tips = Object.assign(L.opt.Tips, opt.err)
        if (opt.styles.w != opt.styles.h) {
            Lock.showTips(this.tips.wequalh)
        }
        this.styles = Object.assign(L.opt.styles, opt.styles)
        this.regular = Object.assign(L.opt.regular, opt.regular)
    }
    createCanvas (id) {
        let canvas = document.createElement('canvas')
        canvas.width = this.styles.w
        canvas.height = this.styles.h
        document.querySelector(id).appendChild(canvas)
        this.canvas = canvas
    }
    drawOneCircle (dot, first) {
        this.ctx.beginPath()
        this.ctx.arc(dot.x, dot.y, this.styles.circleRadius, 0, Math.PI * 2, false)
        if (dot.state && !first) {
            this.ctx.save()
            this.ctx.strokeStyle = this.styles.circleStyle
            this.ctx.stroke()
            this.ctx.closePath()
            this.ctx.restore()
            this.drawdot(dot)
        } else {
            this.ctx.stroke()
            this.ctx.closePath()
        }
    }
    drawcircles (maps, first) {
        maps.forEach((dot) => {
            this.drawOneCircle(dot, first)
        })
    }
    drawdot (dot) {
        this.ctx.beginPath()
        this.ctx.arc(dot.x, dot.y, this.styles.dotRadius, 0, Math.PI * 2, false)
        this.ctx.fillStyle = this.styles.fillStyle
        this.ctx.fill()
        this.ctx.closePath()

    }
    redraw () {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.drawrecords(this.firstCompeted ? this.recordsT : this.records)
        this.drawcircles(this.maps)
    }
    bind () {
        let state
        this.canvas.addEventListener('mousedown', (e) => {
            state = true
            this.startX = e.clientX
            this.startY = e.clientY
            this.ctx.moveTo(this.startX - this.left, this.startY- this.top)
        })
        document.addEventListener('mousemove', e => {
            if (state) {
                Lock.showTips(this.tips.moveTips, '', '', true)
            }
        })
        this.canvas.addEventListener('mousemove', (e) => {
            if (state) {
                if (this.from) {
                    this.redraw()
                    if (this.from) {
                        this.ctx.moveTo(this.from.x, this.from.y)
                    } else {
                        this.ctx.moveTo(this.startX - this.left, this.startY- this.top)
                    }
                    this.ctx.strokeStyle = this.styles.lineStyle
                    this.ctx.lineTo(e.clientX - this.left, e.clientY - this.top)
                    this.ctx.stroke()
                }
                this.checkDistance(e.clientX - this.left, e.clientY - this.top)
            }
        })
        document.addEventListener('mouseup', e => {
            state = false
            if (this.firstCompeted) {
                if (!Lock.compare(this.recordsT, this.records)) {
                    this.redraw()
                    this.recordsT = []
                    setTimeout(() => {
                        this.initlock()
                    }, 1000)
                    return Lock.showTips(this.tips.twiceImgerr, '', '', true)
                }
                this.redraw()
                Lock.showTips(this.tips.lockSuccess, '', '', false)
            } else {
                if (this.records.length < this.regular.shoudlength) {
                    this.initlock()
                    this.records = []
                    Lock.showTips(this.tips.lessNum)
                    return
                } else {
                    this.initlock()
                    this.firstCompeted = true
                    Lock.showTips(this.tips.firstCompeted)
                }
            }
        })
    }
    drawrecords (records) {
        for (let i = 0, len = records.length; i < len; i++) {
            if (records[i+1]) {
                this.ctx.beginPath()
                this.ctx.moveTo(records[i].x, records[i].y)
                this.ctx.lineTo(records[i+1].x, records[i+1].y)
                this.ctx.stroke()
                this.ctx.closePath()
            }
            this.ctx.beginPath()
            this.ctx.arc(records[i].x, records[i].y, this.styles.circleRadius, 0, Math.PI * 2, false)
            this.ctx.save()
            this.ctx.strokeStyle = this.styles.circleStyle
            this.ctx.closePath()
            this.ctx.stroke()
            this.ctx.restore()
        }
    }
    static showTips (msg, opt, timer, state) {
        return new Tip(msg, opt, timer, state)
    }
    checkDistance (x, y) {
        this.maps.forEach((dot) => {
            let distance = Math.sqrt((dot.x - x) * (dot.x - x) + (dot.y - y) * (dot.y - y))
            if (distance < this.regular.distance) {
                dot.state = true
                this.ctx.beginPath()
                this.checkline(this.from, dot)
                this.ctx.arc(dot.x, dot.y, this.styles.circleRadius, 0, Math.PI * 2, false)
                this.from = dot
                if (this.firstCompeted) {
                    if (this.recordsT.indexOf(dot) == -1) {
                        this.recordsT.push(dot)
                    }
                } else {
                    if (this.records.indexOf(dot) == -1) {
                        this.records.push(dot)
                    }
                }

                this.ctx.save()
                this.ctx.strokeStyle = this.styles.circleStyle
                this.ctx.closePath()
                this.ctx.stroke()
                this.ctx.restore()
            }
        })
    }
    static restore (maps) {
        maps.forEach(function (map) {
            map.state = false
        })
    }
    static compare (arr1, arr2) {
        if (arr1.length != arr2.length) {
            return false
        }
        for(let i = 0, len = arr1.length; i < len; i++) {
            if (arr1[i].x != arr2[i].x || arr1[i].y != arr2[i].y) {
                return false
            }
        }
        return true
    }
    checkline (from, dot) {
        let targetIndex = this.maps.indexOf(dot)
        let fromIndex = this.maps.indexOf(from)
        if (dot.should) {
            for (let i = 0, len = dot.should.length; i < len; i++) {
                if (dot.should[i].from == fromIndex) {
                    let addcheck = this.maps[dot.should[i].addcheck]
                    if (!addcheck.state) {
                        this.stroke(addcheck)
                    }
                }
            }
        }
    }
    stroke (dot) {
        dot.state = true
        if (!this.firstCompeted) {
            this.records.push(dot)
        } else {
            this.recordsT.push(dot)
        }
        this.drawOneCircle(dot)
    }
}
export default Lock