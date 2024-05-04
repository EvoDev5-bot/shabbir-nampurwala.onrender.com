let engine = Matter.Engine.create();

let timeout;

let colors = [
  "purple",
  "yellow",
  "orange",
  "skyblue",
  "lime",
  "pink",
  "cyan",
  "magenta",
  "teal",
  "indigo",
  "silver",
  "gold",
];

let canUsePowerUpAgain = true;

let twoBalls = false;

let shouldPowerUpImageGoThorugh = false;

// engine.gravity.scale = 0;

// engine.world.gravity.scale = 0.001;

let render = Matter.Render.create({
  element: document.querySelector("body"),
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
  },
});

let body;
let ctx = render.canvas.getContext("2d");

ctx.font = "20px Times New Roman";
ctx.fillStyle = "skyblue";

ctx.fillText("Lives:3", 20, 20);
ctx.fill();

let ball = Matter.Bodies.circle(400, 500, 20, {
  restitution: 1,
  frictionAir: 0,
  friction: 0,
  slop: 0,
  inertia: Infinity,
  render: {
    fillStyle: "#efefef",
    strokeStyle: "lime",
    lineWidth: 10,
  },
});

Matter.Body.applyForce(
  ball,
  {
    x: ball.position.x,
    y: ball.position.y,
  },
  {
    x: 0.01,
    y: 0,
  }
);

let ballTwo = Matter.Bodies.circle(800, 500, 20, {
  restitution: 1,
  frictionAir: 0,
  friction: 0,
  slop: 0,
  inertia: Infinity,
  render: {
    fillStyle: "#efefef",
    strokeStyle: "red",
    lineWidth: 10,
  },
});

Matter.Body.applyForce(
  ballTwo,
  {
    x: ballTwo.position.x,
    y: ballTwo.position.y,
  },
  {
    x: 0.01,
    y: 0.03,
  }
);

let pad = Matter.Bodies.rectangle(200, window.innerHeight - 100, 500, 10, {
  isStatic: true,
  restitution: 1,
  friction: 0,
  render: {
    fillStyle: "skyblue",
  },
});

let powerUpImage = new Image();
powerUpImage.src = `Untitled.png`;

powerUpImage.onload = function () {
  console.log("onload");

  body = Matter.Bodies.rectangle(200, -200, 20, 20, {
    friction: 0,
    frictionAir: 0,
    restitution: 1,
    render: {
      sprite: {
        texture: "Untitled.png",
      },
    },
  });
  console.log(body.position);
  Matter.World.add(engine.world, body);

  var interval = setInterval(function () {
    if (canUsePowerUpAgain) {
      var i = Math.floor(Math.random() * 5);
      console.log(i);
      if (i === 0) {
        switch (Math.floor(Math.random() * 3)) {
          case 0:
            body.render.sprite.texture = "Untitled.png";
            break;
          case 1:
            body.render.sprite.texture = "Untitled2.png";
            break;
          case 2:
            body.render.sprite.texture = "Untitled3.png";
            break;
        }
        Matter.Body.applyForce(
          body,
          {
            x: body.position.x,
            y: body.position.y,
          },
          {
            x: 0,
            y: 0.01,
          }
        );
        canUsePowerUpAgain = false;
        shouldPowerUpImageGoThorugh = true;
      }
    }
  }, 1000);

  console.log("1: " + body.velocity);
  Object.defineProperty(window, body, {
    set: function (newValue) {
      console.log("Variable changed to:", newValue);
    },
  });
};

Matter.Events.on(engine, "collisionStart", function (e) {});

let leftBorder = Matter.Bodies.rectangle(0, 0, 20, window.innerHeight * 2, {
  isStatic: true,
  restitution: 1,
  friction: 0,
  render: {
    fillStyle: "blue",
  },
});

let topBorder = Matter.Bodies.rectangle(0, 0, window.innerWidth * 2, 20, {
  isStatic: true,
  restitution: 1,
  friction: 0,
  render: {
    fillStyle: "blue",
  },
});

let bottomBorder = Matter.Bodies.rectangle(
  0,
  window.innerHeight,
  window.innerWidth * 2,
  20,
  {
    isStatic: true,
    restitution: 1,
    friction: 0,
    render: {
      fillStyle: "blue",
    },
  }
);

let rightBorder = Matter.Bodies.rectangle(
  window.innerWidth,
  0,
  20,
  window.innerHeight * 2,
  {
    isStatic: true,
    restitution: 1,
    friction: 0,
    render: {
      fillStyle: "blue",
    },
  }
);

let bricksStack = Matter.Composites.stack(
  200,
  200,
  12,
  4,
  30,
  30,
  function (x, y) {
    return Matter.Bodies.rectangle(x, y, 100, 30, {
      isStatic: true,
      restitution: 1,
      friction: 0,
      render: {
        fillStyle: colors[Math.floor(Math.random() * colors.length)],
      },
    });
  }
);

document.addEventListener("mousemove", function (event) {
  Matter.Body.setPosition(pad, {
    x: event.clientX,
    y: pad.position.y,
  });
});

Matter.Events.on(engine, "collisionStart", function (e) {
  e.pairs.forEach((pair) => {
    if (
      (pair.bodyA === pad && pair.bodyB === ball) ||
      (pair.bodyA === ball && pair.bodyB === pad)
    ) {
      engine.gravity.scale = 0;
      Matter.Body.setVelocity(ball, {
        x: ball.velocity.x,
        y: ball.velocity.y,
      });
    }
  });
});

Matter.Events.on(engine, "collisionStart", function (e) {
  e.pairs.forEach((pair) => {
    if (
      (pair.bodyA === body && pair.bodyB === topBorder) ||
      (pair.bodyA === topBorder && pair.bodyB === body)
    ) {
      if (shouldPowerUpImageGoThorugh) {
        pair.isActive = false;
      }
    }

    if (
      (pair.bodyA === body && pair.bodyB === bottomBorder) ||
      (pair.bodyA === bottomBorder && pair.bodyB === body)
    ) {
      pair.isActive = false;
    }

    bricksStack.bodies.forEach((brick) => {
      if (
        (pair.bodyA === brick || pair.bodyB === brick) &&
        (pair.bodyA === body || pair.bodyB === body)
      ) {
        pair.isActive = false;
      }
    });
  });
});

Matter.Events.on(engine, "collisionStart", function (e) {
  e.pairs.forEach((pair) => {
    if (pair.bodyA === bottomBorder || pair.bodyB === bottomBorder) {
      if (pair.bodyA === ball || pair.bodyB === ball) {
        if (twoBalls) {
          Matter.Composite.remove(engine.world, ball);
          twoBalls = false;
        } else {
          location.reload();
        }
      }

      if (pair.bodyA === ballTwo || pair.bodyB === ballTwo) {
        if (twoBalls) {
          Matter.Composite.remove(engine.world, ballTwo);
          twoBalls = false;
          Matter.World.add(engine.world, body);
          resetPowerUpTexture();
        } else {
          location.reload();
        }
      }
    }
  });
});

Matter.Events.on(engine, "collisionStart", function (e) {
  e.pairs.forEach((pair) => {
    if (
      (pair.bodyA === body && pair.bodyB === pad) ||
      (pair.bodyB === body && pair.bodyA === pad)
    ) {
      if (body.render.sprite.texture == "Untitled.png") {
        twoBalls = true;
        Matter.Composite.remove(engine.world, body);
        Matter.World.add(engine.world, ballTwo);
      } else if (body.render.sprite.texture == "Untitled2.png") {
        Matter.Composite.remove(engine.world, [body, pad]);
        pad = Matter.Bodies.rectangle(200, window.innerHeight - 100, 1000, 10, {
          isStatic: true,
          restitution: 1,
          friction: 0,
          render: {
            fillStyle: "skyblue",
          },
        });
        Matter.World.add(engine.world, pad);

        timeout = setTimeout(() => {
          Matter.Composite.remove(engine.world, pad);
          pad = Matter.Bodies.rectangle(
            200,
            window.innerHeight - 100,
            500,
            10,
            {
              isStatic: true,
              restitution: 1,
              friction: 0,
              render: {
                fillStyle: "skyblue",
              },
            }
          );
          Matter.World.add(engine.world, pad);
          resetPowerUpTexture();
        }, 5000);
      } else {
        Matter.Composite.remove(engine.world, [body, pad]);
        pad = Matter.Bodies.rectangle(200, window.innerHeight - 100, 250, 10, {
          isStatic: true,
          restitution: 1,
          friction: 0,
          render: {
            fillStyle: "skyblue",
          },
        });
        Matter.World.add(engine.world, pad);

        timeout = setTimeout(() => {
          Matter.Composite.remove(engine.world, pad);
          pad = Matter.Bodies.rectangle(
            200,
            window.innerHeight - 100,
            500,
            10,
            {
              isStatic: true,
              restitution: 1,
              friction: 0,
              render: {
                fillStyle: "skyblue",
              },
            }
          );
          Matter.World.add(engine.world, pad);
          Matter.Body.setPosition(body, {
            y: -100,
            x: Math.random() * window.innerWidth,
          });
          resetPowerUpTexture();
        }, 5000);
      }
    }
  });
});

Matter.World.add(engine.world, [
  pad,
  ball,
  leftBorder,
  topBorder,
  rightBorder,
  bottomBorder,
  bricksStack,
]);

Matter.Events.on(engine, "collisionStart", function (e) {
  e.pairs.forEach((pair) => {
    bricksStack.bodies.forEach((brick) => {
      if (
        (pair.bodyA === brick || pair.bodyB === brick) &&
        (pair.bodyA === ball ||
          pair.bodyB === ball ||
          pair.bodyA === ballTwo ||
          pair.bodyB === ballTwo)
      ) {
        Matter.Composite.remove(bricksStack, brick);
      }
    });
  });
});

Matter.Events.on(engine, "collisionStart", function (e) {
  e.pairs.forEach((pair) => {
    bricksStack.bodies.forEach((brick) => {
      if (pair.bodyA === body || pair.bodyB === body) {
        if (
          pair.bodyA === ball ||
          pair.bodyB === ball ||
          pair.bodyA === ballTwo ||
          pair.bodyB === ballTwo
        ) {
          pair.isActive = false;
        }
      }
    });
    if (pair.bodyA === bottomBorder || pair.bodyB === bottomBorder) {
      shouldPowerUpImageGoThorugh = false;
      resetPowerUpTexture();
    }
  });
});

function resetPowerUpTexture() {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      body.render.sprite.texture = "Untitled.png";
      break;
    case 1:
      body.render.sprite.texture = "Untitled2.png";
      break;
    case 2:
      body.render.sprite.texture = "Untitled3.png";
      break;
  }
  Matter.Body.setPosition(body, {
    x: s.random(1, render.canvas.width, true),
    y: -100,
  });
  // Matter.Body.setAngularVelocity(body, { x: 0, y: 0 });

  console.log(body.velocity);
  console.log("resetPowerUpTexture()");
  console.log(body.velocity);
  canUsePowerUpAgain = true;

  Matter.World.add(engine.world, body);

  setTimeout(function () {
    Matter.Body.setVelocity(body, { x: 0, y: 0 });
  }, 5);
}

Matter.Runner.run(engine);
Matter.Render.run(render);
