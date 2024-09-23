// 04.js

"use strict";

function main() {
    // Retrieve <canvas> element
    const canvas = document.getElementById('mycanvas');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    // Get the rendering context for 2DCG
    const ctx = canvas.getContext('2d');

    const lgradient1 = ctx.createLinearGradient(0, 80, 640, 80);
    lgradient1.addColorStop(0, 'white');
    lgradient1.addColorStop(1, 'black');
    ctx.fillStyle = lgradient1;
    ctx.fillRect(80, 80, 480, 80);

    // const lgradient2 = ctx.createLinearGradient(0, 0, 640, 0);
    // lgradient2.addColorStop(0.00, 'red');
    // lgradient2.addColorStop(0.14, 'orange');
    // lgradient2.addColorStop(0.28, 'yellow');
    // lgradient2.addColorStop(0.42, 'green');
    // lgradient2.addColorStop(0.56, 'blue');
    // lgradient2.addColorStop(0.70, 'indigo');
    // lgradient2.addColorStop(0.84, 'violet');

    // ctx.fillStyle = lgradient2;
    // ctx.fillRect(20, 20, 600, 200);

    // const rgSample = ctx.createRadialGradient(100, 100, 10, 150, 100, 120); 
    // rgSample.addColorStop(0, "#cccccc");
    // rgSample.addColorStop(0.8, "black"); 
    // rgSample.addColorStop(1, "#00ff00");
    // ctx.fillStyle = rgSample;
    // ctx.fillRect(0, 0, 200, 100);

    // const rgradient1 = ctx.createRadialGradient(320, 120, 0, 320, 120, 320);
    // rgradient1.addColorStop(0.00, 'red');
    // rgradient1.addColorStop(0.14, 'orange');
    // rgradient1.addColorStop(0.28, 'yellow');
    // rgradient1.addColorStop(0.42, 'green');
    // rgradient1.addColorStop(0.56, 'blue');
    // rgradient1.addColorStop(0.70, 'indigo');
    // rgradient1.addColorStop(0.84, 'violet');

    // ctx.fillStyle = rgradient1;
    // ctx.fillRect(20, 20, 600, 200);

    // const rgradient2 = ctx.createRadialGradient(0, 120, 0, 480, 120, 480);
    // rgradient2.addColorStop(0.00, 'red');
    // rgradient2.addColorStop(0.14, 'orange');
    // rgradient2.addColorStop(0.28, 'yellow');
    // rgradient2.addColorStop(0.42, 'green');
    // rgradient2.addColorStop(0.56, 'blue');
    // rgradient2.addColorStop(0.70, 'indigo');
    // rgradient2.addColorStop(0.84, 'violet');

    // ctx.fillStyle = rgradient2;
    // ctx.fillRect(20, 20, 600, 200);

    // const imgSample = new Image();
    // imgSample.onload = function(){
    //     const cpSample = ctx.createPattern(imgSample, "repeat"); //"repeat-x" "repeat-y" "no-repeat"
    //     ctx.fillStyle = cpSample;
    //     ctx.fillRect(0, 0, 500, 500);
    // }
    // imgSample.src = "graphic_color.jpg";

    // ctx.shadowOffsetX = 2;
    // ctx.shadowOffsetY = -2;
    // ctx.shadowBlur = 1;
    // ctx.shadowColor = "rgba(128, 128, 128, 0.5)";
    // ctx.font = "bold 24pt Tahoma";
    // ctx.fillText("Двое: я и моя тень.", 150, 50);

    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 50, 400, 200);
    // ctx.fillStyle = "red";
    // ctx.globalCompositeOperation = "source-over"; //"source-atop" "source-in" "source-out" "destination-over" "destination-atop" "destination-in" "destination-out" "lighter" "xor" "copy"
    // ctx.fillRect(100, 0, 200, 300);

    // ctx.beginPath();
    // ctx.moveTo(100, 150);
    // ctx.lineTo(200, 0);
    // ctx.lineTo(200, 300);
    // ctx.closePath();
    // ctx.clip();
    // ctx.fillRect(0, 100, 400, 100);

    // const idEmpty = ctx.createImageData(255, 255);
    // for (let i = 0; i < idEmpty.data.length; i += 4) {
    //     idEmpty.data[i + 0] = i / 4 / 255;
    //     idEmpty.data[i + 1] = 255 - i / 4 / 255;
    //     idEmpty.data[i + 2] = i / 4 / 255;
    //     idEmpty.data[i + 3] = 255 - i / 4 / 255;
    // }      
    // ctx.putImageData(idEmpty, 0, 0);

}
