// Imports.
import * as THREE from './libs/three.module.js'
import * as dat from './libs/dat.gui.module.js';
function main() {

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    const scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and configure it with shadows
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // // show axes in the screen
    // const axes = new THREE.AxisHelper(20);
    // scene.add(axes);

    // create a cube
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({
            color: 0xFF0000
        });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube
    cube.position.x = -4;
    cube.position.y = 4;
    cube.position.z = 0;

    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0x7777ff
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  
    // position the sphere
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
  
    // create the ground plane
    const planeGeometry = new THREE.PlaneGeometry(60, 20);
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xAAAAAA
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  
    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    plane.receiveShadow = true;
  
    // add the objects
    scene.add(cube);
    scene.add(sphere);
    scene.add(plane);

    // point the camera to the center of the scene
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    // add spotlight for the shadows
    const spotLight = new THREE.SpotLight(0xFFFFFF, 3000, 150);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    // If you want a more detailled shadow you can increase the 
    // mapSize used to draw the shadows.
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;

    scene.add(spotLight);

    // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);

    // call the render function
    let step = 0;

    const controls = {
        rotationSpeed: 0.02,
        bouncingSpeed: 0.03
    };

    const gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);

    renderScene();

    function renderScene() {
        // rotate the cube around its axes
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        // bounce the sphere up and down
        step += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

        // render using requestAnimationFrame
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }
}
window.onload = main;