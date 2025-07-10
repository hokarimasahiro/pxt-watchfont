basic.forever(function () {
    for (let b=0;b<256;b++){
        watchfont.plotBarGraph(b)
        basic.pause(10)
    }
    basic.pause(1000);
    for (let b = 0; b < 100; b++) {
        watchfont.showNumber(b)
        if(b<20){
            basic.pause(200)}
        else{
            basic.pause(100)
        }
    }
    basic.pause(1000);
    for (let b = 0; b < 1024; b++) {
        watchfont.showSorobanNumber(b, 0, 5)
        basic.pause(10)
    }
    basic.pause(1000);
    for (let b = 0x20; b < 0x7f; b++) {
        watchfont.showChar(String.fromCharCode(b))
        basic.pause(100)
    }
    basic.pause(1000);
})
