import * as THREE from 'three'

import Resources from './Resources.js'
import Renderer from './Renderer.js'
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

        this.setConfig()
        this.setScene()

        this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 150)
        this.camera.position.set(-18.90110266005151, 15.619714992186406, 18.901102660051514)
        this.camera.quaternion.set(-0.2156753936261212, -0.37210985866635193, -0.08933567311009516, 0.8983526674850427)
        this.scene.add(this.camera)

        this.setRenderer()
        // this.controls = new OrbitControls(this.camera, this.renderer.instance.domElement);
        this.setResources()
        this.setWorld()

        this.update()
    }

    setConfig()
    {
        this.config = {}

        // Pixel ratio
        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)
        this.config.smallestSide = Math.min(window.innerWidth, window.innerHeight)
        this.config.largestSide = Math.max(window.innerWidth, window.innerHeight)
    }

    setScene()
    {
        this.scene = new THREE.Scene()
    }

    setRenderer()
    {
        this.renderer = new Renderer({ rendererInstance: this.rendererInstance })
        document.body.appendChild(this.renderer.instance.domElement)
    }

    setResources()
    {
        this.resources = new Resources(assets)
    }

    setWorld()
    {
        this.world = new World()
    }

    update()
    {
        if(this.renderer)
            this.renderer.update()

        // this.controls.update()

        window.requestAnimationFrame(() =>
        {
            this.update()
        })
    }
}
