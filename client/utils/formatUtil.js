import {Dark_color} from '../config/constants';

function strNumSize(tempNum) {
    var stringNum = tempNum.toString();
    var index = stringNum.indexOf(".");
    var newNum = stringNum;
    if (index != -1) {
        newNum = stringNum.substring(0, index);
    }
    return newNum.length;
}

export function unitConvert(num, fix = 2) {
    if (!num && num !== 0) return '';

    var moneyUnits = ["", "万", "亿", "万亿"];
    var dividend = 10000;
    var curentNum = num;
    //转换数字
    var curentUnit = moneyUnits[0]; //转换单位
    for (var i = 0; i < 4; i++) {
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
    '1': 'green',
    '-1': 'red'
}

export function trendFormat(price_change_percent) {

    if(!price_change_percent || !price_change_percent.toFixed){
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