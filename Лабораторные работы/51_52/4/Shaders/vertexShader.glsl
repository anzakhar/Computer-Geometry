#version 300 es

in vec4 a_Position; // attribute variable
void main() {
  gl_Position = a_Position;
  gl_PointSize = 10.0;                  // Set the point size
}