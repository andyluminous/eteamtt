function karatsubaFn(x, y) {
    // if (isNaN(x) || isNaN(y)) {
    //     return 'Invalid input';
    // }

    var base = 10;

    x = '' + x,
    y = '' + y;

    xBi = BigInteger(x);
    yBi = BigInteger(y);

    console.log('x:', x);
    console.log('y:', y);

    var xLength = x.length,
        yLength = y.length;

    if (xLength <= 4 && yLength <= 4) {
        return xBi.multiply(yBi).toString();
    }

    var maxLength = Math.max(xLength, yLength),
        n = Math.round(maxLength / 2);

    var a,b,c,d;        

        if (xLength <= n) {
            a = BigInteger('0');
            b = BigInteger(x);
            c = BigInteger(y.slice(0, yLength - n));
            d = BigInteger(y.slice(yLength - n));
        } else if (yLength <= n) {
            a = BigInteger(x.slice(0, xLength - n));
            b = BigInteger(x.slice(xLength - n));
            c = BigInteger('0'),
            d = BigInteger(y);
        } else {
            a = BigInteger(x.slice(0, xLength - n));
            b = BigInteger(x.slice(xLength - n));
            c = BigInteger(y.slice(0, yLength - n));
            d = BigInteger(y.slice(yLength - n));

        }

        // a = (xLength <= n) ? 0 : parseInt(x.slice(0,xLength - n)),
        // b = (xLength <= n) ? parseInt(x) : parseInt(x.slice(xLength - n,xLength)),
        // c = (yLength <= n) ? 0 : parseInt(y.slice(0,yLength - n)),
        // d = (yLength <= n) ? parseInt(y) : parseInt(y.slice(yLength - n,yLength));

    var ac = BigInteger(karatsubaFn(a.toString(),c.toString())),
        bd = BigInteger(karatsubaFn(b.toString(),d.toString())),
        adbc = BigInteger(karatsubaFn(a.add(b).toString(),c.add(d).toString())).subtract(ac).subtract(bd),
        n1 = BigInteger(Math.pow(base,n)),
        n2 = BigInteger(Math.pow(base,n*2));

        console.log(a.toString(), b.toString(), c.toString(), d.toString());
   
    return ac.multiply(n2).add(adbc.multiply(n1)).add(bd).toString(); 
}

function getExpLength (x) {
    return parseInt(x.toExponential().toString().split('e+')[1]) + 1;
}
