// Imports.
import * as THREE from './libs/three.module.js'
import * as dat from './libs/dat.gui.module.js';
function main() {

        // create a scene, that will hold all our elements such as objects, cameras and lights.
    const scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render and set the size
    const renderer = new THREE.WebGLRenderer();

        renderer.setClearColor(new THREE.Color(0xEEEEEE));
        renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.shadowMapEnabled = true;

        // create the ground plane
        const planeGeometry = new THREE.PlaneGeometry(60, 20, 20, 20);
        const planeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;

        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;

        // add the plane to the scene
        scene.add(plane);

        // create a cube
        const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff7777});
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;

        // position the cube
        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 0;

        // add the cube to the scene
        scene.add(cube);

        const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        // position the sphere
        sphere.position.x = 20;
        sphere.position.y = 0;
        sphere.position.z = 2;
        sphere.castShadow = true;

        // add the sphere to the scene
        scene.add(sphere);

        // position and point the camera to the center of the scene
        camera.position.x = -25;
        camera.position.y = 30;
        camera.position.z = 25;
        camera.lookAt(new THREE.Vector3(10, 0, 0));

        // add subtle ambient lighting
        const ambiColor = "#0c0c0c";
        const ambientLight = new THREE.AmbientLight(ambiColor);
        scene.add(ambientLight);

        // add spotlight for the shadows
        const spotLight = new THREE.SpotLight(0xffffff, 4000);
        spotLight.position.set(-40, 60, -10);
        spotLight.castShadow = true;
        // scene.add( spotLight );

        const pointColor = "#ccffcc";
        const pointLight = new THREE.PointLight(pointColor, 100);
        pointLight.distance = 100;
        pointLight.castShadow = true;
        pointLight.shadow.camera.near = 1;
        pointLight.shadow.camera.far = 100;
        pointLight.shadow.camera.fov = 120;
        scene.add(pointLight);


        // add a small sphere simulating the pointlight
        const sphereLight = new THREE.SphereGeometry(0.2);
        const sphereLightMaterial = new THREE.MeshBasicMaterial({color: 0xac6c25});
        const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
        sphereLightMesh.castShadow = true;

        sphereLightMesh.position.set(new THREE.Vector3(3, 0, 3));
        scene.add(sphereLightMesh);


        // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);

        // call the render function
        let step = 0;

        // used to determine the switch point for the light animation
        let invert = 1;
        let phase = 0;

        const controls = new function () {
            this.rotationSpeed = 0.03;
            this.bouncingSpeed = 0.03;
            this.ambientColor = ambiColor;
            this.pointColor = pointColor;
            this.intensity = 100;
            this.distance = 100;
        };

        const gui = new dat.GUI();
        gui.addColor(controls, 'ambientColor').onChange(function (e) {
            ambientLight.color = new THREE.Color(e);
        });

        gui.addColor(controls, 'pointColor').onChange(function (e) {
            pointLight.color = new THREE.Color(e);
        });

        gui.add(controls, 'intensity', 0, 1000).onChange(function (e) {
            pointLight.intensity = e;
        });

        gui.add(controls, 'distance', 0, 100).onChange(function (e) {
            pointLight.distance = e;
        });

        gui.add(controls, 'rotationSpeed', 0, 0.03);
        gui.add(controls, 'bouncingSpeed', 0, 0.03);

        render();

        function render() {
            // rotate the cube around its axes
            cube.rotation.x += controls.rotationSpeed;
            cube.rotation.y += controls.rotationSpeed;
            cube.rotation.z += controls.rotationSpeed;

            // bounce the sphere up and down
            step += controls.bouncingSpeed;
            sphere.position.x = 20 + ( 10 * (Math.cos(step)));
            sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));

            // move the light simulation
            if (phase > 2 * Math.PI) {
                invert = invert * -1;
                phase -= 2 * Math.PI;
            } else {
                phase += controls.rotationSpeed;
            }
            sphereLightMesh.position.z = +(7 * (Math.sin(phase)));
            sphereLightMesh.position.x = +(14 * (Math.cos(phase)));
            sphereLightMesh.position.y = 5;

            if (invert < 0) {
                let pivot = 14;
                sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
            }

            pointLight.position.copy(sphereLightMesh.position);

            // render using requestAnimationFrame
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }
}
window.onload = main;