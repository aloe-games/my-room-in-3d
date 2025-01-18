import * as THREE from "three";
import {DRACOLoader} from "three/addons/loaders/DRACOLoader";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import {texture} from "three/tsl";

const texture_loader = new THREE.TextureLoader();
const draco_loader = new DRACOLoader()
draco_loader.setDecoderConfig({type: 'js'})
const gltf_loader = new GLTFLoader()
gltf_loader.setDRACOLoader(draco_loader)

let load = (name) => {
    return new Promise((resolve, reject) => {
        let loader = texture_loader
        if (name.endsWith(".glb")) {
            loader = gltf_loader
        }
        loader.load("/assets/" + name, (value) => {
            resolve(value)
        }, () => {
        }, () => {
            reject(name)
        })
    });
};
export default async (assets) => {
    let loaded = {}
    for (let i = 0; i < assets.length; i++) {
        let name = assets[i]
        await load(name).then(value => loaded[name] = value).catch(error => console.log(error))
    }
    return loaded
}
