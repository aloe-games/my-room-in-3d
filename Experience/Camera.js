import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default class Camera
{
    constructor(_options)
    {
        // Options
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Set up
        this.mode = 'default'

        this.setInstance()
        this.setModes()
    }

    setInstance()
    {
        // Set up
        this.instance = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 150)
        this.instance.position.set(-18.90110266005151, 15.619714992186406, 18.901102660051514)
        this.instance.quaternion.set(-0.2156753936261212, -0.37210985866635193, -0.08933567311009516, 0.8983526674850427)
        this.scene.add(this.instance)
    }

    setModes()
    {
        this.modes = {}

        // Default
        this.modes.default = {}
        this.modes.default.instance = this.instance.clone()
        // this.modes.default.instance.rotation.reorder('YXZ')
    }
}
