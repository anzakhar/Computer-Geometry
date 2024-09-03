// 01.js

"use strict";

function main() {
    // Retrieve <canvas> element
    const canvas = document.getElementById('mycanvas');
    console.assert(canvas, 'Failed to retrieve the <canvas> element');

    // Get the rendering context for 2DCG
    const ctx = canvas.getContext('2d');

    //////Draw a green rectangle
    ctx.fillStyle = "Green"; // Set color to green
    //ctx.fillStyle = 'rgb(0, 255, 0)'; // Set color to green
    ////ctx.fillStyle = "#00ff00"; // Set color to green
    ctx.fillRect(10, 100, 500, 100); // Fill a rectangle with the color

    ////Поверх зеленого прямоугольника рисуем прямоугольник с заливкой, но уже
    ////полупрозрачным синим цветом.
    //ctx.fillStyle = "rgba(0, 0, 127, 0.5)"; // Задаем для контура темно-синий полупрозрачный цвет.
    ////ctx.globalAlpha = 0.5;
    //ctx.fillRect(100, 0, 200, 300);        

    ////Нарисовать прямоугольник без заливки (т.е. только контур прямоугольника) 
    //ctx.strokeStyle = "red"; // Set color to red
    //ctx.strokeRect(20, 20, 360, 260);
    //ctx.fillStyle = "green"; // Set color to green
    //ctx.fillRect(20, 20, 360, 260);

    ////Рисуем большой прямоугольник с заливкой, занимающий всю канву, после чего
    ////создаем в его середине прямоугольную "прореху".
    //ctx.fillRect(0, 0, 400, 300);
    //ctx.clearRect(100, 100, 200, 100);

    ////Очищаем всю канву от всей присутствующей на ней графики.
    //ctx.clearRect(0, 0, 535, 360);

    ////Вывод текста в виде сплошной заливки
    //ctx.fillStyle = "red";
    //ctx.fillText("HTML, CSS", 50, 40);

    ////Вывод текста, представляющего собой один лишь контур без заливки
    //ctx.strokeStyle = "blue";
    ////Настраиваем атрибуты шрифта
    // ctx.font = "italic 72pt Times";
    //ctx.strokeText("JavaScript", 100, 100, 100);

    //ctx.textAlign = "center"; /*"left";*/ /*"right";*/ /*"start";*/ /*"end";*/
    //ctx.fillText("HTML, CSS", 100, 100);

    //ctx.textBaseline = "top";
    //ctx.fillText("HTML, CSS", 100, 100);

    ////Вычисляем ширину строки, после чего выводим ее на канву, указав для него мак-
    ////симальную ширину, равную 2/3 от вычисленной.
    //const s = "HTML, CSS, JavaScript, PHP, MySQL";
    //ctx.font = "bold 24pt Tahoma";
    //const w = ctx.measureText(s).width;
    //ctx.fillText(s, 100, 100, 2 * w / 3);

    ////Рисуем красный треугольник без заливки.
    //ctx.strokeStyle = "red";
    //ctx.beginPath();
    //ctx.moveTo(20, 20);
    //ctx.lineTo(380, 20);
    //ctx.lineTo(200, 280);
    //ctx.closePath();
    //ctx.stroke();

    ////Здесь мы рисуем круг с зеленым контуром.
    //ctx.strokeStyle = "green";
    //ctx.beginPath();
    //ctx.arc(200, 150, 100, 0, Math.PI, false);
    //ctx.stroke();
	
	// ctx.strokeStyle = "blue";
    // ctx.beginPath();
	// ctx.arc(240, 99, 100, Math.PI/4, 3*Math.PI/4, false);
    // ctx.arc(240, 99, 100, 3*Math.PI/4, Math.PI/4, true);
    // ctx.stroke();

    ////дуга окружности синего цвета, построенная по трем точкам
    //ctx.strokeStyle = 'blue';
    //for (let j = 0; j <= 280; j += 40) {
    //   ctx.beginPath();
    //   ctx.moveTo(20, 20);
    //   ctx.arcTo(240, 240, 460, 20, j);
    //   ctx.lineTo(460, 20);
    //   ctx.stroke();
    //}    

    ////Кривая Безье
    //ctx.beginPath();
    //ctx.moveTo(100, 100);
    //ctx.bezierCurveTo(120, 80, 160, 20, 100, 200);
    //ctx.stroke();

    ////дуга окружности красного цвета, построенная с помощью кривой Безье
    //ctx.beginPath();
    //ctx.strokeStyle = "red";
    //ctx.moveTo(100, 100);
    //ctx.quadraticCurveTo(200, 100, 200, 200);
    //ctx.stroke();

    ////сектор окружности красного цвета
    //ctx.beginPath();
    //ctx.fillStyle = "red";
    //ctx.moveTo(100, 100);
    //ctx.quadraticCurveTo(200, 100, 200, 200);
    //ctx.lineTo(100, 200);
    //ctx.fill();

    ////Пример создания прямоугольника со скругленными углами
    //ctx.beginPath();
    //ctx.moveTo(20, 0);
    //ctx.lineTo(180, 0);
    //ctx.quadraticCurveTo(200, 0, 200, 20);
    //ctx.lineTo(200, 80);
    //ctx.quadraticCurveTo(200, 100, 180, 100);
    //ctx.lineTo(20, 100);
    //ctx.quadraticCurveTo(0, 100, 0, 80);
    //ctx.lineTo(0, 20);
    //ctx.quadraticCurveTo(0, 0, 20, 0);
    //ctx.stroke();

    ////Рисуем красный квадрат
    // ctx.beginPath();
    // ctx.fillStyle = "red";
    // ctx.rect(50, 50, 50, 50);
    // ctx.fill();

    ////Атрибуты линии
    //ctx.fillStyle = 'red';
    //ctx.font = 'bold 13pt Courier';
    //ctx.strokeStyle = 'blue';
    //ctx.textBaseline = 'top';
    //ctx.lineWidth = 20;
    //const caps = ['butt', 'round', 'square'];
    //const joins = ['round', 'bevel', 'miter'];

    //for (let j = 0; j < 3; ++j) {
    //   for (let k = 0; k < 3; ++k) {
    //       ctx.lineCap = caps[j];
    //       ctx.lineJoin = joins[k];

    //       ctx.fillText(' cap:' + caps[j], 33 + j * 180, 45 + k * 120);
    //       ctx.fillText('join:' + joins[k], 33 + j * 180, 65 + k * 120);

    //       ctx.beginPath();
    //       ctx.moveTo(20 + j * 180, 100 + k * 120);
    //       ctx.lineTo(20 + j * 180, 20 + k * 120);
    //       ctx.lineTo(155 + j * 180, 20 + k * 120);
    //       ctx.lineTo(155 + j * 180, 100 + k * 120);
    //       ctx.stroke();
    //   }
    //}
	
		  
	// let sx = 200;
	// let sy = 100;
	// let l = 150;
	// let h = 30;
	
    // ctx.strokeStyle = 'blue';
    // ctx.lineWidth = 20;
	// ctx.lineJoin = 'miter';
	// ctx.miterLimit = 150;
	
	// ctx.beginPath();
	// ctx.moveTo(sx - l, sy - h/2);
	// ctx.lineTo(sx + l, sy + h/2);
	// ctx.lineTo(sx - l, sy + 3*h/2);
	// ctx.stroke();
	

    ////Определение вхождения точки в состав контура
    //ctx.beginPath();
    //ctx.rect(50, 50, 50, 50);
    //ctx.stroke();
    //if (ctx.isPointInPath(60, 40)) {
    //   window.alert("Stroke contains point");
    //}

    // const lgradient1 = ctx.createLinearGradient(0, 80, 640, 80);
    // lgradient1.addColorStop(0, 'white');
    // lgradient1.addColorStop(1, 'black');
    // ctx.fillStyle = lgradient1;
    // ctx.fillRect(80, 80, 480, 80);

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
        // const cpSample = ctx.createPattern(imgSample, "repeat"); //"repeat-x" "repeat-y" "no-repeat"
        // ctx.fillStyle = cpSample;
        // ctx.fillRect(0, 0, 500, 500);
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
