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
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  const scene = new THREE.Scene();

  const groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4);
  const groundMesh = new THREE.Mesh(groundGeom, new THREE.MeshBasicMaterial({
    color: 0x555555
  }));
  groundMesh.rotation.x = -Math.PI / 2;
  groundMesh.position.y = -20;
  scene.add(groundMesh);

  const planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4);


  const meshMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff
  });
  const plane = new THREE.Mesh(planeGeometry, meshMaterial);

  const selectedMesh = plane;

  // position the plane
  plane.position.x = 0;
  plane.position.y = 3;
  plane.position.z = 2;

  // add the sphere to the scene
  scene.add(plane);

  // add subtle ambient lighting
  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  const spotLight = new THREE.SpotLight(0xffffff, 5000);
  spotLight.position.set(-30, 60, 60);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // call the render function
  let step = 0;

  const controls = new function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;

    this.emissive = meshMaterial.emissive.getHex();

    this.color = meshMaterial.color.getStyle();

    this.selectedMesh = "plane";
  };

  const gui = new dat.GUI();
  gui.add(meshMaterial, 'side', {FrontSide: 0, BackSide: 1, BothSides: 2}).onChange(function (side) {
    meshMaterial.needsUpdate = true;
    meshMaterial.side = parseInt(side);
});

  // add the output of the renderer to the html element
  document.body.appendChild(renderer.domElement);

  render()

  function render() {
    selectedMesh.rotation.y = step += 0.01;

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
window.onload = main;