import * as THREE from "three";

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
        }, vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }`, fragmentShader: `
            uniform sampler2D uBakedNightTexture;
            uniform sampler2D uLightMapTexture;
            
            uniform vec3 uLightTvColor;
            uniform float uLightTvStrength;
            
            uniform vec3 uLightDeskColor;
            uniform float uLightDeskStrength;
            
            uniform vec3 uLightPcColor;
            uniform float uLightPcStrength;
            
            varying vec2 vUv;
            
            float blendLighten(float base, float blend) {
                return max(blend,base);
            }
            
            vec3 blendLighten(vec3 base, vec3 blend) {
                return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
            }
            
            vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
                return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
            }
            
            void main()
            {
                vec3 bakedColor = texture2D(uBakedNightTexture, vUv).rgb;
                vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;
            
                float lightTvStrength = lightMapColor.r * uLightTvStrength;
                bakedColor = blendLighten(bakedColor, uLightTvColor, lightTvStrength);
            
                float lightPcStrength = lightMapColor.b * uLightPcStrength;
                bakedColor = blendLighten(bakedColor, uLightPcColor, lightPcStrength);
            
                float lightDeskStrength = lightMapColor.g * uLightDeskStrength;
                bakedColor = blendLighten(bakedColor, uLightDeskColor, lightDeskStrength);
            
                gl_FragColor = vec4(bakedColor, 1.0);
            }
            `
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
