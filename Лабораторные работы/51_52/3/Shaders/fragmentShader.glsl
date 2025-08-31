#version 300 es
precision mediump float;

// uniform vec4 u_FragColor;
out vec4 colorsOut;

void main() {
  colorsOut = vec4(1.0, 0.0, 0.0, 1.0); // Set the point color
  // colorsOut = u_FragColor;
}