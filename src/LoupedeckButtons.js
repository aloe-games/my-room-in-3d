import * as THREE from 'three'

export default class LoupedeckButtons {
    constructor(scene, resources2) {
        this.resources2 = resources2
        this.scene = scene

        this.setModel()
        this.setAnimation()
    }

    setModel() {
        this.model = {}

        this.model.items = []

        // Children
        const children = [...this.resources2["loupedeckButtonsModel.glb"].scene.children]
        children.sort((_a, _b) => {
            if (_a.name < _b.name) return -1

            if (_a.name > _b.name) return 1

            return 0
        })

        let i = 0
        for (const _child of children) {
            const item = {}

            item.index = i

            item.material = new THREE.MeshBasicMaterial({
                color: 0xffffff, transparent: true
            })

            item.mesh = _child
            item.mesh.material = item.material
            this.scene.add(item.mesh)

            this.model.items.push(item)

            i++
        }
    }

    setAnimation() {
        this.animation = {}

        this.animation.colors = ['#af55cf', '#dbd85d', '#e86b24', '#b81b54']

        this.animation.play = () => {
            const buttons = []
            const outButtons = []

            for (const _button of this.model.items) {
                if (Math.random() < 0.5) {
                    buttons.push(_button)
                } else {
                    outButtons.push(_button)
                }
            }

            for (const _button of outButtons) {
                _button.material.opacity = 0
            }

            let i = 0
            for (const _button of buttons) {
                _button.material.color.set(this.animation.colors[Math.floor(Math.random() * this.animation.colors.length)])

                i++
            }
        }

        this.animation.play()
        window.setInterval(this.animation.play, 5000)
    }
}
