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
      this.dotPath = document.getElementById('js-dot');
      this.pathLength = this.path.getTotalLength();
      this.dotLength = this.dotPath.getTotalLength();
      this.dashOffset = parseInt(this.path.getAttribute('stroke-dashoffset'), 10);
      this.dotOffset = parseInt(this.dotPath.getAttribute('stroke-dashoffset'), 10);
      return this.animate = this.bind(this.animate, this);
    };

    Main.prototype.launchAnimation = function() {
      this.writeLoading();
      return this.interval = setInterval((function(_this) {
        return function() {
          return _this.writeLoading();
        };
      })(this), 11000);
    };

    Main.prototype.writeLoading = function() {
      var duration, it, repeat;
      this.dotPath.setAttribute('stroke-dashoffset', this.dotLength);
      this.path.setAttribute('stroke-dashoffset', this.pathLength);
      it = this;
      duration = 6000;
      repeat = 9999999;
      this.tween = new TWEEN.Tween({
        length: 0,
        offset: this.dashOffset,
        proc: 1
      }).to({
        length: this.pathLength,
        offset: 0,
        proc: 8
      }, duration).easing(TWEEN.Easing.Sinusoidal.InOut).onUpdate(function() {
        var angle, attr, point;
        point = it.path.getPointAtLength(this.length);
        angle = Math.abs(Math.sin(this.proc) * 20);
        angle = -angle;
        attr = "translate(" + point.x + "," + point.y + ") rotate(" + angle + ")";
        it.pen.setAttribute('transform', attr);
        return it.path.setAttribute('stroke-dashoffset', this.offset);
      });
      duration = 400;
      this.moveDownTween = new TWEEN.Tween({
        x: 954,
        y: 510,
        angle: -20
      }).to({
        x: 900,
        y: 600,
        angle: 0
      }, duration).easing(TWEEN.Easing.Sinusoidal.Out).onUpdate(function() {
        var attr;
        attr = "translate(" + this.x + "," + this.y + ") rotate(" + this.angle + ")";
        return it.pen.setAttribute('transform', attr);
      });
      duration = 600;
      this.moveUpTween = new TWEEN.Tween({
        x: 900,
        y: 600
      }).to({
        x: 781.8336791992188,
        y: 305.8337097167969
      }, duration).easing(TWEEN.Easing.Sinusoidal.Out).onUpdate(function() {
        return it.pen.setAttribute('transform', "translate(" + this.x + "," + this.y + ")");
      });
      duration = 1000;
      this.dot = new TWEEN.Tween({
        length: 0,
        offset: this.dotOffset
      }).to({
        length: this.dotLength,
        offset: 0
      }, duration).easing(TWEEN.Easing.Sinusoidal.InOut).onUpdate(function() {
        var point;
        point = it.dotPath.getPointAtLength(this.length);
        it.pen.setAttribute('transform', "translate(" + point.x + "," + point.y + ")");
        return it.dotPath.setAttribute('stroke-dashoffset', this.offset);
      });
      duration = 800;
      this.moveAway = new TWEEN.Tween({
        x: 780,
        y: 300
      }).to({
        x: 1000,
        y: 1300
      }, duration).easing(TWEEN.Easing.Sinusoidal.Out).onUpdate(function() {
        return it.pen.setAttribute('transform', "translate(" + this.x + "," + this.y + ")");
      });
      this.dot.chain(this.moveAway);
      this.moveUpTween.chain(this.dot);
      this.moveDownTween.chain(this.moveUpTween);
      return this.tween.chain(this.moveDownTween).start();
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
