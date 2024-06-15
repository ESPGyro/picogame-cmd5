/**
 * BLE Command Processor
 */
   export enum Actions {
    //% blockId="m1" block="m1"
    m1 = "1",
    //% blockId="m2" block="m2"
    m2 = "2",
    //% blockId="m3" block="m3"
    m3 = "3",
    //% blockId="m4" block="m4"
    m4 = "4",
    //% blockId="m7" block="m7"
    m7 = "7",
    //% blockId="m8" block="m8"
    m8 = "8",
    //% blockId="m9" block="m9"
    m9 = "9",
    //% blockId="m10" block="m10"
    m10 = "10",
    //% blockId="m11" block="m11"
    m11 = "11"
} 
//% color=#0fbc11 icon="\uf113" block="藍牙指令編輯器"
namespace BLECmd {
    /**
     * 逻辑比较积木示例
     * 比较输入的两个值是否相等
     * @param value1 輸入的值
     * @param value2 指令編輯器代表的意思
     */
    //% block="%value1 等於 %value2 ?"
    //% blockExternalInput=true
    //% value1.shadow="value"
    //% value2.shadow="value"
    //% weight=10
    export function isEqual(value1: string, value2: Actions): boolean {
       if (value2 == "10") {
          return value1=="a";
       } else if (value2 == "11") {
          return value1=="b";
       } else {
        return value1==value2;
       }
    }

    /**
     * Expand BLE command string
     * @param s BLE command string to expand
     * @param startChar Start character of the loop
     * @param endChar End character of the loop
     */
    //% blockId="clearbuff" block="Clear Buffer"
    //% weight=0
    export function clearbuff(): void {
    let bx: Buffer;
    while (true) {
        bx = bluetooth.uartReadBuffer();
        basic.pause(10)
        if (bx.length == 0) {
            break;
        }
        while (bx.length > 0) {
            let chunk = bx.slice(0, 20);
            bx = bx.slice(20);
        }
      }
       return;
    }

    //% blockId="expandCommand" block="Convert BLE command |input %s"
    //% weight=100
    export function expandCommand(s: string): string {
        let newStr: string = s.substr(2, s.length - 1);
        return loopAdd(newStr, '5', '6');

     function loopAdd(s: string, startChar: string, endChar: string): string {
        let result: string[] = [];
        let i: number = 0;

        while (i < s.length) {
            if (s.charAt(i) === startChar) {
                result.push(startChar);
                i += 1;
                let repeatChar: string = s.charAt(i);
                i += 1;
                let startIndex: number = i;

                while (i < s.length && s.charAt(i) !== endChar) {
                    i += 1;
                }

                if (i < s.length && s.charAt(i) === endChar) {  // endChar found
                    let repeatCount: number = 1;
                    switch (repeatChar) {
                        case 'c':
                            repeatCount = 2;
                            break;
                        case 'd':
                            repeatCount = 3;
                            break;
                        case 'e':
                            repeatCount = 4;
                            break;
                        case 'f':
                            repeatCount = 5;
                            break;
                        default:
                            break;
                    }
                    let substring: string = s.substr(startIndex, i - startIndex);
                    for (let j = 0; j < repeatCount; j++) {
                        result.push(substring);
                    }
                    result.push(endChar);
                }
            } else {
                result.push(s.charAt(i));
            }
            i += 1;
        }

        return result.join('');
    }
  } 
}

