import * as THREE from 'three'

import vertexShader from './shaders/vertex.glsl.js'
import fragmentShader from './shaders/fragment.glsl.js'

export default class Baked {
    constructor(scene, resources) {
        this.resources = resources
        this.scene = scene

        this.setModel()
    }

    setModel() {
        this.model = {}

        this.model.mesh = this.resources["roomModel.glb"].scene.children[0]

        this.model.bakedDayTexture = this.resources["bakedDay.jpg"]
        this.model.bakedDayTexture.encoding = THREE.sRGBEncoding
        this.model.bakedDayTexture.flipY = false

        this.model.bakedNightTexture = this.resources["bakedNight.jpg"]
        this.model.bakedNightTexture.encoding = THREE.sRGBEncoding
        this.model.bakedNightTexture.flipY = false

        this.model.bakedNeutralTexture = this.resources["bakedNeutral.jpg"]
        this.model.bakedNeutralTexture.encoding = THREE.sRGBEncoding
        this.model.bakedNeutralTexture.flipY = false

        this.model.lightMapTexture = this.resources["lightMap.jpg"]
        this.model.lightMapTexture.flipY = false

        this.colors = {}
        this.colors.tv = '#ff115e'
        this.colors.desk = '#ff6700'
        this.colors.pc = '#0082ff'

        this.model.material = new THREE.ShaderMaterial({
            uniforms: {
                uBakedDayTexture: {value: this.model.bakedDayTexture},
                uBakedNightTexture: {value: this.model.bakedNightTexture},
                uBakedNeutralTexture: {value: this.model.bakedNeutralTexture},
                uLightMapTexture: {value: this.model.lightMapTexture},

                uNightMix: {value: 1},
                uNeutralMix: {value: 0},

                uLightTvColor: {value: new THREE.Color(this.colors.tv)},
                uLightTvStrength: {value: 1.47},

                uLightDeskColor: {value: new THREE.Color(this.colors.desk)},
                uLightDeskStrength: {value: 1.9},

                uLightPcColor: {value: new THREE.Color(this.colors.pc)},
                uLightPcStrength: {value: 1.4}
            }, vertexShader: vertexShader, fragmentShader: fragmentShader
        })

        this.model.mesh.traverse((_child) => {
            if (_child instanceof THREE.Mesh) {
                _child.material = this.model.material
            }
        })

        this.scene.add(this.model.mesh)
    }
}
