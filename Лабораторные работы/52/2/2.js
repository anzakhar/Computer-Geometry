// 02.js

"use strict";

//// function circle(ctx, x, у, radius, fillCircle) {
////  ctx.beginPath();
////  ctx.arc (x, у, radius, 0, Math.PI * 2, false);
////  if (fillCircle)
////    ctx.fill();
////  else
////    ctx.stroke();
//// };

//// function drawBee(ctx, x, у) {
////   ctx.lineWidth = 2;
////   ctx.strokeStyle = "Black";
////   ctx.fillStyle = "Gold";
////   circle (ctx, x, у, 8, true);
////   circle (ctx, x, у, 8, false);
////   circle (ctx, x - 5, у - 11, 5, false);
////   circle (ctx, x + 5, у - 11, 5, false);
////   circle (ctx, x - 2, у - 1, 2, false);
////   circle (ctx, x + 2, у - 1, 2, false);
//// };

//// function update( coordinate ) {
////   const offset = Math.random( ) * 4 - 2;
////   coordinate += offset;

////    if (coordinate > 400)
////      coordinate = 400;
////    if (coordinate < 0) 
////      coordinate = 0;

////    return coordinate;
////  };

////// class Ball {
//////   constructor(ctx) {
//////     this.x = 200;
//////     this.y = 200;
//////     this.xSpeed = -2;
//////     this.ySpeed = 3;
//////     this.ctx = ctx;
//////   }
//////   draw() {
//////     circle(this.ctx, this.x, this.y, 6, true);
//////   }
//////   move() {
//////     this.x += this.xSpeed;
//////     this.y += this.ySpeed;
//////   }
//////   checkCollision() {
//////     if (this.x < 0 || this.x > 400) {
//////       this.xSpeed = -this.xSpeed;
//////     } 
//////     if (this.y < 0 || this.y > 400)
//////       this.ySpeed = -this.ySpeed;
//////     } 
////// }

function main() {
  // Retrieve <canvas> element
    const canvas = document.getElementById('mycanvas');
    const ctx = canvas.getContext("2d") ;

    let position = 0;
    // let size = 0;
    //// let x = 200;
    //// let y = 200;
    //////const ball = new Ball(ctx);

    function animate() {
      ctx.clearRect(0, 0, 400, 400);
      ctx.fillRect(position, 0, 20, 20);
      // ctx.fillRect(0, 0, size, size) ;

      position++;
      if (position > 400)
         position = 0;

      // size++;
      // if ( size > 400)
      //   size=0;

      //// drawBee(ctx, x, y) ;
      //// x = update(x);
      //// y = update(y);

      ////// ball.draw();
      ////// ball.move();
      ////// ball.checkCollision();

      requestAnimationFrame(animate);
  }

  animate();
}