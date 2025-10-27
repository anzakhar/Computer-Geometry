// 05.js

// Imports.
import {getShader} from './libs/prepShader.js';
import * as  dat from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/build/dat.gui.module.js';
import { vec3, mat4 } from 'https://wgpu-matrix.org/dist/2.x/wgpu-matrix.module.js';

async function main() {
  // Read shaders.
  const shaderCode = await getShader("shaders.wgsl");

  if (!navigator.gpu)
    throw new Error("WebGPU not supported");

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) 
    throw new Error("No GPUAdapter found");

  // Access the GPU
  const device = await adapter.requestDevice();
  if (!device)
    throw new Error("Failed to create a GPUDevice");

  // Retrieve <canvas> element
  const canvas = document.getElementById('mycanvas');
  if (!canvas)
    throw new Error("Could not access canvas in page");

  // Obtain a WebGPU context for the canvas
  const context = canvas.getContext("webgpu");
  if (!context)
    throw new Error("Could not obtain WebGPU context for canvas");

  // Get the best pixel format
  const canvasFormat = navigator.gpu.getPreferredCanvasFormat();

  // Configure the context with the device and format
  context.configure({
    device: device,
    format: canvasFormat,
    alphaMode: "opaque"
  });

  const controls = {
    view: 'axonometry',
    perspective_method: 'perspective',
    zoom_effect: 'in',
    perspective_effect: 'more',
    render: 'wireframe',
    instances: 1
  };

  // Define vertex data (coordinates and colors)
  

  // Create vertex buffer
  // const vertexBuffer = device.createBuffer({
  //     label: "Example vertex buffer",
  //     size: vertexData.byteLength,
  //     usage: 
  //         GPUBufferUsage.VERTEX | 
  //         GPUBufferUsage.COPY_DST
  // });

  // Write data to buffer
  //device.queue.writeBuffer(vertexBuffer, 0, vertexData);

  // Define layout of buffer data
  const bufferLayout = {
      arrayStride: 24,
      attributes: [
          { format: "float32x3", offset: 0,  shaderLocation: 0 }, 
          { format: "float32x3", offset: 12, shaderLocation: 1 }
      ],
  };

  //// const depthTexture = device.createTexture({
  ////   size: [width, height, 1],
  ////   usage:  GPUTextureUsage.RENDER_ATTACHMENT |
  ////           GPUTextureUsage.TEXTURE_BINDING,
  ////   format: "depth32float"
  //// });

  //// const depthView = depthTexture.createView();

  // Create the shader module
  const shaderModule = device.createShaderModule({
      label: "Example shader module",
      code: shaderCode
  });

  let uniformData = mat4.identity();

    // Create uniform buffer
  const uniformBuffer = device.createBuffer({
      label: "Uniform Buffer 0",
      size: uniformData.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });
  
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
  gui.add(controls, 'instances', 1, 10, 1);

  let eye = vec3.create();

  function render() {

    switch (controls.view) {
        case 'left':
            // vec3.set(x, y, z, eye);
        break;
        case 'right':
            // vec3.set(x, y, z, eye);
        break;
        case 'top':
            // vec3.set(x, y, z, eye);
        break;
        case 'bottom':
            // vec3.set(x, y, z, eye);
        break;
        case 'front':
            // vec3.set(x, y, z, eye);
        break;
        case 'back':
            // vec3.set(x, y, z, eye);
        break;
        case 'isometry':
            // vec3.set(x, y, z, eye);
        break;
        case 'axonometry':
            // vec3.set(x, y, z, eye);
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
                  // vec3.set(x, y, z, eye);
                  // perspective
                  break;
                case 'less':
                  // vec3.set(x, y, z, eye);
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
            // vec3.set(x, y, z, eye)
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
            // vec3.set(x, y, z, eye)
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
    // mat4.lookAt(eye, center,	up, viewMatrix);

    // Update the uniform buffer
    //uniformData = vpMatrix; 
    device.queue.writeBuffer(uniformBuffer, 0, uniformData);

    let primitive;

    switch (controls.render) {
    case 'wireframe':
        primitive = {
          topology: 'line-list',
        };

      break;
    case 'polygons':
        primitive = {
          topology: 'triangle-list',
        };
      break;
    }

    // Define the rendering procedure
    const renderPipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: shaderModule,
            entryPoint: "vertexMain",
            buffers: [bufferLayout]
        },
        fragment: {
            module: shaderModule,
            entryPoint: "fragmentMain",
            targets: [{
                format: canvasFormat
            }]
        },
        //// depthStencil: {
        ////   format: "depth32float",
        ////   depthCompare: "less",
        ////   depthWriteEnabled: true,
        //// },
        primitive, 
    });

    // Access the bind group layout
    const bindGroupLayout = renderPipeline.getBindGroupLayout(0);

    // Create the bind group
    let bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [{
            binding: 0,
            resource: { buffer: uniformBuffer }
        }]
    });

    // Create the command encoder and the render pass encoder
    const encoder = device.createCommandEncoder();
    if (!encoder)
      throw new Error("Failed to create a GPUCommandEncoder");

    // Create the render pass encoder
    const renderPass = encoder.beginRenderPass({
        colorAttachments: [{
            view: context.getCurrentTexture().createView(),
            loadOp: "clear",
            clearValue: { r: 0.9, g: 0.9, b: 0.9, a: 1.0 },
            storeOp: "store"
        }],
        //// depthStencilAttachment: {
        ////     view: depthView,
        ////     depthClearValue: 1.0,
        ////     depthLoadOp: "clear",
        ////     depthStoreOp: "store"
        ////   }
    });

    // Set the vertex buffer and pipeline
    // renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.setPipeline(renderPipeline);

    // Associate bind group with render pass encoder
    renderPass.setBindGroup(0, bindGroup);

    // Draw vertices
    switch (controls.render) {
    case 'wireframe':
      //renderPass.draw(24);
      break;
    case 'polygons':
      //renderPass.draw(36);
      break;
    }
    renderPass.end();

    // Submit the render commands to the GPU
    device.queue.submit([encoder.finish()]);

    // render using requestAnimationFrame
    requestAnimationFrame(render);
  }

  // call the render function
  render();

}

window.onload = main;