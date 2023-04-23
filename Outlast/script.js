var socket = io()
let side = 30
///օբյեկտներ պահելու զանգվածներ
function setup() {
    
        createCanvas(20 * side, 20 * side)
        background("gray")
       
}


function nkarel(matrix) {
        console.log(matrix);
        for (var y = 0; y < matrix.length; y++) {
                for (var x = 0; x < matrix[y].length; x++) {
                    var toBot = side - side * 0.3
                    textSize(toBot);
                    if (matrix[y][x] == 1) {
                        fill("green");
                        rect(x * side, y * side, side, side);
                        text('🌱', x * side, y * side + toBot);
                    }
                    else if (matrix[y][x] == 2) {
                        fill("yellow");
                        rect(x * side, y * side, side, side);
                        text('🐄', x * side, y * side + toBot);
                    }
                    else if (matrix[y][x] == 3) {
                        fill("orange");
                        rect(x * side, y * side, side, side);
                        text('🐅',  x * side, y * side + toBot);
                    }else if(matrix[y][x] == 4){
                        fill("Magenta");                       
                        rect(x * side, y * side, side, side);
                        text('🧟',  x * side, y * side + toBot);
                    }
                    else if(matrix[y][x] == 5){
                        fill("gray");
                        rect(x * side, y * side, side, side);
                        text('🏃🏽', x * side, y * side + toBot);
                    }
                    else {
                        fill("white")
                        rect(x * side, y * side, side, side)
                    }
                }
            }



                // for (let i in grassArr) {
                //         grassArr[i].mul()
                // }


                // for(let i in grassEaterArr){
                //         grassEaterArr[i].eat()
                // }

             

                // for(let i in predatorArr){
                //         predatorArr[i].eat()
                // }


                // for(let i in zombiArr){
                //         zombiArr[i].eat()
                // }
                // for(let i in humanArr){
                //         humanArr[i].eat()
                // }
 


}
socket.on('send messege',nkarel)