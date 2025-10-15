struct Uniforms {
    transform_matrix: mat4x4f,
    color: vec4f,
}

struct DataStruct {
    @builtin(position) pos: vec4f,
    @location(0) colors: vec3f,
}


@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@vertex
fn vertexMain(@location(0) coords: vec2f, @location(1) colors: vec3f) -> DataStruct {
    var outData: DataStruct;
    outData.pos = uniforms.transform_matrix * vec4f(coords, 0.0, 1.0);
    outData.colors = colors;
    return outData;
}

@fragment
fn fragmentMain(fragData: DataStruct) -> @location(0) vec4f {
    return vec4f(fragData.colors, 1.0);
    // return uniforms.color;
}