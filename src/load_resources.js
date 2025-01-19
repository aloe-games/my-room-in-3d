import * as THREE from "three"
import {DRACOLoader} from "three/addons/loaders/DRACOLoader"
import {GLTFLoader} from "three/addons/loaders/GLTFLoader"

const texture_loader = new THREE.TextureLoader()
const draco_loader = new DRACOLoader()
draco_loader.setDecoderConfig({type: "js"})
const gltf_loader = new GLTFLoader()
gltf_loader.setDRACOLoader(draco_loader)

export default (assets, callback) => {
    let loaded = {}
    function load_next() {
        if (Object.keys(loaded).length >= assets.length) {
            callback(loaded)
            return
        }
        let name = assets[Object.keys(loaded).length]
        let loader = texture_loader
        if (name.endsWith(".glb")) {
            loader = gltf_loader
        }
        loader.load("/assets/" + name, (value) => {
            loaded[name] = value
            load_next()
        })
    }
    load_next()
}
