class Game {
  constructor(config) {
    this.showHitboxes = false

    this.entities = []

    const element = config.stage
    this.width = element.width
    this.height = element.height
    this.stage = element.getContext('2d')

    this.player = Characters.Player(32,32)
    this.entities.push(this.player)

    //console.dir()
    this.input = new Input(this.player, this)

    assets.download(() => this.loop())
  }

  loop() {
    this.entities.forEach(entity => {
      // todo: movement, animation, ...
      if (entity.has(['active','position','velocity'])) this.move(entity)
    })

    this.render()

    // suspends call if busy
    window.requestAnimationFrame(() => this.loop())
  }

  move(entity) {
    if (!entity.com('velocity').vx && !entity.com('velocity').vy) return
    // todo: collision detection

    entity.com('position').x += entity.com('velocity').vx
    entity.com('position').y += entity.com('velocity').vy
  }

  render() {
    const updates = []

    this.entities.forEach(entity  => {
      if(entity.has(['active', 'renderer'])) updates.push(entity.com('renderer'))
    })

    if (!updates.length) return

    this.stage.clearRect(0, 0, this.width, this.height)
    updates.forEach(update => update.run(this.stage))
  }
}
