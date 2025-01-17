import * as THREE from 'three'

export default class TopChair {
    constructor(scene, resources, baked) {
        this.resources = resources
        this.scene = scene
        this.baked = baked

        this.setModel()
    }

    setModel() {
        this.model = {}

        this.model.group = this.resources.items.topChairModel.scene.children[0]
        this.scene.add(this.model.group)

        this.model.group.traverse((_child) => {
            if (_child instanceof THREE.Mesh) {
                _child.material = this.baked.model.material
            }
        })
    }
}
