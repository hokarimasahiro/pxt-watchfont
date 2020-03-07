/**
 * Font for watch Display blocks
 */
enum rotate {
    //% block="top"
    top = 0,
    //% block="left"
    left = 1,
    //% block="under"
    under = 2,
    //% block="right"
    right = 3
}
//% weight=100 color=#0fbc11 icon="\u270f" block="Font for Watch"
namespace watchfont {
    let rotate: number = 0      // 0:top,1:left,2:under,3:right
    let scroleSpeed: number = 200
    /**
     * TODO:LEDを点ける
     * @param x x座標。, eg: 1
     * @param y y座標。, eg: 3
     */
    //% blockId="plot" block="plot %x %y"
    //% weight=88 blockGap=8
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
     * TODO:LEDを消す
     * @param x x座標。, eg: 1
     * @param y y座標。, eg: 3
     */
    //% blockId="unplot" block="unplot %x %y"
    //% weight=88 blockGap=8
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
     * TODO:LEDの状態を取り出す
     * @param x x座標。, eg: 1
     * @param y y座標。, eg: 3
     */
    //% blockId="point" block="point %x %y"
    //% weight=88 blockGap=8
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
     * TODO:回転方向を設定する
     * @param r rotate。, eg: left
     */
    //% blockId="回転方向" block="回転方向 %r"
    //% weight=90 blockGap=8
    export function setRotatation(r: rotate): void {
        rotate = r
    }
    /**
     * TODO:スクロール速度を設定する
     * @param ss 数値。, eg: 100
     */
    //% blockId="スクロール速度" block="スクロール速度 %ss"
    //% weight=88 blockGap=8
    export function setScroleSpeed(ss: number): void {
        scroleSpeed = ss
    }
    /**
     * TODO: 2桁の数値を表示する
     * @param n 表示する数値。, eg: 32
     */
    //% blockId="2桁の数を表示" block="2桁の数を表示 %n"
    //% weight=60 blockGap=8
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
     * TODO: 数値をそろばん形式で表示する
     * @param n 表示する数値。, eg: 2048
     * @param s 表示開始位置。, eg: 0
     * @param w 表示桁数。, eg: 4
     */
    //% blockId="そろばん形式で数を表示" block="そろばん形式で数を表示 %n 表示位置 %s 桁数 %w"
    //% weight=50 blockGap=8
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
                if (d >= 5) plot(i, 0); else unplot(i, 0);
                d = d % 5 >> 0
                if (d >= 4) plot(i, 1); else unplot(i, 1)
                if (d >= 3) plot(i, 2); else unplot(i, 2)
                if (d >= 2) plot(i, 3); else unplot(i, 3)
                if (d >= 1) plot(i, 4); else unplot(i, 4)
                wn = Math.trunc(wn / 10)
            }
        }
    }
}
