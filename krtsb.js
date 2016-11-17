function karatsubaFn(x, y) {
    if (isNaN(x) || isNaN(y) || x.length === 0 || y.length === 0) {
        return 'Invalid input';
    }
    var result,
        signChangeRequired = false;

    if (isNegative(x) && isNegative(y)) {
        x = x.slice(1);
        y = y.slice(1);
    } else if (isNegative(x)) {
        x = x.slice(1);
        signChangeRequired = true;
    } else if (isNegative(y)) {
        y = y.slice(1);
        signChangeRequired = true;
    }

    

    x = '' + x,
    y = '' + y;

    var xLength = x.length,
        yLength = y.length;

    if (xLength <= 4 && yLength <= 4) {
        var res = parseInt(x) * parseInt(y);
        res = (signChangeRequired) ? '-' + res : '' + res;
        return res;
    }

    var maxLength = Math.max(xLength, yLength),
        n = Math.round(maxLength / 2),

        a = (xLength <= n) ? '0' : x.slice(0, xLength - n),
        b = (xLength <= n) ? x : x.slice(xLength - n),
        c = (yLength <= n) ? '0' : y.slice(0, yLength - n),
        d = (yLength <= n) ? y : y.slice(yLength - n),

        ac = karatsubaFn(a,c),
        bd = karatsubaFn(b,d),
        adbc = subtractStrInt(karatsubaFn(addStrInt(a,b),addStrInt(c,d)), addStrInt(ac,bd));

    result = addStrInt(addStrInt(multiplyByTenPow(ac,n*2),multiplyByTenPow(adbc,n)),bd);

    if (signChangeRequired) result = '-' + result;

    return result;
}

function addStrInt(x,y) {
    var sum,
        result = '',
        carryOver = 0;
    
    x = '' + x;
    y = '' + y;
    xLength = x.length;
    yLength = y.length;
 
    if (xLength > yLength) {
        y = '0'.repeat(xLength - yLength) + y;
    } else if (yLength > xLength) {
        x = '0'.repeat(yLength - xLength) + x;
    }

    for (var i = x.length - 1; i >= 0; i--) {
        sum = parseInt(x[i]) + parseInt(y[i]) + carryOver;
        if (sum < 10) {
            result = '' + sum + result;
            carryOver = 0;
        } else {
            result = '' + (sum % 10) + result;
            carryOver = 1;
        }
    }

    if (carryOver === 1) {
        result = '1' + result;
    }

    return result;
}

function subtractStrInt(x, y) {
    var diff,
        result = '',
        carryOver = 0,
        signChange = false;

    x = '' + x;
    y = '' + y;

    if (x === y) {
        return '0'
    }

    xLength = x.length;
    yLength = y.length;
 
    if (xLength > yLength) {
        y = '0'.repeat(xLength - yLength) + y;
    } else if (yLength > xLength) {
        x = '0'.repeat(yLength - xLength) + x;
    }

    if (x > y) {
        for (var i = x.length - 1; i >= 0; i--) {
            diff = parseInt(x[i]) - parseInt(y[i]) - carryOver;
            if (diff < 0) {
                result = '' + (diff + 10) + result;
                carryOver = 1;
            } else {
                result = '' + diff + result;
                carryOver = 0;
            }
            
        }
    } else {
        signChange = true;
        for (var i = x.length - 1; i >= 0; i--) {
            diff = parseInt(y[i]) - parseInt(x[i]) - carryOver;
            if (diff < 0) {
                result = '' + (diff + 10) + result;
                carryOver = 1;
            } else {
                result = '' + diff + result;
                carryOver = 0;
            }
        }
    }

    result = trimZeroes(result);
 

    if (signChange) result = '-' + result;

    return result;
}

function multiplyByTenPow (strInt,n) {
    return strInt + '0'.repeat(parseInt(n));
}

function isNegative (strInt) {
    if (strInt[0] === '-') return true;
    return false;
}

function trimZeroes (strInt) {
    var zeroesRemoved = false;
    while (!zeroesRemoved) {
        if (strInt[0] === '0') {
            strInt = strInt.slice(1);
        } else {
            zeroesRemoved = true;
        }
    }
    return strInt;
}