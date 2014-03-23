class Main
  constructor:->
    @vars()
    @launchAnimation()
    @animate()
  vars:->
    @path = document.getElementById 'js-path'
    @pen = document.getElementById 'js-pen'
    @pathLength = @path.getTotalLength()
    @dashOffset = parseInt(@path.getAttribute('stroke-dashoffset'), 10)
    console.log @pathLength
    @animate = @bind @animate, @

  launchAnimation:->
    it = @
    duration = 6000
    repeat   = 9999999
    @tween = new TWEEN.Tween({ length: 0 })
      .to({ length: @pathLength }, duration)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(->
        point = it.path.getPointAtLength(@length)
        it.pen.setAttribute 'transform', "translate(#{point.x},#{point.y})"
      ).repeat(repeat).start()

    @strokeTween = new TWEEN.Tween({ offset: @dashOffset })
      .to({ offset: 0 }, duration)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onUpdate(->
        it.path.setAttribute 'stroke-dashoffset', @offset
      ).repeat(repeat).start()


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