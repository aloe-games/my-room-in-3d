import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls";
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

load_resources(['bakedNight.jpg', 'elgatoLightModel.glb', 'lightMap.jpg', 'macScreenModel.glb', 'pcScreenModel.glb', 'roomModel.glb', 'topChairModel.glb'], (resources) => {
    build_world(scene, resources)

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera)
    })
})
