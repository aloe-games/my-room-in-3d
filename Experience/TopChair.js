import * as THREE from 'three'

export default class TopChair
{
    constructor(scene, resources, world)
    {
        this.resources = resources
        this.scene = scene
        this.world = world

        this.setModel()
    }

    setModel()
    {
        this.model = {}

        this.model.group = this.resources.items.topChairModel.scene.children[0]
        this.scene.add(this.model.group)

        this.model.group.traverse((_child) =>
        {
            if(_child instanceof THREE.Mesh)
            {
                _child.material = this.world.baked.model.material
            }
        })
    }
}
