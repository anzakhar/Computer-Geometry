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

    ctx.fillStyle = "#ff0000"; 
    ctx.save();
    ctx.fillStyle = "#00ff00"; 
    ctx.save();
    ctx.fillStyle = "#0000ff";
    // рисование синего прямоугольника
    // с левым верхним углом в точке (100, 100)
    ctx.fillRect(100, 100, 100, 200);
    ctx.restore();
    // рисование зеленого прямоугольника
    // с левым верхним углом в точке (110, 110)
    ctx.fillRect(110, 110, 100, 200);
    ctx.restore();
    // рисование красного прямоугольника 
    // с левым верхним углом в точке (0, 0) 
    ctx.fillRect(0, 0, 100, 200);

    // ctx.save();
    // ctx.translate(100, 100);
    // ctx.fillStyle = "red";
    // ctx.fillRect(0, 0, 50, 50);
    // ctx.translate(100, 100);
    // ctx.fillStyle = "green";
    // ctx.fillRect(0, 0, 50, 50);
    // ctx.restore();
    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, 50, 50);

    // ctx.translate(200, 150);
    // ctx.strokeStyle = "red";
    // ctx.strokeRect(-50, -25, 100, 50);
    // ctx.rotate(Math.PI / 6);
    // ctx.strokeStyle = "blue";
    // ctx.strokeRect(-50, -25, 100, 50);

    // ctx.save();
    // ctx.strokeStyle = "red";
    // ctx.strokeRect(0, 0, 50, 50)
    // ctx.scale(3, 1);
    // ctx.strokeStyle = "green";
    // ctx.strokeRect(0, 0, 50, 50)
    // ctx.restore();
    // ctx.save();
    // ctx.scale(1, 3);
    // ctx.strokeStyle = "blue";
    // ctx.strokeRect(0, 0, 50, 50);
    // ctx.restore();
    // ctx.save();
    // ctx.scale(3, 3);
    // ctx.strokeStyle = "black";
    // ctx.strokeRect(0, 0, 50, 50);
    // ctx.restore();

    // ctx.transform(1,0,1,1,0,0);
    // ctx.strokeStyle = "black";
    // ctx.strokeRect(0, 0, 100, 100);
}
