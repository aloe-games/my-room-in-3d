import * as THREE from 'three'

import Resources from './Resources.js'
import World from './World.js'

import assets from './assets.js'
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

export default class Experience
{
    static instance

    constructor()
    {
        if(Experience.instance)
        {
            return Experience.instance
        }
        Experience.instance = this

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 150)
        this.scene.add(this.camera)

        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.set(-20, 20, 20)
        this.controls.update()

        this.resources = new Resources(assets)
        this.world = new World()

        this.renderer.setAnimationLoop(() => {this.renderer.render(this.scene, this.camera)})
    }
}
