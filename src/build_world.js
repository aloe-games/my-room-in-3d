import * as THREE from "three";

import vertexShader from './shaders/vertex.glsl.js'
import fragmentShader from './shaders/fragment.glsl.js'

export default (scene, resources) => {
    const room = {}

    room.mesh = resources["roomModel.glb"].scene.children[0]

    room.bakedNightTexture = resources["bakedNight.jpg"]
    room.bakedNightTexture.flipY = false

    room.lightMapTexture = resources["lightMap.jpg"]
    room.lightMapTexture.flipY = false

    const colors = {}
    colors.tv = 'HotPink'
    colors.desk = 'GoldenRod'
    colors.pc = 'CornflowerBlue'

    room.material = new THREE.ShaderMaterial({
        uniforms: {
            uBakedNightTexture: {value: room.bakedNightTexture},
            uLightMapTexture: {value: room.lightMapTexture},

            uLightTvColor: {value: new THREE.Color(colors.tv)},
            uLightTvStrength: {value: 1.47},

            uLightDeskColor: {value: new THREE.Color(colors.desk)},
            uLightDeskStrength: {value: 1.9},

            uLightPcColor: {value: new THREE.Color(colors.pc)},
            uLightPcStrength: {value: 1.4}
        }, vertexShader: vertexShader, fragmentShader: fragmentShader
    })

    room.mesh.traverse((_child) => {
        if (_child instanceof THREE.Mesh) {
            _child.material = room.material
        }
    })

    scene.add(room.mesh)

    const topChair = {}
    topChair.group = resources["topChairModel.glb"].scene.children[0]
    scene.add(topChair.group)
    topChair.group.traverse((_child) => {
        if (_child instanceof THREE.Mesh) {
            _child.material = room.material
        }
    })

    const elgatoLight = resources["elgatoLightModel.glb"].scene.children[0]
    elgatoLight.material = new THREE.MeshBasicMaterial({color: 0xffffff})
    scene.add(elgatoLight)

    const pcScreen = resources["pcScreenModel.glb"].scene.children[0]
    pcScreen.material = new THREE.MeshBasicMaterial({color: 0x222222})
    scene.add(pcScreen)

    const macScreen = resources["macScreenModel.glb"].scene.children[0]
    macScreen.material = new THREE.MeshBasicMaterial({color: 0x222222})
    scene.add(macScreen)
}
