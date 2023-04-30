var socket = io()
let side = 30
let myChart;
// let weather1= "winter";


// function changer(){
//     if(weather1 == "winter"){
//         document.getElementById("wstyle").style.color = "#8d05e8";
//     }
//     else{
//         document.getElementById("wstyle").style.color = "white";
//     }
// }
// ///օբյեկտներ պահելու զանգվածներ
function setup() {
    
        createCanvas(20 * side, 20 * side)
        background("gray")
//         document.getElementById("weather").innerHTML = weather1;
//         document.getElementById("wstyle").style.backgroundColor = weathSwitcher[weather1]
//     changer();
 }
 socket.on("Winter", function (data) {
    weath = data;
})
socket.on("Summer", function (data) {
    weath = data;
})
socket.on("Spring", function (data) {
    weath = data;
})
socket.on("Autumn", function (data) {
    weath = data;
})
 var weath = "spring";



 socket.on ("send datas", function(counts){
    // console.log(counts);
    document.getElementById("grass").innerHTML = counts.Grass;
    document.getElementById("grassEater").innerHTML = counts.GrassEater;
    document.getElementById("pred").innerHTML = counts.Predator;
    document.getElementById("zombi").innerHTML = counts.Zombi;
    document.getElementById("human").innerHTML = counts.Human;
    
    myChart.data.datasets[0].data = [counts.Grass, counts.GrassEater, counts.Predator, counts.Zombi, counts.Human];
    myChart.update();
})

//     socket.on ('weather', function(data){
//         weather1 = data;
//         document.getElementById("weather").innerHTML = weather1;
//         document.getElementById("wstyle").style.backgroundColor = weathSwitcher[weather1]
       
//           changer();
//     })
    
// weathSwitcher = {
//     winter :"white",
//     spring: "#62D319",
//     summer: "green",
//     autumn: "#C75520"
// }



function nkarel(matrix) {
        for (var y = 0; y < matrix.length; y++) {
                for (var x = 0; x < matrix[y].length; x++) {
                    var toBot = side - side * 0.3
                    textSize(toBot);
                    if (matrix[y][x] == 1) {
                        fill("green");
                        if (weath == "spring") {
                            fill("darkgreen");
                        }
                        else if (weath == "summer") {
                            fill("#79a83b");
                        }
                        else if (weath == "autumn") {
                            fill("#ff8453");
                        }
                        if (weath == "winter") {
                            fill("#ffffff");
                        }
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

function Winter() {
    socket.emit("winter");
}
function Summer() {
    socket.emit("summer");
}
function Spring() {
    socket.emit("spring");
}
function Autumn() {
    socket.emit("autumn");
}

function kill(){
    socket.emit('killAll');
    }
    
    function addGr(){
        socket.emit('AddGr');
    }
    
    function addGrEater(){
        socket.emit('AddGrEater');
    }
    
    function addPr(){
        socket.emit('AddPre');
    }

    function addZombi(){
        socket.emit('AddZombi');
    }

    function addHuman(){
        socket.emit('AddHuman')
    }

    function killPr(){
        socket.emit('KillPr')
    }

    function changeWeather(){
        socket.emit('chWeather');
    }

   
    