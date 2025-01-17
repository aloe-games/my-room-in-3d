import * as THREE from 'three'

import Resources from './Resources.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'
import Navigation from './Navigation.js'

import assets from './assets.js'

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

        // Options
        this.targetElement = document.createElement("div")
        document.body.appendChild(this.targetElement)

        if(!this.targetElement)
        {
            console.warn('Missing \'targetElement\' property')
            return
        }

        this.setConfig()
        this.setScene()
        this.setCamera()
        this.setRenderer()
        this.setResources()
        this.setWorld()
        this.setNavigation()

        this.update()
    }

    // static getInstance(_options = {})
    // {
    //     console.log(Experience.instance)
    //     if(Experience.instance)
    //     {
    //         return Experience.instance
    //     }

    //     console.log('create')
    //     Experience.instance = new Experience(_options)

    //     return Experience.instance
    // }

    setConfig()
    {
        this.config = {}

        // Pixel ratio
        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        // Width and height
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height || window.innerHeight
        this.config.smallestSide = Math.min(this.config.width, this.config.height)
        this.config.largestSide = Math.max(this.config.width, this.config.height)
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

        this.targetElement.appendChild(this.renderer.instance.domElement)
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
        if(this.stats)
            this.stats.update()

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

    destroy()
    {

    }
}
