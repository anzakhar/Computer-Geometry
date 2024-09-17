// 03.js

"use strict";

const circle = function (ctx, x, у, radius, fillCircle) {
 ctx.beginPath();
 ctx.arc (x, у, radius, 0, Math.PI * 2, false);
 if (fillCircle)
   ctx.fill();
 else
   ctx.stroke();
};

class Ball {
  constructor(ctx, width, height) {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = 5;
    this.ySpeed = 0;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }
  draw() {
    circle(this.ctx, this.x, this.y, 10, true);
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0) {
      this.x = this.width;
    } else if (this.x > this.width) {
      this.x = 0;
    } 
    if (this.y < 0) {
      this.y = this.height;
    } else if (this.y > this.height) {
      this.y = 0;
    }
  }
  setDirection(direction) {
    if (direction === "up" ) {
      this.xSpeed = 0;
      this.ySpeed = -5 ;
    } else if (direction === "down") { 
      this.xSpeed = 0;
      this.ySpeed = 5;
    } else if (direction === "left") { 
      this.xSpeed = -5;
      this.ySpeed = 0;
    } else if (direction === "right") { 
      this.xSpeed = 5;
      this.ySpeed = 0;
    } else if (direction === "stop") { 
      this.xSpeed = 0;
      this.ySpeed = 0;
    }
  }
}

function main() {
  // Retrieve <canvas> element
    const canvas = document.getElementById('mycanvas');
    const ctx = canvas.getContext("2d") ;

    const width = canvas.width;
    const height = canvas.height ;

    const ball = new Ball(ctx, width, height);

    const keyActions = {
      " ": "stop",           // пробел
      "ArrowLeft":  "left",  // влево
      "Left"     :  "left",  // IE/Edge specific value
      "ArrowUp":    "up",    // вверх
      "Up":         "up",    // IE/Edge specific value
      "ArrowRight": "right", // вправо
      "Right":      "right", // IE/Edge specific value
      "ArrowDown":  "down",  // вниз
      "Down":       "down",  // IE/Edge specific value
    };

    function divertDirection(event) {
      const direction = keyActions[event.key];
      ball.setDirection(direction);
    }

    //Обработчик события keydown, будет вызван при каждом нажатии клавиши
    window.addEventListener("keydown", divertDirection, false);

    function animate( ) {
      ctx.clearRect(0, 0, 400, 400);
      ball.draw();
      ball.move();
	  requestAnimationFrame(animate);
	}
	
	animate();
}