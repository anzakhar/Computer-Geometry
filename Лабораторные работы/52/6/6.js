"use strict";

// Imports.
import * as THREE from './libs/three.module.js'
import * as  dat from './libs/dat.gui.module.js';

function main() {

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    const scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    let camera = new THREE.OrthographicCamera( -window.innerWidth / 130, window.innerWidth / 130, window.innerHeight / 130,
        -window.innerHeight / 130, -200, 500 );

    // create a render, sets the background color and the size
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // show axes in the screen
    const axes = new THREE.AxesHelper(20);
    scene.add(axes);

    const controls = {
        view: 'axonometry',
        zoom: 'in',
        perspective_effect: 'more',
        visibleRed: true,
        visibleGreen: true,
        visibleBlue: true,
        visibleCyan: true,
        visibleMagenta: true,
        visibleYellow: true,
        wireframe: false
    };

    const gui = new dat.GUI();
	gui.add(controls, 'wireframe');

    const guiVisible = gui.addFolder('visible');
    guiVisible.add(controls, 'visibleRed');
    guiVisible.add(controls, 'visibleGreen');
    guiVisible.add(controls, 'visibleBlue');
    guiVisible.add(controls, 'visibleCyan');
    guiVisible.add(controls, 'visibleMagenta');
    guiVisible.add(controls, 'visibleYellow');
	
    const guiCamera = gui.addFolder('camera');

    const projection = {
        type: "Orthographic",
        switchCamera: function () {
            if (camera instanceof THREE.PerspectiveCamera) {
                camera = new THREE.OrthographicCamera( window.innerWidth / -130, window.innerWidth / 130, window.innerHeight / 130,
                    window.innerHeight / - 130, -200, 500 );
                
                this.type = "Orthographic";
                guiCamera.remove(view);
                if (perspective_effect != undefined)
                guiCamera.remove(perspective_effect);
                controls.view = 'axonometry';
                view = guiCamera.add(controls, 'view', ['left', 'right', 'top', 'bottom', 'front', 'back', 'isometry', 'axonometry']);
                zoom = guiCamera.add(controls, 'zoom', ['in', 'out']);
            } else {
                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

                this.type = "Perspective";
                guiCamera.remove(view);
                guiCamera.remove(zoom);
                controls.view = '3-point';
                view = guiCamera.add(controls, 'view', ['1-point', '2-point', '3-point']);
                perspective_effect = guiCamera.add(controls, 'perspective_effect', ['more', 'less']);
            }
        }
    };

    guiCamera.add(projection, 'switchCamera');
    guiCamera.add(projection, 'type').listen();
    let view = guiCamera.add(controls, 'view', ['left', 'right', 'top', 'bottom', 'front', 'back', 'isometry', 'axonometry']);
    let zoom = guiCamera.add(controls, 'zoom', ['in', 'out']);
    let perspective_effect;

    // create a cube and add to scene

    const matArray = [];
    matArray.push(new THREE.MeshBasicMaterial( {color: 0x00ffff, side:THREE.DoubleSide, wireframe: controls.wireframe, }));
    matArray.push(new THREE.MeshBasicMaterial( {color: 0xff0000, side:THREE.DoubleSide, wireframe: controls.wireframe, }));
    matArray.push(new THREE.MeshBasicMaterial( {color: 0x0000ff, side:THREE.DoubleSide, wireframe: controls.wireframe, }));
    matArray.push(new THREE.MeshBasicMaterial( {color: 0xff00ff, side:THREE.DoubleSide, wireframe: controls.wireframe, }));
    matArray.push(new THREE.MeshBasicMaterial( {color: 0x00ff00, side:THREE.DoubleSide, wireframe: controls.wireframe, }));
    matArray.push(new THREE.MeshBasicMaterial( {color: 0xffff00, side:THREE.DoubleSide, wireframe: controls.wireframe, }));
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cube = new THREE.Mesh(cubeGeometry, matArray);

    scene.add(cube);

    // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);

    function render() {

        switch (controls.view) {
            case 'left':
                // position the camera
                camera.position.x = 5;
                camera.position.y = 13;
                camera.position.z = 15;
            break;
            case 'right':
                // position the camera
                camera.position.x = 5;
                camera.position.y = 13;
                camera.position.z = 15;
            break;
            case 'top':
                // position the camera
                camera.position.x = 5;
                camera.position.y = 13;
                camera.position.z = 15;
            break;
            case 'bottom':
                // position the camera
                camera.position.x = 5;
                camera.position.y = 13;
                camera.position.z = 15;
            break;
            case 'front':
                // position the camera
                camera.position.x = 5;
                camera.position.y = 13;
                camera.position.z = 15;
            break;
            case 'back':
                // position the camera
                camera.position.x = 5;
                camera.position.y = 13;
                camera.position.z = 15;
            break;
            case 'isometry':
                // position the camera
                camera.position.x = 5;
                camera.position.y = 13;
                camera.position.z = 15;
            break;
            case 'axonometry':
                switch (controls.zoom) {
                    case 'in':
                        // camera = new THREE.OrthographicCamera( window.innerWidth / -130, window.innerWidth / 130, window.innerHeight / 130,
                        //                                         window.innerHeight / - 130, -200, 500 );
                      break;
                    case 'out':
                        // camera = new THREE.OrthographicCamera( window.innerWidth / -130, window.innerWidth / 130, window.innerHeight / 130,
                        //                                         window.innerHeight / - 130, -200, 500 );
                      break;
                  }
                                  // position the camera
                camera.position.x = 5;
                camera.position.y = 13;
                camera.position.z = 15;
            break;
            case '1-point':

                switch (controls.perspective_effect) {
                    case 'more':
                      // camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                      // position the camera
                      // camera.position.x = 5;
                      // camera.position.y = 13;
                      // camera.position.z = 15;
                      break;
                    case 'less':
                      // camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                      // position the camera
                      // camera.position.x = 5;
                      // camera.position.y = 13;
                      // camera.position.z = 15;
                      break;
                    }
            break;
            case '2-point':
                // position the camera
                camera.position.x = 5;
                camera.position.y = 13;
                camera.position.z = 15;
            break;
            case '3-point':
                // position the camera
                camera.position.x = 5;
                camera.position.y = 13;
                camera.position.z = 15;                
            break;
        }
 
        camera.lookAt(scene.position);

        matArray[0].visible = controls.visibleCyan;
        matArray[1].visible = controls.visibleRed;
        matArray[2].visible = controls.visibleBlue;
        matArray[3].visible = controls.visibleMagenta;
        matArray[4].visible = controls.visibleGreen;
        matArray[5].visible = controls.visibleYellow;
		
		matArray[0].wireframe = controls.wireframe;
        matArray[1].wireframe = controls.wireframe;
        matArray[2].wireframe = controls.wireframe;
        matArray[3].wireframe = controls.wireframe;
        matArray[4].wireframe = controls.wireframe;
        matArray[5].wireframe = controls.wireframe;

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    // call the render function
    render();
}

window.onload = main;