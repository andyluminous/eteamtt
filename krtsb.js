function karatsubaFn(x, y) {
    // if (isNaN(x) || isNaN(y)) {
    //     return 'Invalid input';
    // }

    var base = 10;

    x = '' + x,
    y = '' + y;



    console.log('x:', x);
    console.log('y:', y);

    var xLength = x.length,
        yLength = y.length;

    if (xLength <= 4 && yLength <= 4) {
        var res = parseInt(x) * parseInt(y);
        return res.toString();
    }

    var maxLength = Math.max(xLength, yLength),
        n = Math.round(maxLength / 2);

    var a,b,c,d;        

        if (xLength <= n) {
            a = '0';
            b = x;
            c = y.slice(0, yLength - n);
            d = y.slice(yLength - n);
        } else if (yLength <= n) {
            a = x.slice(0, xLength - n);
            b = x.slice(xLength - n);
            c = '0',
            d = y;
        } else {
            a = x.slice(0, xLength - n);
            b = x.slice(xLength - n);
            c = y.slice(0, yLength - n);
            d = y.slice(yLength - n);

        }

    var ac = karatsubaFn(a,c),
        bd = karatsubaFn(b,d),
        adbc = subtractStrInt(karatsubaFn(addStrInt(a,b),addStrInt(c,d)), addStrInt(ac,bd)),
        n1 = Math.pow(base,n),
        n2 = Math.pow(base,n*2);

        console.log(a.toString(), b.toString(), c.toString(), d.toString());
   
    return addStrInt(addStrInt(multiplyByTenPow(ac,n*2),multiplyByTenPow(adbc,n)),bd); 
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
        signChange = false,
        zeroesRemoved = false;

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

    while (!zeroesRemoved) {
        if (result[0] === '0') {
            result = result.slice(1);
        } else {
            zeroesRemoved = true;
        }
    }
 

    if (signChange) result = '-' + result;

    return result;
}

function multiplyByTenPow (x,n) {
    return x + '0'.repeat(parseInt(n));
}