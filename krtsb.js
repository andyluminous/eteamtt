function karatsubaFn(x, y) {
    if (isNaN(x) || isNaN(y)) {
        return 'Invalid input';
    }

    const base = 10;

    let xLength = getExpLength(x),
        yLength = getExpLength(y);

    console.log('x: ',x,', y: ', y);

    if (xLength == 1 || yLength == 1) {
        return x * y;
    }

    let maxLength = Math.max(xLength, yLength),
        n = Math.round(maxLength / 2);

    let a = Math.floor(x / base ** n),
        b = x % (base ** n),
        c = Math.floor(y / base ** n),
        d = y % (base ** n);

    let ac = karatsubaFn(a,c),
        bd = karatsubaFn(b,d),
        adbc = karatsubaFn(a+b,c+d) - ac - bd;
   
    return ac*(base**(n*2)) + adbc*(base**n) + bd; 
}

function getExpLength (x) {
    return parseInt(x.toExponential().toString().split('e+')[1]) + 1;
}
