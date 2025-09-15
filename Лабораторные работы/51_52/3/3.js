// 03.js

"use strict";

// Imports.
import {getShader} from './libs/prepShader.js';
import {initShaders} from './libs/cuon-utils.js';

async function main() {
  // Retrieve <canvas> element
  const canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  const gl = canvas.getContext('webgl2');
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Read shaders and create shader program executable.
  const vertexShader = await getShader(gl, "vertex", "Shaders/vertexShader.glsl");
  const fragmentShader = await getShader(gl, "fragment", "Shaders/fragmentShader.glsl");

   // Initialize shaders
  if (!initShaders(gl, vertexShader, fragmentShader)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  //// Get the storage location of u_FragColor
  //const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  //if (!u_FragColor) {
  //    console.log('Failed to get the storage location of u_FragColor');
  //    return;
  //}

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = function (ev) { click(ev, gl, canvas, /*, u_FragColor*/); };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

const g_points = []; // The array for the position of a mouse press
function click(ev, gl, canvas/*, u_FragColor*/) {
  let x = ev.clientX; // x coordinate of a mouse pointer
  let y = ev.clientY; // y coordinate of a mouse pointer
  const rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  // Store the coordinates to g_points array
  g_points.push(x); g_points.push(y);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  const len = g_points.length;
  for (let i = 0; i < len; i += 2) {
    // Pass the position of a point to a_Position variable
      gl.vertexAttrib3f(1, g_points[i], g_points[i + 1], 0.0);
	  
	  // gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);

    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
window.onload = main;