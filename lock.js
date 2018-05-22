import Lock from './module/Lock'
new Lock('#lock', {
    styles: {
    },
    complete: function () {
        alert('开始向后台提交您的手势')
    }
})
new Lock('#lock1', {
    styles: {
    },
    open: function () {
        alert('开始向后台确认您的手势是否正确')
    }
}, true)