export let opt = {
    regular: {
        distance: 15,
        shoudlength: 4

    },
    styles: {
        w: 200,
        h: 200,
        initCircle: 'white',
        circleStyle: 'green',
        circleStyleErr: 'rgb(244,83,80)',
        circleStyleInit: 'white',
        dotRadius: 3,
        fillStyle: 'green',
        fillStyleErr: 'rgb(244,83,80)',
        circleRadius: 10,
        padding: 20,
        lineColor: 'white',
        lineWidth: 2
    },
    Tips: {
        wequalh: '宽高必须相同',
        lessNum: '至少连接四个点，请重试',
        moveTips: '完成后松开手指',
        firstCompeted: '再次绘制图案进行确认',
        twiceImgerr: '图案错误',
        lockSuccess: '您的新解锁图案'
    }
}
export let TipStyle = {
    color: 'white',
    position: 'absolute',
    left: '50%',
    top:'50%',
    transform: 'translate(-50%, -30%)',
    fontSize: '12px',
    padding: '3px 10px',
    background: 'rgba(0,0,0,0.7)',
    textAlign: 'center'
}
export let LockData = [{
    should: [{
        from: 2,
        addcheck: 1
    },
        {
            from: 6,
            addcheck: 3
        }, {
            from: 8,
            addcheck: 4
        }]
}, {
    should: [
        {
            from: 7,
            addcheck: 4
        }
    ]
}, {
    should: [{
        from: 0,
        addcheck: 1
    }, {
        from: 6,
        addcheck: 4
    }, {
        from: 8,
        addcheck: 5
    }]
},{
    should: [{
        from: 5,
        addcheck: 4
    }]
}, {
}, {
    should: [{
        from: 3,
        addcheck: 4
    }]
}, {
    should: [{
        from: 0,
        addcheck: 3
    }, {
        from: 8,
        addcheck: 7
    }, {
        from: 2,
        addcheck: 4
    }]
}, {
    should: [
        {
            from: 1,
            addcheck: 4
        }
    ]
},{
    should: [{
        from: 0,
        addcheck: 4
    },
        {
            from: 2,
            addcheck: 5
        },{
            from: 6,
            addcheck: 7
        }]
}]
