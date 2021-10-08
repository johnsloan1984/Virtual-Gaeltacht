import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125/build/three.module.js";
import Stats from "https://cdn.jsdelivr.net/npm/three@0.125/examples/jsm/libs/stats.module.js";
import { showAxesHelper } from "./settings.js"
import { camera } from "./camera.js"

let	scene, renderer, clock, container, stats, windowWidth, windowHeight, controlPanelHeight
const setupScene = () => {

	container = document.getElementById("threeCanvas");
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setClearColor( 0xffffff, 0 )
	clock = new THREE.Clock();
	scene = new THREE.Scene();
	stats = new Stats();
	renderer.setPixelRatio(window.devicePixelRatio);
	windowWidth = window.innerWidth
	windowHeight = window.innerHeight
	renderer.setSize(windowWidth, windowHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;

	container.appendChild(renderer.domElement);
	container.appendChild(stats.dom);

	if (showAxesHelper) {
		const axesHelper = new THREE.AxesHelper( 5 );
		scene.add( axesHelper );
	}


	window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
	windowWidth = window.innerWidth
	windowHeight = window.innerHeight
	camera.aspect = windowWidth / windowHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(windowWidth, windowHeight);
}

export { setupScene, scene, renderer, clock, container, stats, windowWidth, windowHeight, onWindowResize }
