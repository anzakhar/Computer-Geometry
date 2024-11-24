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

  // add spotlight for the shadows
  const spotLight = new THREE.SpotLight(0xffffff, 4000);
  spotLight.position.set(-30, 60, 60);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // call the render function
  let step = 0;
  const material = new THREE.MeshPhongMaterial({color: 0x7777ff})
  const controls = new function () {
    this.color = material.color.getStyle();
    this.emissive = material.emissive.getStyle();
    this.specular = material.specular.getStyle();
  };

  const gui = new dat.GUI();

  const sphereGeometry = new THREE.SphereGeometry(14, 20, 20);

  const sphere = new THREE.Mesh(sphereGeometry, material);

  sphere.position.x = 0;
  sphere.position.y = 3;
  sphere.position.z = 2;

  controls.selectedMesh = "sphere";

  scene.add(sphere);
  controls.selected = sphere;

  controls.selected = sphere;
  scene.add(controls.selected);
  gui.addColor(controls, 'color').onChange(function (e) {
    material.color.setStyle(e)
  });
  gui.addColor(controls, 'emissive').onChange(function (e) {
    material.emissive = new THREE.Color(e);
  });
  gui.addColor(controls, 'specular').onChange(function (e) {
    material.specular = new THREE.Color(e);
  });
  gui.add(material, 'shininess', 0, 100, )

  camera.lookAt(controls.selected.position);

  // add the output of the renderer to the html element
  document.body.appendChild(renderer.domElement);

  render();

  function render() {
    if (controls.selected) controls.selected.rotation.y = step += 0.01;

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
window.onload = main;