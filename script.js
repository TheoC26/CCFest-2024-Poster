const matterContainer = document.getElementById("matter-container");
const memberNumber = document.getElementById("memberNumber");

const colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"];

const size = 200;
const amount = 5;

let engine = new Matter.Engine.create();
let render = Matter.Render.create({
  element: matterContainer,
  engine: engine,
  options: {
    width: matterContainer.clientWidth,
    height: matterContainer.clientHeight,
    wireframes: false,
    background: "white",
  },
});

let ground = Matter.Bodies.rectangle(
  matterContainer.clientWidth / 2,
  matterContainer.clientHeight + 30,
  27184,
  60,
  { isStatic: true }
);
let leftWall = Matter.Bodies.rectangle(
  -30,
  matterContainer.clientHeight / 2,
  60,
  27184,
  { isStatic: true }
);
let rightWall = Matter.Bodies.rectangle(
  matterContainer.clientWidth + 30,
  matterContainer.clientHeight / 2,
  60,
  27184,
  { isStatic: true }
);

let objects = [];
for (let i = 0; i < amount; i++) {
  objects.push(
    Matter.Bodies.rectangle(
      Math.random() * matterContainer.clientWidth,
      Math.random() * matterContainer.clientHeight,
      Math.random() * size,
      Math.random() * size,
      {
        restitution: 0.8,
        render: {
          fillStyle: colors[Math.floor(Math.random() * colors.length)],
        },
      }
    )
  );
}

// do the same with circles
for (let i = 0; i < amount; i++) {
  objects.push(
    Matter.Bodies.circle(
      Math.random() * matterContainer.clientWidth,
      Math.random() * matterContainer.clientHeight,
      Math.random() * size,
      {
        restitution: 0.8,
        render: {
          fillStyle: colors[Math.floor(Math.random() * colors.length)],
        },
      }
    )
  );
}
// do the same with triangles
for (let i = 0; i < amount; i++) {
  objects.push(
    Matter.Bodies.polygon(
      Math.random() * matterContainer.clientWidth,
      Math.random() * matterContainer.clientHeight,
      3,
      Math.random() * size,
      {
        restitution: 0.8,
        render: {
          fillStyle: colors[Math.floor(Math.random() * colors.length)],
        },
      }
    )
  );
}

objects.push(
  Matter.Bodies.rectangle(
    Math.random() * matterContainer.clientWidth,
    500,
    700,
    70,
    {
      restitution: 0.8,
      render: {
        fillStyle: "transparent",
        text: {
          content: "Creative Coding Fest",
          color: "black",
          size: 72,
          family: "Arial",
        },
      },
    }
  )
);
objects.push(
  Matter.Bodies.rectangle(
    Math.random() * matterContainer.clientWidth,
    400,
    390,
    40,
    {
      restitution: 0.8,
      render: {
        fillStyle: "transparent",
        text: {
          content: "Sunday January 28th 2024",
          color: "black",
          size: 32,
          family: "Arial",
        },
      },
    }
  )
);

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: { visible: false },
  },
});
render.mouse = mouse;

Matter.World.add(engine.world, [
  ground,
  leftWall,
  rightWall,
  mouseConstraint,
  ...objects,
]);

Matter.Engine.run(engine);
Matter.Render.run(render);
