basic.forever(function () {
    for (let b=0;b<256;b++){
        watchfont.plotBarGraph(b)
        basic.pause(10)
    }
    basic.pause(1000);
})
