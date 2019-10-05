class Entity {
    constructor() {
        this.id = (+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString()
        this._components = {}
    }

    set(component) {
        this._components[component.name] = component
        return this
    }

    com(name) {
        return this._components[name]
    }

    delete(name) {
        delete this._components[name]
    }

    has(names = []) {
        const found = []

        names.forEach(name => {
            if (this._components.hasOwnProperty(name)) found.push(name)
        })

        //console.log(found.length, names.length, found.length === names.length)

        return found.length === names.length
    }

    missing(names = []) {
        return !this.has(names)
    }

    is(name) {
        if (this.missing(['type'])) return false
        return this.com('type').value === name
    }
}
