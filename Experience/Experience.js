import * as THREE from 'three'

import Resources from './Resources.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'
import Navigation from './Navigation.js'

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
        this.setCamera()
        this.setRenderer()
        // this.controls = new OrbitControls(this.camera.instance, this.renderer.instance.domElement);
        this.setResources()
        this.setWorld()
        this.setNavigation()

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

    setCamera()
    {
        this.camera = new Camera()
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

    setNavigation()
    {
        this.navigation = new Navigation()
    }

    update()
    {


        this.camera.update()

        if(this.renderer)
            this.renderer.update()

        if(this.navigation)
            this.navigation.update()

        window.requestAnimationFrame(() =>
        {
            this.update()
        })
    }
}
