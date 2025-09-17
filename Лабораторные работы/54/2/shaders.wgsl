@vertex
fn vertexMain(@location(0) coords: vec2f) -> @builtin(position) vec4f {
    return vec4f(coords, 0.0, 1.0);
}

@fragment
fn fragmentMain() -> @location(0) vec4f {
    return vec4f(1.0, 0.647, 0.0, 1.0);
}