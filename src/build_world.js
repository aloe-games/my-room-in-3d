import * as THREE from "three";

import vertexShader from './shaders/vertex.glsl.js'
import fragmentShader from './shaders/fragment.glsl.js'

export default (scene, resources) => {
    const baked = {}

    baked.mesh = resources["roomModel.glb"].scene.children[0]

    baked.bakedDayTexture = resources["bakedDay.jpg"]
    baked.bakedDayTexture.encoding = THREE.sRGBEncoding
    baked.bakedDayTexture.flipY = false

    baked.bakedNightTexture = resources["bakedNight.jpg"]
    baked.bakedNightTexture.encoding = THREE.sRGBEncoding
    baked.bakedNightTexture.flipY = false

    baked.bakedNeutralTexture = resources["bakedNeutral.jpg"]
    baked.bakedNeutralTexture.encoding = THREE.sRGBEncoding
    baked.bakedNeutralTexture.flipY = false

    baked.lightMapTexture = resources["lightMap.jpg"]
    baked.lightMapTexture.flipY = false

    const colors = {}
    colors.tv = '#ff115e'
    colors.desk = '#ff6700'
    colors.pc = '#0082ff'

    baked.material = new THREE.ShaderMaterial({
        uniforms: {
            uBakedDayTexture: {value: baked.bakedDayTexture},
            uBakedNightTexture: {value: baked.bakedNightTexture},
            uBakedNeutralTexture: {value: baked.bakedNeutralTexture},
            uLightMapTexture: {value: baked.lightMapTexture},

            uNightMix: {value: 1},
            uNeutralMix: {value: 0},

            uLightTvColor: {value: new THREE.Color(colors.tv)},
            uLightTvStrength: {value: 1.47},

            uLightDeskColor: {value: new THREE.Color(colors.desk)},
            uLightDeskStrength: {value: 1.9},

            uLightPcColor: {value: new THREE.Color(colors.pc)},
            uLightPcStrength: {value: 1.4}
        }, vertexShader: vertexShader, fragmentShader: fragmentShader
    })

    baked.mesh.traverse((_child) => {
        if (_child instanceof THREE.Mesh) {
            _child.material = baked.material
        }
    })

    scene.add(baked.mesh)

    const topChair = {}
    topChair.group = resources["topChairModel.glb"].scene.children[0]
    scene.add(topChair.group)
    topChair.group.traverse((_child) => {
        if (_child instanceof THREE.Mesh) {
            _child.material = baked.material
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
