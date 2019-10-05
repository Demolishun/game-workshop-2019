class Input {
    constructor(entity, game) {
        this.game = game
        this.entity = entity
        this.bindMovement()
    }

    bind(codes = []) {
        const key = {
            codes: codes,
            isDown: false,
            isUp: true,
            press: undefined,
            release: undefined
        }

        window.addEventListener('keydown', (event) => {
            if (event.defaultPrevented) return
            if (!key.codes.includes(event.code)) return
            if (key.isUp && key.press) key.press()
            key.isDown = true
            key.isUp = false
            event.preventDefault()
        }, false)

        window.addEventListener('keyup', (event) => {
            if (event.defaultPrevented) return
            if (!key.codes.includes(event.code)) return
            if (key.isDown && key.release) key.release()
            key.isDown = false
            key.isUp = true
            event.preventDefault()
        }, false)

        //window.addEventListener('keyup', () => {}, false)

        return key
    }

    bindMovement() {
        if (this.entity.missing(['active', 'velocity'])) return

        const up = this.bind(['ArrowUp','KeyW'])
        const down = this.bind(['ArrowDown','KeyS'])
        const left = this.bind(['ArrowLeft','KeyA'])
        const right = this.bind(['ArrowRight','KeyD'])

        up.press = () => {
            this.entity.com('velocity').vx = 0
            this.entity.com('velocity').vy = -3
            // todo: set walk up animation
        }
        up.release = () => {
            if(down.isDown) return
            this.entity.com('velocity').vy = 0
        }

        down.press = () => {
            this.entity.com('velocity').vx = 0
            this.entity.com('velocity').vy = 3
            // todo: set walk down animation
        }
        down.release = () => {
            if(up.isDown) return
            this.entity.com('velocity').vy = 0
        }

        left.press = () => {
            this.entity.com('velocity').vx = -3
            this.entity.com('velocity').vy = 0
            // todo: set walk left animation
        }
        left.release = () => {
            if(right.isDown) return
            this.entity.com('velocity').vx = 0
        }

        right.press = () => {
            this.entity.com('velocity').vx = 3
            this.entity.com('velocity').vy = 0
            // todo: set walk right animation
        }
        right.release = () => {
            if(left.isDown) return
            this.entity.com('velocity').vx = 0
        }
    }
}