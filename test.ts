basic.forever(function () {

    for(let r=0;r < 4;r++){
        watchfont.setRotatation(r);
        watchfont.unplot(2, 0);
        watchfont.unplot(2, 1);
        watchfont.unplot(2, 2);
        watchfont.unplot(2, 3);
        watchfont.unplot(2, 4);
        watchfont.showSorobanNumber(11,0,2);
        watchfont.showSorobanNumber(38, 3, 2);
        for(let s=0;s<5;s++){
            watchfont.plot(2, 1);
            watchfont.plot(2, 3);
            basic.pause(500);
            watchfont.unplot(2, 1);
            watchfont.unplot(2, 3);
            basic.pause(500);
        }
        basic.pause(200)
        for(let s=0;s<60;s++){
            watchfont.showNumber2(s);
            basic.pause(100);
        }
        basic.pause(1000);
    }
})
