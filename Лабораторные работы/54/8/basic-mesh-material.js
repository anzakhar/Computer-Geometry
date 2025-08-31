// Imports.
import * as THREE from './libs/three.module.js'
import * as dat from './libs/dat.gui.module.js';
function main() {

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  const scene = new THREE.Scene();
  // create a render and set the size
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  const groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4);
  const groundMesh = new THREE.Mesh(groundGeom, new THREE.MeshBasicMaterial({
    color: 0x777777
  }));
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = -20;
  scene.add(groundMesh);

  const cubeGeometry = new THREE.BoxGeometry(15, 15, 15);

  const meshMaterial = new THREE.MeshBasicMaterial({
    color: 0x7777ff,
    name: 'Basic Material'
  });
  meshMaterial.side = THREE.DoubleSide;

  const cube = new THREE.Mesh(cubeGeometry, meshMaterial);

  // position the sphere
  cube.position.x = 0;
  cube.position.y = 3;
  cube.position.z = 2;


  // add the sphere to the scene
  scene.add(cube);

  // position and point the camera to the center of the scene
  camera.position.x = -20;
  camera.position.y = 50;
  camera.position.z = 40;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  // add subtle ambient lighting
  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  const spotLight = new THREE.SpotLight(0xffffff, 5000);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // add the output of the renderer to the html element
  document.body.appendChild(renderer.domElement);


  // call the render function
  let step = 0;

  const controls = new function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;

    this.color = meshMaterial.color.getStyle();
    this.material = meshMaterial;
  };

  const gui = new dat.GUI();
  
  const folder = gui.addFolder("THREE.Material");
  folder.add(controls.material, 'opacity', 0, 1, 0.01);
  folder.add(controls.material, 'transparent');
  folder.add(controls.material, 'visible');

  const spGui = gui.addFolder("THREE.MeshBasicMaterial");
  spGui.addColor(controls, 'color').onChange(function (e) {
    meshMaterial.color.setStyle(e)
  });
  spGui.add(meshMaterial, 'wireframe');

  render();

  function render() {
    cube.rotation.y = step += 0.01;

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
window.onload = main;