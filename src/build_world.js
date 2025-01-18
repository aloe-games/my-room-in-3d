import Baked from './Baked.js'
import GoogleLeds from './GoogleLeds.js'
import LoupedeckButtons from './LoupedeckButtons.js'
import TopChair from './TopChair.js'
import * as THREE from "three";

export default (scene, resources, resources2) => {
    resources.on('groupEnd', (_group) => {
        if (_group.name === 'base') {
            const baked = new Baked(scene, resources)
            new GoogleLeds(scene, resources)
            new LoupedeckButtons(scene, resources)
            new TopChair(scene, resources, baked)


            const elgatoLight = resources2["elgatoLightModel.glb"].scene.children[0]
            elgatoLight.material = new THREE.MeshBasicMaterial({color: 0xffffff})
            scene.add(elgatoLight)

            const pcScreen = resources2["pcScreenModel.glb"].scene.children[0]
            pcScreen.material = new THREE.MeshBasicMaterial({color: 0x222222})
            scene.add(pcScreen)

            const macScreen = resources2["macScreenModel.glb"].scene.children[0]
            macScreen.material = new THREE.MeshBasicMaterial({color: 0x222222})
            scene.add(macScreen)
        }
    })
}
