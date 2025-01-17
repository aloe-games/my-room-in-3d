import Baked from './Baked.js'
import GoogleLeds from './GoogleLeds.js'
import LoupedeckButtons from './LoupedeckButtons.js'
import TopChair from './TopChair.js'
import * as THREE from "three";

export default class World
{
    constructor(scene, resources)
    {
        resources.on('groupEnd', (_group) =>
        {
            if(_group.name === 'base')
            {
                this.setBaked()
                this.setGoogleLeds()
                this.setLoupedeckButtons()
                this.setTopChair()

                const elgatoLight = resources.items.elgatoLightModel.scene.children[0]
                elgatoLight.material = new THREE.MeshBasicMaterial({color: 0xffffff})
                scene.add(elgatoLight)

                const pcScreen = resources.items.pcScreenModel.scene.children[0]
                pcScreen.material = new THREE.MeshBasicMaterial({color: 0x222222})
                scene.add(pcScreen)

                const macScreen = resources.items.macScreenModel.scene.children[0]
                macScreen.material = new THREE.MeshBasicMaterial({color: 0x222222})
                scene.add(macScreen)
            }
        })
    }

    setBaked()
    {
        this.baked = new Baked()
    }

    setGoogleLeds()
    {
        this.googleLeds = new GoogleLeds()
    }

    setLoupedeckButtons()
    {
        this.loupedeckButtons = new LoupedeckButtons()
    }

    setTopChair()
    {
        this.topChair = new TopChair()
    }
}
