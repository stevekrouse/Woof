var Woof = {};

Woof.keyCodeToString = keyCode => {
  if (keyCode == 38) {
    return "UP";
  } else if (keyCode == 37) {
    return "LEFT";
  } else if (keyCode == 39) {
    return "RIGHT";
  } else if (keyCode == 40) {
    return "DOWN";
  } else {
    return String.fromCharCode(keyCode);
  }
};

Woof.unitsToMiliseconds = (time, units) => {
  if (units == "milliseconds" || units == "millisecond") {
    return time;
  } else if (units == "miliseconds" || units == "milisecond") {
    return time;
  } else if (units == "seconds" || units == "second") {
    return time * 1000;
  } else if (units == "minutes" || units == "minute") {
    return time * 1000 * 60;
  } else {
    throw Error("Unrecognized Time");
  }
};

Woof.randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Woof.repeatInstant = (times, func) => {
  for (var i = 0; i < times; i++) {
    func(i + 1);
  }
};

Woof.dayOfMonth = () => {
  var date = new Date();
  return date.getDate();
};

Woof.dayOfWeek = () => {
  var date = new Date();
  var day = date.getDay();
  if (day === 0) {
    return "Sunday";
  } else if (day == 1) {
    return "Monday";
  } else if (day == 2) {
    return "Tuesday";
  } else if (day == 3) {
    return "Wednesday";
  } else if (day == 4) {
    return "Thursday";
  } else if (day == 5) {
    return "Friday";
  } else if (day == 6) {
    return "Saturday";
  }
};

Woof.hourMilitary = () => {
  var date = new Date();
  return date.getHours();
};

Woof.hour = () => {
  var date = new Date();
  var hour = date.getHours();
  return hour <= 12 ? hour : hour - 12;
};

Woof.minute = () => {
  var date = new Date();
  return date.getMinutes();
};

Woof.second = () => {
  var date = new Date();
  return date.getSeconds();
};

Woof.RIGHT = 0;
Woof.LEFT = 180;
Woof.UP = 90;
Woof.DOWN = 270;

Woof.Project = function (canvasId, { debug = [] } = {}) {
  this.sprites = [];
  this.backdrop = undefined;
  this.debug = debug;

  try {
    this._canvas = document.getElementById(canvasId);
  } catch (e) {
    console.error(e);
    throw Error("Could not find a canvas on the page with id " + canvasId);
  }
  this._context = this._canvas.getContext("2d");
  this.height = this._canvas.height;
  this.width = this._canvas.width;
  this.minX = -this.width / 2;
  this.maxX = this.width / 2;
  this.minY = -this.height / 2;
  this.maxY = this.height / 2;

  this.addText = options => {
    var sprite = new Woof.Text(this, options);
    this.sprites.push(sprite);
    return sprite;
  };

  this.addCircle = options => {
    var sprite = new Woof.Circle(this, options);
    this.sprites.push(sprite);
    return sprite;
  };

  this.addImage = options => {
    var sprite = new Woof.Image(this, options);
    this.sprites.push(sprite);
    return sprite;
  };

  this.setBackdropURL = function (url) {
    var backdrop = new Image();
    backdrop.src = url;
    this.backdrop = backdrop;
  };

  this.stopAll = () => {
    this._render();
    window.cancelAnimationFrame(this.renderInterval);

    this._everys.forEach(clearInterval);
    this._afters.forEach(clearInterval);
    this._canvas.removeEventListener("mousedown", this._onClickHandler);

    this.sprites.forEach(sprite => sprite.delete());
  };

  this.translateToCenter = (x, y) => {
    return [x - this.maxX - this._canvas.offsetLeft, this.maxY - y + this._canvas.offsetTop];
  };

  this.mouseDown = false;
  this.mouseX = 0;
  this.mouseY = 0;
  this._canvas.addEventListener("mousedown", event => {
    this.mouseDown = true;
    [this.mouseX, this.mouseY] = this.translateToCenter(event.clientX, event.clientY);
  });
  this._canvas.addEventListener("mouseup", event => {
    this.mouseDown = false;
    [this.mouseX, this.mouseY] = this.translateToCenter(event.clientX, event.clientY);
  });
  this._canvas.addEventListener("touchstart", event => {
    this.mouseDown = true;
    [this.mouseX, this.mouseY] = this.translateToCenter(event.clientX, event.clientY);
  });
  this._canvas.addEventListener("touchend", event => {
    // for some reason touchend events are firing too quickly
    // and are not getting picked up in 40 ms every-if's
    // so this setTimeout slows things down just enouch so
    // touch events mirror mouse events
    setTimeout(() => {
      this.mouseDown = false;
    }, 0);
  });
  this._canvas.addEventListener("mousemove", event => {
    [this.mouseX, this.mouseY] = this.translateToCenter(event.clientX, event.clientY);
  });
  this._canvas.addEventListener("touchmove", event => {
    [this.mouseX, this.mouseY] = this.translateToCenter(event.targetTouches[0].clientX, event.targetTouches[0].clientY);
    event.preventDefault();
  });

  this.keysDown = [];
  document.body.addEventListener("keydown", event => {
    var key = Woof.keyCodeToString(event.keyCode);
    if (!this.keysDown.includes(key)) {
      this.keysDown.push(key);
    }
  });
  document.body.addEventListener("keyup", event => {
    var key = Woof.keyCodeToString(event.keyCode);
    if (this.keysDown.includes(key)) {
      this.keysDown.splice(this.keysDown.indexOf(key), 1);
    }
  });

  this._everys = [];
  this.every = (time, units, func) => {
    func();
    this._everys.push(setInterval(func, Woof.unitsToMiliseconds(time, units)));
  };

  this._afters = [];
  this.after = (time, units, func) => {
    this._afters.push(setTimeout(func, Woof.unitsToMiliseconds(time, units)));
  };

  this._onClicks = [];
  this.onClick = func => {
    this._onClicks.push(func);
  };
  this._onClickHandler = event => {
    var [mouseX, mouseY] = this.translateToCenter(event.clientX, event.clientY);
    this._onClicks.forEach(func => {
      func(mouseX, mouseY);
    });
  };
  this._canvas.addEventListener("mousedown", this._onClickHandler);

  this.debugText = [];
  for (var i = 0; i < this.debug.length; i++) {
    this.debugText.push(this.addText({ x: this.minX, y: this.minY + 12 * (i + 1), textAlign: "left" }));
  }

  this._updateDebug = () => {
    for (var i = 0; i < this.debug.length; i++) {
      var expr = this.debug[i];
      var value;
      try {
        value = eval(expr);
      } catch (e) {
        value = e;
      }
      this.debugText[i].text = `${ expr }: ${ value }`;
    }
  };

  this._renderBackdrop = function () {
    if (this.backdrop) {
      this._context.drawImage(this.backdrop, 0, 0);
    }
  };

  this._renderSprites = () => {
    this.sprites.forEach(sprite => {
      sprite._render(this);
    });
  };

  this._render = () => {
    this.renderInterval = window.requestAnimationFrame(this._render);
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._renderBackdrop();
    this._renderSprites();
    this._updateDebug();
  };
  this._render();
};

Woof.Sprite = function (project, { x = 0, y = 0, angle = 0, rotationStyle = "ROTATE", showing = true } = {}) {
  this.project = project;
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.rotationStyle = rotationStyle;
  this.showing = showing;

  this._render = function () {
    if (this.showing) {
      this.project._context.save();
      this.project._context.translate(this.canvasX(), this.canvasY());
      if (this.rotationStyle == "ROTATE") {
        var radians = this.radians();
      } else if (this.rotationStyle == "NO ROTATE") {
        var radians = 0;
      } else if (this.rotationStyle == "ROTATE LEFT RIGHT") {
        var radians = this.radians();
        if (this.angle >= 180 && this.angle < 360) {
          this.project._context.rotate(this.radians());
          this.project._context.translate(this.width, 0);
          this.project._context.scale(-1, 1);
        }
      }
      this.project._context.rotate(radians);

      if (this instanceof Woof.Image) {
        this.imageRender();
      } else if (this instanceof Woof.Text) {
        this.textRender();
      } else if (this instanceof Woof.Circle) {
        this.circleRender();
      }
      this.project._context.restore();
    }
  };

  this.distanceTo = function distanceTo(xGiven, yGiven) {
    if (arguments.length === 1) {
      var x = this.x - xGiven.x;
      var y = this.y - xGiven.y;
      return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
    if (arguments.length === 2) {
      var x = this.x - xGiven;
      var y = this.y - yGiven;
      return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
  };

  this.move = function (steps) {
    this.x += steps * Math.cos(this.radians());
    this.y += steps * Math.sin(this.radians());
  };

  this.setRotationStyle = style => {
    if (style == "ROTATE") {
      this.rotationStyle = "ROTATE";
    } else if (style == "NO ROTATE") {
      this.rotationStyle = "NO ROTATE";
    } else if (style == "ROTATE LEFT RIGHT") {
      this.rotationStyle = "ROTATE LEFT RIGHT";
    } else {
      throw Error("Unrecognized rotation style: " + style);
    }
  };

  this.radians = () => {
    return this.angle * Math.PI / 180;
  };

  this.canvasX = () => {
    return this.x + this.project.maxX;
  };

  this.canvasY = () => {
    return this.project.maxY - this.y;
  };

  this.bounds = () => {
    // TODO account for rotation
    var halfWidth = this.width() / 2;
    var halfHeight = this.height() / 2;

    var left = this.x - halfWidth;
    var right = this.x + halfWidth;
    var bottom = this.y - halfHeight;
    var top = this.y + halfHeight;
    return { left: left, right: right, top: top, bottom: bottom };
  };

  this.touching = sprite => {
    var r1 = this.bounds();
    var r2 = sprite.bounds();
    return !(r2.left > r1.right || r2.right < r1.left || r2.top < r1.bottom || r2.bottom > r1.top);
  };

  this.over = (x, y) => {
    var r1 = this.bounds();
    var belowTop = y <= r1.top;
    var aboveBottom = y >= r1.bottom;
    var rightLeft = x >= r1.left;
    var leftRight = x <= r1.right;
    return belowTop && aboveBottom && rightLeft && leftRight;
  };

  this.mouseOver = function () {
    return this.over(this.project.mouseX, this.project.mouseY);
  };

  this.sendToBack = () => {
    var sprites = this.project.sprites;
    sprites.splice(0, 0, sprites.splice(sprites.indexOf(this), 1)[0]);
  };

  this.sendToFront = () => {
    var sprites = this.project.sprites;
    sprites.splice(sprites.length, 0, sprites.splice(sprites.indexOf(this), 1)[0]);
  };

  this.pointTowards = (x2, y2) => {
    this.angle = Math.atan2(y2 - this.y, x2 - this.x) * 180 / Math.PI;
  };

  this.height = () => {
    throw Error("Implemented in subclass");
  };

  this.width = () => {
    throw Error("Implemented in subclass");
  };

  this._onClicks = [];
  this.onClick = func => {
    this._onClicks.push(func);
  };
  this._onClickHandler = event => {
    var [mouseX, mouseY] = this.project.translateToCenter(event.clientX, event.clientY);
    if (this.showing && this.over(mouseX, mouseY)) {
      this._onClicks.forEach(func => {
        func(mouseX, mouseY);
      });
    }
  };
  this.project._canvas.addEventListener("mousedown", this._onClickHandler);

  this.delete = () => {
    if (this.project.sprites.includes(this)) {
      this.project.sprites.splice(this.project.sprites.indexOf(this), 1);
      this.project._canvas.removeEventListener("mousedown", this._onClickHandler);
    }
  };
};

Woof.Text = function (project, { text = "Text", size = 12, color = "black", fontFamily = "arial", textAlign = "center" } = {}) {
  Woof.Sprite.call(this, project, arguments[1]);
  this.text = text;
  this.size = size;
  this.color = color;
  this.fontFamily = fontFamily;
  this.textAlign = textAlign;

  this.width = () => {
    var width;
    this._applyInContext(() => {
      width = this.project._context.measureText(this.text).width;
    });
    return width;
  };

  this.height = () => {
    var height;
    this._applyInContext(() => {
      height = this.project._context.measureText("M").width;
    });
    return height;
  };

  this._applyInContext = func => {
    this.project._context.save();

    this.project._context.font = this.size + "px " + this.fontFamily;
    this.project._context.fillStyle = this.color;
    this.project._context.textAlign = this.textAlign;

    func();

    this.project._context.restore();
  };

  this.textRender = () => {
    this._applyInContext(() => {
      this.project._context.fillText(this.text, 0, 0);
    });
  };
};

Woof.Circle = function (project, { radius = 10, color = "black" } = {}) {
  Woof.Sprite.call(this, project, arguments[1]);
  this.radius = radius;
  this.color = color;

  this.width = () => {
    return 2 * this.radius;
  };

  this.height = () => {
    return 2 * this.radius;
  };

  this.circleRender = () => {
    this.project._context.beginPath();
    this.project._context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.project._context.fillStyle = this.color;
    this.project._context.fill();
  };
};

Woof.Image = function (project, { url = "http://www.loveyourdog.com/image3.gif", imageHeight, imageWidth } = {}) {
  Woof.Sprite.call(this, project, arguments[1]);
  this.images = [];
  this.image = 0;
  this.imageHeight = imageHeight;
  this.imageWidth = imageWidth;

  this.addImageURL = function (url) {
    var image = new Image();
    image.src = url;
    this.images.push(image);
    return this.images.length - 1;
  };
  if (url) {
    this.addImageURL(url);
  }
  this.width = () => {
    return this.imageWidth || this.currentImage().width;
  };

  this.height = () => {
    return this.imageHeight || this.currentImage().height;
  };

  this.currentImage = () => {
    return this.images[this.image];
  };

  this.imageRender = () => {
    this.project._context.drawImage(this.currentImage(), -this.width() / 2, -this.height() / 2, this.width(), this.height());
  };
};
