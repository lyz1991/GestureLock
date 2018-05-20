import Lock from './module/Lock'
new Lock('#lock', {
    styles: {
      circleStyle:'green'
    },
    ERROR: {
        maplength: '锁点总数必须9个'
    }
})