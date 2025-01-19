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
            uLightDeskColor: {value: new THREE.Color(colors.desk)},
            uLightPcColor: {value: new THREE.Color(colors.pc)},
        }, vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }`, fragmentShader: `
            uniform sampler2D uBakedNightTexture;
            uniform sampler2D uLightMapTexture;
            uniform vec3 uLightTvColor;
            uniform vec3 uLightDeskColor;
            uniform vec3 uLightPcColor;
            
            varying vec2 vUv;
            
            vec3 blendLighten(vec3 base, vec3 blend) {
                return vec3(max(base.r, blend.r), max(base.g, blend.g), max(base.b, blend.b));
            }
            
            vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
                return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
            }
            
            void main()
            {
                vec3 bakedColor = texture2D(uBakedNightTexture, vUv).rgb;
                vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;
                bakedColor = blendLighten(bakedColor, uLightTvColor, lightMapColor.r * 1.5);
                bakedColor = blendLighten(bakedColor, uLightPcColor, lightMapColor.b * 1.5);
                bakedColor = blendLighten(bakedColor, uLightDeskColor, lightMapColor.g * 1.5);
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
