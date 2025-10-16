"use strict";

// Imports.
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js'
import * as  dat from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/build/dat.gui.module.js';

function main() {

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    const scene = new THREE.Scene();

    // create a render, sets the background color and the size
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // show axes in the screen
    const axes = new THREE.AxesHelper(50);
    scene.add(axes);
	
	// create a camera, which defines where we're looking at.
    let camera = new THREE.OrthographicCamera( -window.innerWidth / 20, window.innerWidth / 20, window.innerHeight / 20,
        -window.innerHeight / 20, -20, 20 );

    const gui = new dat.GUI();
	
	const lineGeometry = new THREE.BufferGeometry();
	const points = [];
	const colors = [];
	const radius = 20, twopi = 2 * Math.PI, N_SEGMENTS = 100;
	for (let i = 0; i <= N_SEGMENTS; i++)
	{
		const x = radius * Math.cos( i / N_SEGMENTS * twopi );
		const y = radius * Math.sin( i / N_SEGMENTS * twopi );
		points.push(x, y, 0);
		
		colors.push(i / (N_SEGMENTS - 1), 0, (N_SEGMENTS - 1 - i) / (N_SEGMENTS - 1));
	}

	const vertices = new Float32Array( points );
	lineGeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	
	const verticesColors = new Float32Array( colors );
	lineGeometry.setAttribute('color', new THREE.BufferAttribute(verticesColors, 3));
	
	const controls = {
		basicColor: "#ffffff"
	};
	const guiColor = gui.addColor(controls, 'basicColor');
	
	const controlsLine = {
		vertexColors: false,
        visible: true
	};
	
	const materialLine = new THREE.LineBasicMaterial({ color: controls.basicColor, vertexColors: controlsLine.vertexColors } );
	
	// Create the line
	const meshLine = new THREE.Line( lineGeometry, materialLine );
	meshLine.computeLineDistances();
    scene.add(meshLine);

	const guiLineParameters = gui.addFolder('line parameters');
	
    guiLineParameters.add(controlsLine, 'visible').onChange(function (e) {
		meshLine.material.visible = e;
	});
	guiLineParameters.add(controlsLine, 'vertexColors').onChange(function (e) {
		meshLine.material.vertexColors = e;
		meshLine.material.needsUpdate = true;
	});
	
	const controlsDash = {
		dashSize: 10,
		gapSize: 10,
		scale: 1
	};
	
	let guiDashParameters;
		
    const lineParameters = {
        type: "Basic",
        switchMaterial: function () {
            if (meshLine.material instanceof THREE.LineDashedMaterial) {
                meshLine.material = new THREE.LineBasicMaterial({ color: controls.basicColor, vertexColors: controlsLine.vertexColors } );
                
                this.type = "Basic";
				if (guiDashParameters != undefined)
					guiLineParameters.removeFolder(guiDashParameters);
            } else {
                meshLine.material = new THREE.LineDashedMaterial({ vertexColors: controlsLine.vertexColors,
								color: controls.basicColor, dashSize: controlsDash.dashSize, gapSize: controlsDash.gapSize, scale: controlsDash.scale });

                this.type = "Dashed";
				
				guiDashParameters = guiLineParameters.addFolder('dash parameters');
	
				guiDashParameters.add(controlsDash, 'dashSize', 1, 20).onChange(function (e) {
					meshLine.material.dashSize = e;
				});
				guiDashParameters.add(controlsDash, 'gapSize', 1, 20).onChange(function (e) {
					meshLine.material.gapSize = e;
				});
				guiDashParameters.add(controlsDash, 'scale', 0.1, 10).onChange(function (e) {
					meshLine.material.scale = e;
				});
            }
        }
    };

    guiLineParameters.add(lineParameters, 'switchMaterial');
    guiLineParameters.add(lineParameters, 'type').listen();
	
	const controlsPlane = {
        visible: false,
        wireframe: false,
		width: 20,
		height: 20,
		widthSegments: 4,
		heightSegments: 4
	};
	const controlsCircle = {
        visible: false,
        wireframe: false,
		radius: 20,
		segments: 50,
		thetaStart: Math.PI / 4,
		thetaLength: 3 * Math.PI / 2

	};
	const controlsRing = {
        visible: false,
        wireframe: false,
		innerRadius: 5,
		outerRadius: 20,
		thetaSegments: 10,
		phiSegments: 1,
		thetaStart: Math.PI / 4,
		thetaLength: Math.PI / 2

	};
	const controlsShape = {
        visible: false,
        wireframe: false,
		segments: 12
	};	

    // create a geometry
	const geometryPlane = new THREE.PlaneGeometry(controlsPlane.width, controlsPlane.height, controlsPlane.widthSegments, controlsPlane.heightSegments);
	const geometryCircle = new THREE.CircleGeometry(controlsCircle.radius, controlsCircle.segments, controlsCircle.thetaStart, controlsCircle.thetaLength);
	const geometryRing = new THREE.RingGeometry(controlsRing.innerRadius, controlsRing.outerRadius, controlsRing.thetaSegments, controlsRing.phiSegments, controlsRing.thetaStart, controlsRing.thetaLength);
	const geometryShape = new THREE.ShapeGeometry(drawShape(), controlsShape.segments);
	
	const materialPlane = new THREE.MeshBasicMaterial( {color: controls.basicColor, wireframe: controlsPlane.wireframe, visible: controlsPlane.visible});
	const materialCircle = new THREE.MeshBasicMaterial( {color: controls.basicColor, wireframe: controlsCircle.wireframe, visible: controlsCircle.visible});
	const materialRing = new THREE.MeshBasicMaterial( {color: controls.basicColor, wireframe: controlsRing.wireframe, visible: controlsRing.visible});
	const materialShape = new THREE.MeshBasicMaterial( {color: controls.basicColor, wireframe: controlsShape.wireframe, visible: controlsShape.visible});
	
	guiColor.onChange(function (e) {
		meshLine.material.color = new THREE.Color(e);
		meshPlane.material.color = new THREE.Color(e);
		meshCircle.material.color = new THREE.Color(e);
		meshRing.material.color = new THREE.Color(e);
		meshShape.material.color = new THREE.Color(e);
	});
	
	const guiPlaneParameters = gui.addFolder('plane parameters');
	const guiCircleParameters = gui.addFolder('circle parameters');
	const guiRingParameters = gui.addFolder('ring parameters');
	const guiShapeParameters = gui.addFolder('shape parameters');

	guiPlaneParameters.add(controlsPlane, 'visible').onChange(function (e) {
		meshPlane.material.visible = e;
	});
	guiPlaneParameters.add(controlsPlane, 'wireframe').onChange(function (e) {
		meshPlane.material.wireframe = e;
	});
	guiPlaneParameters.add(controlsPlane, 'width', 1, 40).onChange(function (e) {
		meshPlane.geometry = new THREE.PlaneGeometry(controlsPlane.width, controlsPlane.height, controlsPlane.widthSegments, controlsPlane.heightSegments);
	});
	guiPlaneParameters.add(controlsPlane, 'height', 1, 40).onChange(function (e) {
		meshPlane.geometry = new THREE.PlaneGeometry(controlsPlane.width, controlsPlane.height, controlsPlane.widthSegments, controlsPlane.heightSegments);
	});
	guiPlaneParameters.add(controlsPlane, 'widthSegments', 1, 10, 1).onChange(function (e) {
		meshPlane.geometry = new THREE.PlaneGeometry(controlsPlane.width, controlsPlane.height, controlsPlane.widthSegments, controlsPlane.heightSegments);
	});
	guiPlaneParameters.add(controlsPlane, 'heightSegments', 1, 10, 1).onChange(function (e) {
		meshPlane.geometry = new THREE.PlaneGeometry(controlsPlane.width, controlsPlane.height, controlsPlane.widthSegments, controlsPlane.heightSegments);
	});
	guiCircleParameters.add(controlsCircle, 'visible').onChange(function (e) {
		meshCircle.material.visible = e;
	});
	guiCircleParameters.add(controlsCircle, 'wireframe').onChange(function (e) {
		meshCircle.material.wireframe = e;
	});
	guiCircleParameters.add(controlsCircle, 'radius', 1, 40).onChange(function (e) {
		meshCircle.geometry = new THREE.CircleGeometry(controlsCircle.radius, controlsCircle.segments, controlsCircle.thetaStart, controlsCircle.thetaLength);
	});
	guiCircleParameters.add(controlsCircle, 'segments', 1, 100, 1).onChange(function (e) {
		meshCircle.geometry = new THREE.CircleGeometry(controlsCircle.radius, controlsCircle.segments, controlsCircle.thetaStart, controlsCircle.thetaLength);
	});
	guiCircleParameters.add(controlsCircle, 'thetaStart', 0, Math.PI * 2).onChange(function (e) {
		meshCircle.geometry = new THREE.CircleGeometry(controlsCircle.radius, controlsCircle.segments, controlsCircle.thetaStart, controlsCircle.thetaLength);
	});
	guiCircleParameters.add(controlsCircle, 'thetaLength', 0, Math.PI * 2).onChange(function (e) {
		meshCircle.geometry = new THREE.CircleGeometry(controlsCircle.radius, controlsCircle.segments, controlsCircle.thetaStart, controlsCircle.thetaLength);
	});
	guiRingParameters.add(controlsRing, 'visible').onChange(function (e) {
		meshRing.material.visible = e;
	});
	guiRingParameters.add(controlsRing, 'wireframe').onChange(function (e) {
		meshRing.material.wireframe = e;
	});
	guiRingParameters.add(controlsRing, 'innerRadius', 1, 40).onChange(function (e) {
		meshRing.geometry = new THREE.RingGeometry(controlsRing.innerRadius, controlsRing.outerRadius, controlsRing.thetaSegments, controlsRing.phiSegments, controlsRing.thetaStart, controlsRing.thetaLength);
	});
	guiRingParameters.add(controlsRing, 'outerRadius', 1, 40).onChange(function (e) {
		meshRing.geometry = new THREE.RingGeometry(controlsRing.innerRadius, controlsRing.outerRadius, controlsRing.thetaSegments, controlsRing.phiSegments, controlsRing.thetaStart, controlsRing.thetaLength);
	});
	guiRingParameters.add(controlsRing, 'thetaSegments', 1, 100, 1).onChange(function (e) {
		meshRing.geometry = new THREE.RingGeometry(controlsRing.innerRadius, controlsRing.outerRadius, controlsRing.thetaSegments, controlsRing.phiSegments, controlsRing.thetaStart, controlsRing.thetaLength);
	});
	guiRingParameters.add(controlsRing, 'phiSegments', 1, 100, 1).onChange(function (e) {
		meshRing.geometry = new THREE.RingGeometry(controlsRing.innerRadius, controlsRing.outerRadius, controlsRing.thetaSegments, controlsRing.phiSegments, controlsRing.thetaStart, controlsRing.thetaLength);
	});
	guiRingParameters.add(controlsRing, 'thetaStart', 0, Math.PI * 2).onChange(function (e) {
		meshRing.geometry = new THREE.RingGeometry(controlsRing.innerRadius, controlsRing.outerRadius, controlsRing.thetaSegments, controlsRing.phiSegments, controlsRing.thetaStart, controlsRing.thetaLength);
	});
	guiRingParameters.add(controlsRing, 'thetaLength', 0, Math.PI * 2).onChange(function (e) {
		meshRing.geometry = new THREE.RingGeometry(controlsRing.innerRadius, controlsRing.outerRadius, controlsRing.thetaSegments, controlsRing.phiSegments, controlsRing.thetaStart, controlsRing.thetaLength);
	});
	guiShapeParameters.add(controlsShape, 'visible').onChange(function (e) {
		meshShape.material.visible = e;
	});
	guiShapeParameters.add(controlsShape, 'wireframe').onChange(function (e) {
		meshShape.material.wireframe = e;
	});
	guiShapeParameters.add(controlsShape, 'segments', 1, 20, 1).onChange(function (e) {
		meshShape.geometry = new THREE.ShapeGeometry(drawShape(), controlsShape.segments);
	});

    const meshPlane = new THREE.Mesh(geometryPlane, materialPlane);
	//meshPlane.position.x = 10;
    const meshCircle = new THREE.Mesh(geometryCircle, materialCircle);
    const meshRing = new THREE.Mesh(geometryRing, materialRing);
    const meshShape = new THREE.Mesh(geometryShape, materialShape);

    scene.add(meshPlane);
    scene.add(meshCircle);
    scene.add(meshRing);
    scene.add(meshShape);

    // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);

    function render() {
		// position the camera
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 15;
 
        camera.lookAt(scene.position);

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    // call the render function
    render();
}

function drawShape() {

  // create a basic shape
  var shape = new THREE.Shape();

  // startpoint
  shape.moveTo(10, 10);

  // straight line upwards
  shape.lineTo(10, 40);

  // the top of the figure, curve to the right
  shape.bezierCurveTo(15, 25, 25, 25, 30, 40);

  // spline back down
  shape.splineThru(
    [new THREE.Vector2(32, 30),
      new THREE.Vector2(28, 20),
      new THREE.Vector2(30, 10),
    ]);

  // curve at the bottom
  shape.quadraticCurveTo(20, 15, 10, 10);

  // add 'eye' hole one
  var hole1 = new THREE.Path();
  hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true);
  shape.holes.push(hole1);

  // add 'eye hole 2'
  var hole2 = new THREE.Path();
  hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true);
  shape.holes.push(hole2);

  // add 'mouth'
  var hole3 = new THREE.Path();
  hole3.absarc(20, 16, 2, 0, Math.PI, true);
  shape.holes.push(hole3);

  // return the shape
  return shape;
}

window.onload = main;