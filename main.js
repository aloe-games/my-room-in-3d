import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls";
import Resources from "./src/Resources";
import assets from "./src/assets";
import World from "./src/World";

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 150)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(-20, 20, 20)
controls.update()

const resources = new Resources(renderer, assets)
new World(scene, resources)

renderer.setAnimationLoop(() => {renderer.render(scene, camera)})
