class Main
  constructor:->
    @vars()
    @launchAnimation()
    @animate()
  vars:->
    @path     = document.getElementById 'js-path'
    @pen      = document.getElementById 'js-pen'
    @dotPath  = document.getElementById 'js-dot'
    @pathLength = @path.getTotalLength()
    @dotLength  = @dotPath.getTotalLength()
    @dashOffset = parseInt(@path.getAttribute('stroke-dashoffset'), 10)
    @dotOffset  = parseInt(@dotPath.getAttribute('stroke-dashoffset'), 10)
    @animate    = @bind @animate, @

  launchAnimation:->
    @writeLoading()
    @interval = setInterval =>
      @writeLoading()
    , 10000

  writeLoading:->
    @dotPath.setAttribute 'stroke-dashoffset',  @dotLength
    @path.setAttribute    'stroke-dashoffset',  @pathLength
    it = @
    duration = 6000
    repeat   = 9999999
    @tween = new TWEEN.Tween({ 
        length: 0
        offset: @dashOffset
        proc: 1
      }).to({ 
        length: @pathLength
        offset: 0
        proc:  8
      }, duration)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(->
        point     = it.path.getPointAtLength(@length)
        angle = Math.abs Math.sin(@proc)*20
        angle = - angle
        attr = "translate(#{point.x},#{point.y}) rotate(#{angle})"
        it.pen.setAttribute 'transform', attr
        it.path.setAttribute 'stroke-dashoffset', @offset
      )

    duration = 400
    @moveDownTween = new TWEEN.Tween({ x: 954, y: 510, angle: -20 })
      .to({ x: 900, y: 600, angle: 0 }, duration)
      .easing(TWEEN.Easing.Sinusoidal.Out)
      .onUpdate(->
        it.pen.setAttribute 'transform', "translate(#{@x},#{@y}) rotate(#{@angle})"
      )
    
    duration = 600
    @moveUpTween = new TWEEN.Tween({ x: 900, y: 600 })
      .to({ x: 781.8336791992188, y: 305.8337097167969 }, duration)
      .easing(TWEEN.Easing.Sinusoidal.Out)
      .onUpdate(->
        it.pen.setAttribute 'transform', "translate(#{@x},#{@y})"
      )

    duration = 1000
    @dot = new TWEEN.Tween({ length: 0, offset: @dotOffset })
      .to({ length: @dotLength,offset: 0 }, duration)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(->
        point = it.dotPath.getPointAtLength(@length)
        it.pen.setAttribute 'transform', "translate(#{point.x},#{point.y})"
        it.dotPath.setAttribute 'stroke-dashoffset', @offset
      )

    duration = 800
    @moveAway = new TWEEN.Tween({ x: 780, y: 300 })
      .to({ x: 1000, y: 1300 }, duration)
      .easing(TWEEN.Easing.Sinusoidal.Out)
      .onUpdate(->
        it.pen.setAttribute 'transform', "translate(#{@x},#{@y})"
      )

    @dot.chain(@moveAway)
    @moveUpTween.chain(@dot)
    @moveDownTween.chain(@moveUpTween)
    @tween.chain(@moveDownTween).start()

  animate:->
    requestAnimationFrame(@animate)
    TWEEN.update()

  bind:(func, context) ->
    wrapper = ->
      args = Array::slice.call(arguments)
      unshiftArgs = bindArgs.concat(args)
      func.apply context, unshiftArgs
    bindArgs = Array::slice.call(arguments, 2)
    wrapper


new Main