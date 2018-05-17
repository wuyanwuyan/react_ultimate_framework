import {Dark_color} from '../config/constants';

export function unitConvert(num, fix = 2) {


    function strNumSize(tempNum) {
        let stringNum = tempNum.toString();
        let index = stringNum.indexOf(".");
        let newNum = stringNum;
        if (index != -1) {
            newNum = stringNum.substring(0, index);
        }
        return newNum.length;
    }


    if(!num) return '';

    if (typeof num === 'string'){
        num = parseFloat(num);
    }

    if(typeof num !== 'number') {
        return num.toString();
    }

    let moneyUnits = ["", "万", "亿", "万亿"];
    let dividend = 10000;
    let curentNum = num;
    // //转换数字
    var curentUnit = moneyUnits[0]; //转换单位
    for (let i = 0; i < 4; i++) {
        curentUnit = moneyUnits[i];
        if (strNumSize(curentNum) < 5) {
            break;
        }
        curentNum = curentNum / dividend;
    }
    return curentNum.toFixed(fix) + curentUnit;
}

//  趋势数字 格式化

const TrendColor = {
    '0': Dark_color,
    '1': '#00b787',
    '-1': '#f8584b'
}

export function trendFormat(price_change_percent) {

    if (typeof price_change_percent === 'string') price_change_percent = parseFloat(price_change_percent);

    if (!price_change_percent || !price_change_percent.toFixed) {
        price_change_percent = 0;
    }

    let trend_state = 1;
    let trend_txt = null;
    if (price_change_percent < 0) {
        trend_state = -1;
        trend_txt = `${price_change_percent.toFixed(2)}%`;
    } else {
        trend_state = 1;
        trend_txt = `+${price_change_percent.toFixed(2)}%`;
    }

    // if (price_change_percent > -0.00005 && price_change_percent < 0.00005) {
    //     trend_state = 0;
    //     trend_txt = '持平';
    // }

    return {
        state: trend_state,
        txt: trend_txt,
        color: TrendColor[trend_state],
    }

}