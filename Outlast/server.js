var  express = require("express")
var  app = express()

var server  = require("http").Server(app)
var io = require("socket.io")(server)
var fs = require("fs")

app.use(express.static("."))

app.get("/",function(req,res){
            res.redirect("index.html")
})


server.listen(3000,function (){
    console.log("Server is run");
})
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
io.sockets.emit('send messege',matrix)


 grassArr = []
 grassEaterArr = []
 predatorArr = []
 zombiArr = []
 humanArr = []

 Grass = require("./grass")
 GrassEater = require("./grassEater")
 Predator= require("./predator")
 Human = require("./human")
 Zombi = require("./zombi")



 function createObject() {
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
io.sockets.emit('send messege',matrix)
}



