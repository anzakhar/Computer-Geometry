// 02.js

// // Imports.
// import {getShader} from './libs/prepShader.js';

async function main() {

  // // Read shaders.
  // const shaderCode = await getShader("shaders.wgsl");

  if (!navigator.gpu)
    throw new Error("WebGPU not supported");

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) 
    throw new Error("No GPUAdapter found");

  // Access the GPU
  const device = await adapter.requestDevice();
  if (!device)
    throw new Error("Failed to create a GPUDevice");

  const encoder = device.createCommandEncoder();
  if (!encoder)
    throw new Error("Failed to create a GPUCommandEncoder");

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
  });

  // Create the render pass encoder
  const renderPass = encoder.beginRenderPass({
    colorAttachments: [{
        view: context.getCurrentTexture().createView(),
        loadOp: "clear",
        clearValue: { r: 0.2, g: 0.2, b: 1.0, a: 1.0 },
        storeOp: "store"
    }]
  });

  // // Define vertex data (coordinates)
  // const vertexData = new Float32Array([
  //   0.0, 0.5,    // First vertex
  //   -0.5, -0.5,  // Second vertex
  //   0.5, -0.5    // Third vertex
  // ]);

  // // Create vertex buffer
  // const vertexBuffer = device.createBuffer({
  //     label: "Example vertex buffer",
  //     size: vertexData.byteLength,
  //     usage: 
  //         GPUBufferUsage.VERTEX | 
  //         GPUBufferUsage.COPY_DST
  // });

  // // Write data to buffer
  // device.queue.writeBuffer(vertexBuffer, 0, vertexData);

  // // Define layout of buffer data
  // const bufferLayout = {
  //     arrayStride: 8,
  //     attributes: [
  //         { format: "float32x2", offset: 0, shaderLocation: 0 } 
  //     ],
  // };

  // // Create the shader module
  // const shaderModule = device.createShaderModule({
  //     label: "Example shader module",
  //     code: shaderCode
  // });

  // // Define the rendering procedure
  // const renderPipeline = device.createRenderPipeline({
  //     layout: "auto",
  //     vertex: {
  //         module: shaderModule,
  //         entryPoint: "vertexMain",
  //         buffers: [bufferLayout]
  //     },
  //     fragment: {
  //         module: shaderModule,
  //         entryPoint: "fragmentMain",
  //         targets: [{
  //             format: canvasFormat
  //         }]
  //     },
  //     primitive: {
  //       topology: "triangle-list"
  //     }    
  // });

  // renderPass.setVertexBuffer(0, vertexBuffer);
  // renderPass.setPipeline(renderPipeline);

  // // Draw vertices and complete rendering
  // renderPass.draw(3);

  // Complete the render pass encoding
  renderPass.end();

  // Submit the render commands to the GPU
  device.queue.submit([encoder.finish()]);
}

window.onload = main;