// Imports.
import * as THREE from './libs/three.module.js'
import * as dat from './libs/dat.gui.module.js';

// global variables
let renderer;
let scene;
let camera;
let cube;

let control;
let camControl;
let pivotPoint;

function init() {

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();


    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render, sets the background color and the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;

    // create a simple sphere
    const sphere = new THREE.SphereGeometry(6.5, 20, 20);
    const spherMat = new THREE.MeshLambertMaterial({color: 0x5555ff});
    const sphereMesh = new THREE.Mesh(sphere, spherMat);
    sphereMesh.receiveShadow = true;
    sphereMesh.position.set(0, 1, 0);
    scene.add(sphereMesh);

    // add an object as pivot point to the sphere
    pivotPoint = new THREE.Group();
    pivotPoint.rotation.x = 0.4;
    sphereMesh.add(pivotPoint);

    // create a cube and add to scene
    const cubeGeometry = new THREE.BoxGeometry(2, 4, 2);
    const cubeMaterial = new THREE.MeshLambertMaterial();
    cubeMaterial.color = new THREE.Color('red');
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // position is relative to it's parent
    cube.position.set(14, 4, 6);
    cube.castShadow = true;
    // make the pivotpoint the cube's parent.
    pivotPoint.add(cube);

    // add some light
    const light = new THREE.SpotLight(0xFFFFFF, 5000, 150);
    light.position.set(40, 4, 40);
    light.castShadow = true;
    light.shadowMapEnabled = true;
    light.shadowCameraNear = 20;
    light.shadowCameraFar = 100;
    scene.add(light);

    // position and point the camera to the center of the scene
    camera.position.x = 25;
    camera.position.y = 26;
    camera.position.z = 23;
    camera.lookAt(scene.position);

    // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);

    control = new function () {
        this.rotationSpeedX = 0.00001;
        this.rotationSpeedY = 0.00001;
        this.rotationSpeedZ = 0.00001;

        this.rotationX = 0.4;
        this.rotationY = 0;
        this.rotationZ = 0;

        this.cubeRotationSpeedX = 0.00001;
        this.cubeRotationSpeedY = 0.00001;
        this.cubeRotationSpeedZ = 0.00001;

    };

    addControls(control);

    // call the render function
    render();
}

function addControls(controlObject) {
    const gui = new dat.GUI();
    gui.add(controlObject, 'rotationSpeedX', -0.2, 0.2);
    gui.add(controlObject, 'rotationSpeedY', -0.2, 0.2);
    gui.add(controlObject, 'rotationSpeedZ', -0.2, 0.2);
    gui.add(controlObject, 'rotationX', 0, 2*Math.PI).onChange(function (v) {
        pivotPoint.rotation.x = v
    });
    gui.add(controlObject, 'rotationY', 0, 2*Math.PI).onChange(function (v) {
        pivotPoint.rotation.y = v
    });
    gui.add(controlObject, 'rotationZ', 0, 2*Math.PI).onChange(function (v) {
        pivotPoint.rotation.z = v
    });


    gui.add(controlObject, 'cubeRotationSpeedX', -0.2, 0.2);
    gui.add(controlObject, 'cubeRotationSpeedY', -0.2, 0.2);
    gui.add(controlObject, 'cubeRotationSpeedZ', -0.2, 0.2);

}

function render() {
    renderer.render(scene, camera);
    pivotPoint.rotation.x += control.rotationSpeedX;
    pivotPoint.rotation.y += control.rotationSpeedY;
    pivotPoint.rotation.z += control.rotationSpeedZ;

    control.rotationX = pivotPoint.rotation.x;
    control.rotationY = pivotPoint.rotation.y;
    control.rotationZ = pivotPoint.rotation.z;

    cube.rotation.x += control.cubeRotationSpeedX;
    cube.rotation.y += control.cubeRotationSpeedY;
    cube.rotation.z += control.cubeRotationSpeedZ;

    requestAnimationFrame(render);
}

// calls the init function when the window is done loading.
window.onload = init;