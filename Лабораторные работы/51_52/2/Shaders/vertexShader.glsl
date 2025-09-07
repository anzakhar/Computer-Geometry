#version 300 es

// layout(location=1) in vec4 a_Position; // attribute variable
void main() {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0); // Set the vertex coordinates of the point
  // gl_Position = a_Position;
  gl_PointSize = 10.0;                  // Set the point size
}