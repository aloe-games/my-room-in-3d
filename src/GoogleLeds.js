import * as THREE from 'three'

export default class GoogleLeds {
    constructor(scene, resources2) {
        this.resources2 = resources2
        this.scene = scene

        this.setModel()
    }

    setModel() {
        this.model = {}

        this.model.items = []

        const colors = ['#196aff', '#ff0000', '#ff5d00', '#7db81b']

        // Texture
        this.model.texture = this.resources2["googleHomeLedMask.png"]

        // Children
        const children = [...this.resources2["googleHomeLedsModel.glb"].scene.children]
        children.sort((_a, _b) => {
            if (_a.name < _b.name) return -1

            if (_a.name > _b.name) return 1

            return 0
        })

        let i = 0
        for (const _child of children) {
            const item = {}

            item.index = i

            item.color = colors[item.index]

            item.material = new THREE.MeshBasicMaterial({
                color: item.color, transparent: true, alphaMap: this.model.texture
            })

            item.mesh = _child
            item.mesh.material = item.material
            this.scene.add(item.mesh)

            this.model.items.push(item)

            i++
        }
    }
}
