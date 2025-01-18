import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls";
import Resources from "./src/Resources";
import assets from "./src/assets";
import build_world from "./src/build_world";
import load_resources from "./src/load_resources";

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

const resources2 = load_resources(['bakedDay.jpg', 'bakedNeutral.jpg', 'bakedNight.jpg', 'elgatoLightModel.glb', 'googleHomeLedMask.png', 'googleHomeLedsModel.glb', 'lightMap.jpg', 'loupedeckButtonsModel.glb', 'macScreenModel.glb', 'pcScreenModel.glb', 'roomModel.glb', 'topChairModel.glb'])

const resources = new Resources(renderer, assets)
build_world(scene, resources, resources2)

renderer.setAnimationLoop(() => {
    renderer.render(scene, camera)
})
