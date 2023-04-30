const { count } = require('console');
var express = require("express")
var app = express()
var server = require("http").Server(app)
var io = require("socket.io")(server)
var fs = require("fs")
const { stringify } = require("querystring")

app.use(express.static("."))

app.get("/", function (req, res) {
        res.redirect("index.html")
})


server.listen(3000, function () {
        console.log("Server is run");
})


function matrixGenerator(matrixSize, grass, grassEater, predator, zombi, human) {
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



matrix = matrixGenerator(20, 17, 7, 4, 5, 4)
io.sockets.emit('send messege', matrix)


grassArr = []
grassEaterArr = []
predatorArr = []
zombiArr = []
humanArr = []

Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Human = require("./human")
Zombi = require("./zombi")


// let weathers = ["winter", "spring", "summer", "autumn"];



io.sockets.emit("send matrix", matrix);



function createObject() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if (matrix[y][x] == 2) {
                                let grEat = new GrassEater(x, y)
                                grassEaterArr.push(grEat)
                        } else if (matrix[y][x] == 3) {
                                let pre = new Predator(x, y)
                                predatorArr.push(pre)
                        } else if (matrix[y][x] == 4) {
                                let zmb = new Zombi(x, y)
                                zombiArr.push(zmb)
                        } else if (matrix[y][x] == 5) {
                                let human = new Human(x, y)
                                humanArr.push(human)
                        }


                }
        }
        io.sockets.emit('send messege', matrix)
}


 function game() {
         for (let i in grassArr) {
                 grassArr[i].mul()
         }


        for (let i in grassEaterArr) {
                 grassEaterArr[i].eat()
         }

         for (let i in predatorArr) {
                predatorArr[i].eat()
       }


         for (let i in zombiArr) {
                 zombiArr[i].eat()
         }
         for (let i in humanArr) {
                 humanArr[i].eat()
         }
        io.sockets.emit('send messege', matrix)
 }
setInterval(game, 150)


var weath;



 //Events

 function Winter() {
    weath = "winter";
    io.sockets.emit('Winter', weath);
}

function Summer() {
    weath = "summer";
    io.sockets.emit('Summer', weath);
}

function Spring() {
    weath = "spring";
    io.sockets.emit('Spring', weath);
}
function Autumn() {
    weath = "autumn";
    io.sockets.emit('Autumn', weath);
}

function kill() {
        grassArr = [];
        grassEaterArr = [];
        predatorArr = [];
        humanArr = [];
        zombiArr = [];
        coinArr = [];
        coinerArr = [];
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0;
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    
    function addGr() {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] == 0) {
                    matrix[y][x] = 1
                    grassArr.push(new Grass(x, y, 1))
                }
            }
        }
        console.log(grassArr.length);
        io.sockets.emit("send matrix", matrix);
    }
    
    function addGrEater() {
        for (var i = 0; i < 15; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0 || matrix[y][x] == 1) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x, y, 2));
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    
    function addPred() {
        for (var i = 0; i < 30; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 5 || matrix[y][x] == 0) {
                matrix[y][x] = 3
                predatorArr.push(new Predator(x, y, 3));
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function addHuman() {
        for (var i = 0; i < 20; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 5
                humanArr.push(new Human(x, y, 5));
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    
    function addZombi() {
        for (var i = 0; i < 5; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 4
                zombiArr.push(new Zombi(x, y, 4));
            }
        }
        io.sockets.emit("send matrix", matrix);
    }

    function killPr() {
        for (var i = 0; i < 60; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 3) {
                matrix[y][x] = 0
               predatorArr[i].die();
    
            }
        }
        io.sockets.emit("send matrix", matrix);
    }

    
    function alldatas() {
        countd = {
            Grass: grassArr.length,
            GrassEater: grassEaterArr.length,
            Predator:predatorArr.length,
            Human:humanArr.length,
            Zombi:zombiArr.length,
        }
        fs.writeFile("statistics.json", JSON.stringify(countd), function () {
            io.sockets.emit("send datas", countd)
        })
        // io.sockets.emit("send datas", countd)
    
    }
    setInterval(alldatas, 300);
    


    io.on('connection', function (socket) {
        createObject();
        socket.on("spring", Spring);
        socket.on("summer", Summer);
        socket.on("autumn", Autumn);
        socket.on("winter", Winter);
        socket.on('killAll', kill);
        socket.on('AddGr', addGr);
        socket.on('AddGrEater', addGrEater);
        socket.on('AddPre', addPred);
        socket.on('AddHuman', addHuman);
        socket.on('AddZombi', addZombi);
        socket.on('KillPr', killPr);
    })


var statisticks = {}

setInterval(function () {
        statisticks.grass = grassArr.length
        statisticks.grassEater = grassEaterArr.length
        statisticks.predatorArr = predatorArr.length
        statisticks.zombiArr = zombiArr.length
        statisticks.humanArr = humanArr.length

        fs.writeFile("statisticks.json", JSON.stringify(statisticks), function () {

        })
},1000)