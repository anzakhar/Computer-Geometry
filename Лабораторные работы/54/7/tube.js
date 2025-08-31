// Imports.
import * as THREE from './libs/three.module.js'
import * as dat from './libs/dat.gui.module.js';
import { initOrbitControls } from '../libs/orbit-controller.js'
import { ConvexGeometry } from './libs/ConvexGeometry.js';
import { ParametricGeometries } from './libs/ParametricGeometries.js';
import { ParametricGeometry } from './libs/ParametricGeometry.js';
import * as SceneUtils from './libs/SceneUtils.js';
import * as Util from './libs/util.js';
function init() {

  // use the defaults
  const renderer = Util.initRenderer();
  const camera = Util.initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  const scene = new THREE.Scene();
  Util.initDefaultLighting(scene);
  const groundPlane = Util.addLargeGroundPlane(scene);
  groundPlane.position.y = -30;

  let step = 0;
  let spGroup;

  // setup the control gui
  const controls = new function () {

    // the start geometry and material. Used as the base for the settings in the control UI
    this.appliedMaterial = Util.applyMeshNormalMaterial
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.numberOfPoints = 5;
    this.segments = 64;
    this.radius = 1;
    this.radiusSegments = 8;
    this.closed = false;
    this.points = [];
    // we need the first child, since it's a multimaterial

    this.newPoints = function () {
      const points = [];
      for (let i = 0; i < controls.numberOfPoints; i++) {
        const randomX = -20 + Math.round(Math.random() * 50);
        const randomY = -15 + Math.round(Math.random() * 40);
        const randomZ = -20 + Math.round(Math.random() * 40);

        points.push(new THREE.Vector3(randomX, randomY, randomZ));
      }
      controls.points = points;
      controls.redraw();
    };

    this.redraw = function () {
      Util.redrawGeometryAndUpdateUI(gui, scene, controls, function() {
        return generatePoints(controls.points, controls.segments, controls.radius, controls.radiusSegments,
          controls.closed);
      });
    };

  };

  const gui = new dat.GUI();
  gui.add(controls, 'newPoints');
  gui.add(controls, 'numberOfPoints', 2, 15).step(1).onChange(controls.newPoints);
  gui.add(controls, 'segments', 0, 200).step(1).onChange(controls.redraw);
  gui.add(controls, 'radius', 0, 10).onChange(controls.redraw);
  gui.add(controls, 'radiusSegments', 0, 100).step(1).onChange(controls.redraw);
  gui.add(controls, 'closed').onChange(controls.redraw);
  // add a material section, so we can switch between materials
  gui.add(controls, 'appliedMaterial', {
    meshNormal: Util.applyMeshNormalMaterial, 
    meshStandard: Util.applyMeshStandardMaterial
  }).onChange(controls.redraw)

  gui.add(controls, 'castShadow').onChange(function(e) {controls.mesh.castShadow = e})
  gui.add(controls, 'groundPlaneVisible').onChange(function(e) {groundPlane.material.visible = e})


  controls.newPoints();


  render();

  function generatePoints(points, segments, radius, radiusSegments, closed) {
    // add n random spheres

    if (spGroup) scene.remove(spGroup)
    spGroup = new THREE.Object3D();
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: false
    });
    points.forEach(function (point) {

      const spGeom = new THREE.SphereGeometry(0.2);
      const spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.copy(point);
      spGroup.add(spMesh);
    });
    // add the points as a group to the scene
    scene.add(spGroup);
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, radiusSegments, closed);
  }

  function render() {
    controls.mesh.rotation.y = step+=0.005
    controls.mesh.rotation.x = step
    controls.mesh.rotation.z = step

    if (spGroup) {
      spGroup.rotation.y = step
      spGroup.rotation.x = step
      spGroup.rotation.z = step
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
window.onload = init;