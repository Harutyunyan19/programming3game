function matrixGenerator(matrixSize, grass,grassEater,predator,zombi,human) {
        var matrix = []
        ////  matrix սարքելու հատված
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([])
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0)
                }
        }

        // 1 -եր այսինքն խոտեր քցելու հատված մատռիքսում
        for (let i = 0; i < grass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 1
        }
         //GrassEater 2

         for (let i = 0; i < grassEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 2
        }
        //3 predator


        for (let i = 0; i < predator; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 3
        }

        //4 Zombi
        for (let i = 0; i < zombi; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 4
        }
        //5 human
        for (let i = 0; i < human; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 5
        }
    

       
       
        return matrix
}

let matrix = matrixGenerator(20, 17,7,4,5,4)
let side = 30
///օբյեկտներ պահելու զանգվածներ
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var zombiArr = []
var humanArr = []


function setup() {
        frameRate(15)
        createCanvas(matrix[0].length * side, matrix.length * side)
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if(matrix[y][x] == 2){
                             let grEat = new  GrassEater(x,y)
                             grassEaterArr.push(grEat)
                        }else if(matrix[y][x] ==  3){
                             let pre = new Predator(x,y)
                             predatorArr.push(pre)
                        }else if(matrix[y][x] ==  4){
                                let zmb = new Zombi(x,y)
                                zombiArr.push(zmb)
                        }else if(matrix[y][x] ==  5){
                                let human = new Human(x,y)
                                humanArr.push(human)
                        }


                }
        }

}



function draw() {
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



                for (let i in grassArr) {
                        grassArr[i].mul()
                }


                for(let i in grassEaterArr){
                        grassEaterArr[i].eat()
                }

             

                for(let i in predatorArr){
                        predatorArr[i].eat()
                }


                for(let i in zombiArr){
                        zombiArr[i].eat()
                }
                for(let i in humanArr){
                        humanArr[i].eat()
                }
 


}
