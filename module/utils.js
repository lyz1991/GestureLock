const LockData = [{
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
        }],
}, {
    should: [
        {
            from: 7,
            addcheck: 4
        }
    ],
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
    }],
},{
    should: [{
        from: 5,
        addcheck: 4
    }],
}, {
}, {
    should: [{
        from: 3,
        addcheck: 4
    }],
    state: false
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
export default (w, padding, radius, data) => {
    let m = (w - padding * 2 - radius * 6) / 2
    for (let i = 0; i < data.length; i++ ) {
        let col = i % 3
        let row = i / 3 | 0
        data[i].state = false
        data[i].x = padding + col * m + (2 * col + 1) * radius
        data[i].y = padding + row * m + (2 * row + 1) * radius
    }
    return data
}