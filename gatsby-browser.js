exports.onInitialClientRender = (_, options) => {
  /*!
   * Emoji Cursor.js
   * - 90's cursors collection
   * -- https://github.com/tholman/90s-cursor-effects
   * -- https://codepen.io/tholman/full/rxJpdQ
   */

  ;(function emojiCursor() {
    var possibleEmoji = options.emoji ? options.emoji : ['🐖']
    var width = window.innerWidth
    var height = window.innerHeight
    var cursor = { x: width / 2, y: width / 2 }
    var particles = []

    function init() {
      bindEvents()
      loop()
    }

    // Bind events that are needed
    function bindEvents() {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('touchmove', onTouchMove)
      document.addEventListener('touchstart', onTouchMove)

      window.addEventListener('resize', onWindowResize)
    }

    function onWindowResize(e) {
      width = window.innerWidth
      height = window.innerHeight
    }

    let wait = false
    function onTouchMove(e) {
      if (e.touches.length > 0 && !wait) {
        for (var i = 0; i < Math.min(e.touches.length, 2); i++) {
          addParticle(
            e.touches[i].clientX,
            e.touches[i].clientY,
            possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]
          )
        }
        wait = true
        setTimeout(function() {
          wait = false
        }, 200)
      }
    }

    function onMouseMove(e) {
      cursor.x = e.pageX
      cursor.y = e.pageY

      if (!wait) {
        addParticle(
          cursor.x,
          cursor.y,
          possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]
        )
        wait = true
        setTimeout(function() {
          wait = false
        }, 200)
      }
    }

    function addParticle(x, y, character) {
      var particle = new Particle()
      particle.init(x, y, character)
      particles.push(particle)
    }

    function updateParticles() {
      // Updated
      for (var i = 0; i < particles.length; i++) {
        particles[i].update()
      }
      // Remove dead particles
      for (var i = particles.length - 1; i >= 0; i--) {
        if (particles[i].lifeSpan < 0) {
          particles[i].die()
          particles.splice(i, 1)
        }
      }
    }

    function loop() {
      requestAnimationFrame(loop)
      updateParticles()
    }

    /**
     * Particles
     */

    function Particle() {
      this.lifeSpan = 120 //ms
      this.initialStyles = {
        position: 'absolute',
        display: 'block',
        pointerEvents: 'none',
        'z-index': '10000000',
        fontSize: options.fontSize ? options.fontSize : '80px',
        'will-change': 'transform',
      }

      // Init, and set properties
      this.init = function(x, y, character) {
        this.velocity = {
          x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
          y: 1,
        }

        this.position = { x: x - 10, y: y - 20 }

        this.element = document.createElement('span')
        this.element.innerHTML = character
        applyProperties(this.element, this.initialStyles)
        this.update()

        const divEl = document.getElementById('gatsby-focus-wrapper')
        divEl.insertBefore(this.element, divEl.firstChild)
      }

      this.update = function() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.lifeSpan--

        this.element.style.transform =
          'translate3d(' +
          this.position.x +
          'px,' +
          this.position.y +
          'px,0) scale(' +
          this.lifeSpan / 120 +
          ')'
      }

      this.die = function() {
        // this.element.parentNode.removeChild(this.element)
      }
    }

    /**
     * Utils
     */

    // Applies css `properties` to an element.
    function applyProperties(target, properties) {
      for (var key in properties) {
        target.style[key] = properties[key]
      }
    }

    init()
  })()
}
