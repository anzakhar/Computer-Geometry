/* Input to vertex shader */
struct InputData {
    vMatrix: mat4x4f,
    vpMatrix: mat4x4f,
    centerPos: vec4f,
    viewerPos: vec4f,
    lightPos: vec4f,    
    ambient: vec3f,
    diffuse: vec3f,
    specular: vec3f,
    shininess: f32
}

/* Access the uniform buffer */
@group(0) @binding(0) var<uniform> input: InputData;

/* Output to fragment shader */
struct OutputData {
    @builtin(position) pos: vec4f,
    @location(0) normalVec: vec4f,    
    @location(1) viewerVec: vec4f,
    @location(2) lightVec: vec4f,    
    @location(3) ambient: vec3f,
    @location(4) diffuse: vec3f,
    @location(5) specular: vec3f,
    @location(6) shininess: f32
}

@vertex
fn vertexMain(@location(0) coords: vec3f) -> OutputData {
    
    var outData: OutputData;
    var pos: vec4f;
    
    /* Transform coordinates */
    outData.pos = input.vpMatrix * vec4f(coords, 1.0);
    pos = input.vMatrix * vec4f(coords, 1.0);
        
    /* Compute normal vector */
    outData.normalVec = normalize(pos - input.centerPos);

    /* Compute direction to viewer */
    outData.viewerVec = normalize(input.viewerPos - pos);
    
    /* Compute direction to light source */
    outData.lightVec = normalize(input.lightPos - pos);

    /* Set data for fragment shader */
    outData.ambient = input.ambient;
    outData.diffuse = input.diffuse;
    outData.specular = input.specular;
    outData.shininess = input.shininess;

    return outData;
}

@fragment
fn fragmentMain(fragData: OutputData) -> @location(0) vec4f {
    
    /* Set minimum and maximum vectors used in clamp */    
    let low_clamp = vec3f(0.0, 0.0, 0.0);
    let high_clamp = vec3f(1.0, 1.0, 1.0);    
    
    /* Step 1: Compute N . L */
    let n_dot_l = dot(fragData.normalVec.xyz, fragData.lightVec.xyz);
    
    /* Step 2: Compute H, the vector between L and V */
    let half_vector = normalize(fragData.lightVec.xyz + fragData.viewerVec.xyz);
    
    /* Step 3: Compute (N . H)^n' */
    var blinn = dot(fragData.normalVec.xyz, half_vector);
    blinn = clamp(blinn, 0.0, 1.0);
    blinn = pow(blinn, fragData.shininess);    
    
    /* Step 4: Compute sum of light components */
    var light_color = fragData.ambient + fragData.diffuse * n_dot_l + fragData.specular * blinn;
    light_color = clamp(light_color, low_clamp, high_clamp);
  
    /* Step 5: Blend light color and original color */
    let orig_color = vec3f(0.5, 0.6, 0.7);
    let color_sum = clamp((light_color + orig_color)/2.0, low_clamp, high_clamp);
    
    return vec4f(color_sum, 1.0);
}