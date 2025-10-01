// 3.js

// Imports.
import {getShader} from './libs/prepShader.js';
// import { mat4 } from 'https://wgpu-matrix.org/dist/2.x/wgpu-matrix.module.js'; 

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

  // Define vertex data
  const vertexData = new Float32Array([
      -0.5, -0.5,  // First vertex
      0.5, -0.5,    // Second vertex
      -0.5, 0.5,  // Third vertex
      0.5, 0.5,    // Fourth vertex
  ]);

  // Create vertex buffer
  const vertexBuffer = device.createBuffer({
      label: "Vertex Buffer 0",
      size: vertexData.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
  });

  // Write data to buffer
  device.queue.writeBuffer(vertexBuffer, 0, vertexData);

  // Define layout of vertex buffer
  const bufferLayout = {
      arrayStride: 8,
      attributes: [
        { format: "float32x2", offset: 0, shaderLocation: 0 }
      ],
  };

  // Define uniform data
  let uniformData = new Float32Array([
    0.866, 0.5, 0.0, 0.0,    // First column of matrix
    -0.5, 0.866, 0.0, 0.0,   // Second column of matrix
    0.0, 0.0, 1.0, 0.0,      // Third column of matrix
    0.0, 0.0, 0.0, 1.0,      // Fourth column of matrix
  ]);

  // Create uniform buffer
  const uniformBuffer = device.createBuffer({
      label: "Uniform Buffer 0",
      size: uniformData.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });
  device.queue.writeBuffer(uniformBuffer, 0, uniformData); 

  // Create the shader module
  const shaderModule = device.createShaderModule({
      label: "Example shader module",
      code: shaderCode
  });

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
      primitive: {
        topology: "triangle-strip"
      }    
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
    }]
  });

  renderPass.setVertexBuffer(0, vertexBuffer);

  // Associate bind group with render pass encoder
  renderPass.setBindGroup(0, bindGroup);

  renderPass.setPipeline(renderPipeline);

  // Draw vertices and complete rendering
  renderPass.draw(4);


  // uniformData = mat4.identity();

  // // Create uniform buffer
  // const uniformBuffer2 = device.createBuffer({
  //     label: "Uniform Buffer 0",
  //     size: uniformData.byteLength,
  //     usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  // });
  
  // device.queue.writeBuffer(uniformBuffer2, 0, uniformData);

  // bindGroup = device.createBindGroup({
  //     layout: bindGroupLayout,
  //     entries: [{
  //         binding: 0,
  //         resource: { buffer: uniformBuffer2 }
  //     }]
  // });

  // // Associate bind group with render pass encoder
  // renderPass.setBindGroup(0, bindGroup);
  
  // renderPass.draw(4);


  // Complete the render pass encoding
  renderPass.end();

  // Submit the render commands to the GPU
  device.queue.submit([encoder.finish()]);


  // let motionPerSec = (2.0 * 0.625)/2.0;
  // let motionChange = 0.0;
  // let totalTime = 0.0;
  // let oldTime = 0.0;
  // let t = 0.0;

  // // Called just before the window is repainted
  // function newFrame(currentTime) {

  //     // Skip first frame
  //     if(oldTime == 0.0) {
  //         oldTime = currentTime;
  //         window.requestAnimationFrame(newFrame);
  //         return;
  //     }

  //     // Compute elapsed time in seconds
  //     t = (currentTime - oldTime)/1000;
  //     oldTime = currentTime;
      
  //     // Update total time
  //     totalTime += t;

  //     // Stop animation after four seconds
  //     if (totalTime > 4.0) {
  //         return;
  //     }

  //     // Update the uniform buffer
  //     motionChange = totalTime < 2.0 ? t * motionPerSec : -t * motionPerSec;
  //     uniformData = mat4.translate(uniformData, [motionChange, 0.0, 0.0]); 
  //     device.queue.writeBuffer(uniformBuffer, 0, uniformData); 

  //     // Create the command encoder and the render pass encoder
  //     const encoder = device.createCommandEncoder();
  //     const renderPass = encoder.beginRenderPass({
  //         colorAttachments: [{
  //             view: context.getCurrentTexture().createView(),
  //             loadOp: "clear",
  //             clearValue: { r: 0.9, g: 0.9, b: 0.9, a: 1.0 },
  //             storeOp: "store"
  //         }]
  //     });

  //     // Set the vertex buffer and pipeline
  //     renderPass.setVertexBuffer(0, vertexBuffer);
  //     renderPass.setPipeline(renderPipeline);

  //     // Associate bind group with render pass encoder
  //     renderPass.setBindGroup(0, bindGroup);

  //     // Draw vertices
  //     renderPass.draw(4);
  //     renderPass.end();

  //     // Submit the render commands to the GPU
  //     device.queue.submit([encoder.finish()]);
  //     window.requestAnimationFrame(newFrame);
  // }

  // window.requestAnimationFrame(newFrame);
}

window.onload = main;