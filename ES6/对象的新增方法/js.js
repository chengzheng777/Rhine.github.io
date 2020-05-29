(function addDk () {
    let x = 7723;      // 本金
    let y = 0;         //  当月利息
    let z = 0;         //  累计利息
    let num = 0 ;
    for( let i = 1 ; i < 7 ; i++ ) {
        y = ((x * 0.04)/12);  //当月利息
        x -= 1287.16;  //还500 
        z += y;
        console.log(x, y, z, i)
    }
    num = 7723 - z;
    console.log(num);
})();


(function addDk1 () {
    let x = 8197;      // 本金
    let y = 0;         //  当月利息
    let z = 0;         //  累计利息
    let num = 0 ;
    for( let i = 1 ; i < 25 ; i++ ) {
        y = ((x * 0.04)/12);  //当月利息
        x -= 341.54;  //还500 
        z += y;
        console.log(x, y, z, i)
    }
    num = 8197 - z;
    console.log(num);
})();

