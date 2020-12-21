/**
 * Font for watch Display blocks
 */
enum rotate {
    //% block="上"
    top = 0,
    //% block="左"
    left = 1,
    //% block="下"
    under = 2,
    //% block="右"
    right = 3
}
//% color=#0fbc11 icon="\u270f" block="Font for Watch"
namespace watchfont {
    let rotate: number = 0      // 0:top,1:left,2:under,3:right
    let scroleSpeed: number = 200
    /**
     * LEDを点ける
     * @param x x座標, eg: 1
     * @param y y座標, eg: 3
     */
    //% block="点灯 x %x|y %y"
    export function plot(x: number, y: number): void {
        switch (rotate) {
            case 0:
                led.plot(x, y); break;
            case 1:
                led.plot(y, 4 - x); break;
            case 2:
                led.plot(4 - x, 4 - y); break;
            case 3:
                led.plot(4 - y, x); break;
            default:
                led.plot(x, y); break;
        }
    }
    /**
     * LEDを消す
     * @param x x座標, eg: 1
     * @param y y座標, eg: 3
     */
    //% block="消灯 x %x|y %y"
    export function unplot(x: number, y: number): void {
        switch (rotate) {
            case 0:
                led.unplot(x, y); break;
            case 1:
                led.unplot(y, 4 - x); break;
            case 2:
                led.unplot(4 - x, 4 - y); break;
            case 3:
                led.unplot(4 - y, x); break;
            default:
                led.unplot(x, y); break;
        }
    }
    /**
     * LEDを指定した明るさで点ける
     * @param x x座標, eg: 1
     * @param y y座標, eg: 3
     * @param b 明るさ, eg: 255
     */
    //% block="点灯 x %x|y %y|明るさ %b"
    export function plotBrightness(x: number, y: number,b:number): void {
        switch (rotate) {
            case 0:
                led.plotBrightness(x, y,b); break;
            case 1:
                led.plotBrightness(y, 4 - x,b); break;
            case 2:
                led.plotBrightness(4 - x, 4 - y,b); break;
            case 3:
                led.plotBrightness(4 - y, x,b); break;
            default:
                led.plotBrightness(x, y,b); break;
        }
    }
    /**
     * ICONを表示する
     * @param l0 0行目, eg: 01110
     * @param l1 1行目, eg: 10001
     * @param l2 2行目, eg: 00100
     * @param l3 3行目, eg: 01010
     * @param l4 4行目, eg: 11111
     */
    //% block="Icon表示 %l0 %l1 %l2 %l3 %l4"
    export function showIcon(l0: string, l1: string,l2: string, l3: string,l4: string): void {
        let wicon=[l0,l1,l2,l3,l4];
        for (let y=0;y<5;y++){
            for (let x=0;x<5;x++){
                if (wicon[y].charAt(x)=="1"){
                    plot(x,y);
                } else{
                    unplot(x,y);
                }
            }
        }
    }
    /**
     * LEDの状態を取り出す
     * @param x x座標, eg: 1
     * @param y y座標, eg: 3
     */
    //% block="LED x %x|y %y|が点灯している"
    export function point(x: number, y: number): boolean {
        switch (rotate) {
            case 0:
                return led.point(x, y)
            case 1:
                return led.point(y, 4 - x)
            case 2:
                return led.point(4 - x, 4 - y)
            case 3:
                return led.point(4 - y, x)
            default:
                return led.point(x, y)
        }
        return false
    }
    /**
     * 回転方向を設定する
     * @param r 回転方向
     */
    //% block="回転方向 %r=rotate_left"
    export function setRotatation(r: rotate): void {
        rotate = r
    }
    /**
     * スクロール速度を設定する
     * @param ss 数値, eg: 100
     */
    //% block="スクロール速度 %ss"
    export function setScroleSpeed(ss: number): void {
        scroleSpeed = ss
    }
    /**
     * 2桁の数値を表示する
     * @param n 表示する数値, eg: 32
     */
    //% block="2桁の数を表示 %n"
    export function showNumber2(n: number): void {
        const font: number[] = [1023, 31, 765, 703, 927, 951, 1015, 636, 891, 959]
        let dfont: number
        let wn = Math.abs(n)
        if (wn > 99) {
            plot(0, 0)
            return
        }
        unplot(2, 0)
        unplot(2, 1)
        if (n < 0) led.plot(2, 2); else led.unplot(2, 2);
        unplot(2, 3)
        unplot(2, 4)

        dfont = font[Math.trunc(wn / 10)]
        for (let i = 0; i < 5; i++) {
            if ((dfont >> (9 - i) & 0x01) == 0x01) {
                plot(0, i)
            } else {
                unplot(0, i)
            }
            if ((dfont >> (4 - i) & 0x01) == 0x01) {
                plot(1, i)
            } else {
                unplot(1, i)
            }
        }
        dfont = font[wn % 10 >> 0]
        for (let i = 0; i < 5; i++) {
            if ((dfont >> (9 - i) & 0x01) == 0x01) {
                plot(3, i)
            } else {
                unplot(3, i)
            }
            if ((dfont >> (4 - i) & 0x01) == 0x01) {
                plot(4, i)
            } else {
                unplot(4, i)
            }
        }
    }
    /**
     * 数値をそろばん形式で表示する
     * @param n 表示する数値, eg: 2048
     * @param s 表示開始位置, eg: 0
     * @param w 表示桁数, eg: 4
     */
    //% block="そろばん形式で数を表示 %n|表示位置 %s|桁数 %w"
    export function showSorobanNumber(n: number, s: number = 0, w: number = 5): void {
        let wn = Math.abs(n)
        for (let i = s + w - 1; i >= s; i--) {
            let d = wn % 10 >> 0
            if (wn == 0) {
                unplot(i, 0)
                unplot(i, 1)
                if (n <= 0) plot(i, 2); else unplot(i, 2);
                unplot(i, 3)
                unplot(i, 4)
            } else {
                if (d >= 5) plotBrightness(i, 0,255); else unplot(i, 0);
                d = d % 5 >> 0
                if (d >= 4) plotBrightness(i, 4,50); else unplot(i, 4)
                if (d >= 3) plotBrightness(i, 3,50); else unplot(i, 3)
                if (d >= 2) plotBrightness(i, 2,50); else unplot(i, 2)
                if (d >= 1) plotBrightness(i, 1,50); else unplot(i, 1)
                wn = Math.trunc(wn / 10)
            }
        }
    }
}
