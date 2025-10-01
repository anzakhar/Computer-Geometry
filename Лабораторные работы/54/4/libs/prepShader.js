export async function getShader(shaderFile) 
{
  // Read the source shader file.
  const shaderResponse = await fetch(shaderFile);
  const shaderSource = await shaderResponse.text();
  
  const shader = shaderSource.trim();

  return shader;
};