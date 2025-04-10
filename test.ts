basic.forever(function () {
    for (let b=0;b<256;b++){
        watchfont.plotBarGraph(b)
        basic.pause(10)
    }
    basic.pause(1000);
    for (let b = 0; b < 100; b++) {
        watchfont.showNumber2(b)
        basic.pause(100)
    }
    basic.pause(1000);
    for (let b = 0; b < 1024; b++) {
        watchfont.showSorobanNumber(b, 0, 5)
        basic.pause(10)
    }
    basic.pause(1000);
})
