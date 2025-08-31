// Imports.
import * as THREE from './libs/three.module.js'
import * as dat from './libs/dat.gui.module.js';
function main() {

  // use the defaults
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  // position and point the camera to the center of the scene
  camera.position.x = -20;
  camera.position.y = 30;
  camera.position.z = 40;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  const scene = new THREE.Scene();

  const groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4);
  const groundMesh = new THREE.Mesh(groundGeom, new THREE.MeshBasicMaterial({
    color: 0x555555
  }));
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = -20;
  scene.add(groundMesh);

  var sphereGeometry = new THREE.SphereGeometry(14, 20, 20);

  var meshMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff
  });
  meshMaterial.side = THREE.DoubleSide;
  var sphere = new THREE.Mesh(sphereGeometry, meshMaterial);

  // position the sphere
  sphere.position.x = 0;
  sphere.position.y = 3;
  sphere.position.z = 2;

  // add the sphere to the scene
  scene.add(sphere);

  // add subtle ambient lighting
  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  const spotLight = new THREE.SpotLight(0xffffff, 4000);
  spotLight.position.set(-30, 60, 60);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // call the render function
  let step = 0;

  const controls = new function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;

    this.material = meshMaterial;
    this.emissive = meshMaterial.emissive.getHex();

    this.color = meshMaterial.color.getStyle();
  };

  const gui = new dat.GUI();
  const folder = gui.addFolder("THREE.Material");
  folder.add(controls.material, 'opacity', 0, 1, 0.01);
  folder.add(controls.material, 'transparent');
  folder.add(controls.material, 'visible');
  const spGui = gui.addFolder("THREE.MeshLambertMaterial");
  spGui.addColor(controls, 'color').onChange(function (e) {
    meshMaterial.color.setStyle(e)
  });
  spGui.addColor(controls, 'emissive').onChange(function (e) {
    meshMaterial.emissive = new THREE.Color(e);
  });
  spGui.add(meshMaterial, 'wireframe');

  // add the output of the renderer to the html element
  document.body.appendChild(renderer.domElement);


  render();

  function render() {
    sphere.rotation.y = step += 0.01;

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
window.onload = main;