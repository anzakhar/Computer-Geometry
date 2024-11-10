// 07.js

// Imports.
import {getShader} from './libs/prepShader.js';
import {initShaders} from './libs/cuon-utils.js';
import * as  dat from './libs/dat.gui.module.js';
import {vec3, mat4} from './libs/dist/esm/index.js';

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

  const controls = {
    view: 'axonometry',
    perspective_method: 'perspective',
    zoom_effect: 'in',
    perspective_effect: 'more',
    render: 'wireframe'
  };

  // Write the positions of vertices to a vertex shader
  const n = initVertexBuffers(gl, controls.render);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0, 0, 1);

  const gui = new dat.GUI();

  const projection = {
      type: "Orthographic",
      switchCamera: function () {
          if (this.type == "Perspective") {
              this.type = "Orthographic";
              gui.remove(view);
              if (perspective_method != undefined)
                gui.remove(perspective_method);
              if (perspective_effect != undefined)
                gui.remove(perspective_effect);
              gui.remove(model_render);
              controls.view = 'axonometry';
              view = gui.add(controls, 'view', ['left', 'right', 'top', 'bottom', 'front', 'back', 'isometry', 'axonometry']);
              zoom_effect = gui.add(controls, 'zoom_effect', ['in', 'out']);
              model_render = gui.add(controls, 'render', ['wireframe', 'polygons']);
          } else {
              this.type = "Perspective";
              gui.remove(view);
              gui.remove(zoom_effect);
              gui.remove(model_render);
              controls.view = '3-point';
              view = gui.add(controls, 'view', ['1-point', '2-point', '3-point']);
              perspective_method = gui.add(controls, 'perspective_method', ['perspective', 'frustum']);
              perspective_effect = gui.add(controls, 'perspective_effect', ['more', 'less']);
              model_render = gui.add(controls, 'render', ['wireframe', 'polygons']);
          }
      }
  };

  gui.add(projection, 'switchCamera');
  gui.add(projection, 'type').listen();
  let view = gui.add(controls, 'view', ['left', 'right', 'top', 'bottom', 'front', 'back', 'isometry', 'axonometry']);
  let zoom_effect = gui.add(controls, 'zoom_effect', ['in', 'out']);
  let model_render = gui.add(controls, 'render', ['wireframe', 'polygons']);
  let perspective_method;
  let perspective_effect;

  let eye = vec3.create();

  function render() {

    switch (controls.view) {
        case 'left':
            // vec3.set(eye, x, y, z)
        break;
        case 'right':
            // vec3.set(eye, x, y, z)
        break;
        case 'top':
            // vec3.set(eye, x, y, z)
        break;
        case 'bottom':
            // vec3.set(eye, x, y, z)
        break;
        case 'front':
            // vec3.set(eye, x, y, z)
        break;
        case 'back':
            // vec3.set(eye, x, y, z)
        break;
        case 'isometry':
            // vec3.set(eye, x, y, z)
        break;
        case 'axonometry':
            // vec3.set(eye, x, y, z)
            switch (controls.zoom_effect) {
              case 'in':
                // ortho
                break;
              case 'out':
                // ortho
                break;
            }
        break;
        case '1-point':
            switch (controls.perspective_method) {
              case 'perspective':
                switch (controls.perspective_effect) {
                case 'more':
                  // vec3.set(eye, x, y, z)
                  // perspective
                  break;
                case 'less':
                  // vec3.set(eye, x, y, z)
                  // perspective
                  break;
                }
                break;
              case 'frustum':
                
                switch (controls.perspective_effect) {
                  case 'more':
                    // frustum
                    break;
                  case 'less':
                    // frustum
                    break;
                  }
                break;
            }
        break;
        case '2-point':
            // vec3.set(eye, x, y, z)
            switch (controls.perspective_method) {
              case 'perspective':
                // perspective
                break;
              case 'frustum':
                // frustum
                break;
            }
        break;
        case '3-point':
            // vec3.set(eye, x, y, z)
            switch (controls.perspective_method) {
              case 'perspective':
                // perspective
                break;
              case 'frustum':
                // frustum
                break;
            }
        break;
    }

    // point the camera to the center of the scene
    // mat4.lookAt(viewMatrix, eye, center,	up);

        // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw three points
    switch (controls.render) {
    case 'wireframe':
      gl.drawArrays(gl.POINTS, 0, n);
      break;
    case 'polygons':
        gl.drawArrays(gl.POINTS, 0, n);
        break;
    }

    // render using requestAnimationFrame
    requestAnimationFrame(render);
  }

  // call the render function
  render();

}

function initVertexBuffers(gl, model_render) {
    const n = 3; // The number of vertices

    const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);

    //const vertices = new Float32Array(2 * n);

    //vertices[0] = 0.0;
    //vertices[1] = 0.5;
    //vertices[2] = -0.5;
    //vertices[3] = -0.5;
    //vertices[4] = 0.5;
    //vertices[5] = -0.5;

  // Create a buffer object
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  return n;
}

window.onload = main;