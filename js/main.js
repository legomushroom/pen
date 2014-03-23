(function() {
  var Main;

  Main = (function() {
    function Main() {
      this.vars();
      this.launchAnimation();
      this.animate();
    }

    Main.prototype.vars = function() {
      this.path = document.getElementById('js-path');
      this.pen = document.getElementById('js-pen');
      this.pathLength = this.path.getTotalLength();
      this.dashOffset = parseInt(this.path.getAttribute('stroke-dashoffset'), 10);
      console.log(this.pathLength);
      return this.animate = this.bind(this.animate, this);
    };

    Main.prototype.launchAnimation = function() {
      var duration, it, repeat;
      it = this;
      duration = 6000;
      repeat = 9999999;
      this.tween = new TWEEN.Tween({
        length: 0
      }).to({
        length: this.pathLength
      }, duration).easing(TWEEN.Easing.Sinusoidal.InOut).onUpdate(function() {
        var point;
        point = it.path.getPointAtLength(this.length);
        return it.pen.setAttribute('transform', "translate(" + point.x + "," + point.y + ")");
      }).repeat(repeat).start();
      return this.strokeTween = new TWEEN.Tween({
        offset: this.dashOffset
      }).to({
        offset: 0
      }, duration).easing(TWEEN.Easing.Sinusoidal.InOut).onUpdate(function() {
        return it.path.setAttribute('stroke-dashoffset', this.offset);
      }).repeat(repeat).start();
    };

    Main.prototype.animate = function() {
      requestAnimationFrame(this.animate);
      return TWEEN.update();
    };

    Main.prototype.bind = function(func, context) {
      var bindArgs, wrapper;
      wrapper = function() {
        var args, unshiftArgs;
        args = Array.prototype.slice.call(arguments);
        unshiftArgs = bindArgs.concat(args);
        return func.apply(context, unshiftArgs);
      };
      bindArgs = Array.prototype.slice.call(arguments, 2);
      return wrapper;
    };

    return Main;

  })();

  new Main;

}).call(this);
