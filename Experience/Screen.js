import * as THREE from 'three'

import Experience from './Experience.js'

export default class Screen
{
    constructor(_mesh)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.mesh = _mesh

        this.setModel()
    }

    setModel()
    {
        this.model = {}

        // Material
        this.model.material = new THREE.MeshBasicMaterial({
            color: 'black'
        })

        // Mesh
        this.model.mesh = this.mesh
        this.model.mesh.material = this.model.material
        this.scene.add(this.model.mesh)
    }
}
