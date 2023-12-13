const matterContainer = document.getElementById("matter-container");
const memberNumber = document.getElementById("memberNumber");

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
for (let i = 0; i < 20; i++) {
  objects.push(
    Matter.Bodies.rectangle(
      Math.random() * matterContainer.clientWidth,
      Math.random() * matterContainer.clientHeight,
      Math.random() * 100,
      Math.random() * 100,
      {
        restitution: 0.8,
        // render: {
        //   fillStyle: "red",
        // },
      }
    )
  );
}

// do the same with circles
for (let i = 0; i < 20; i++) {
  objects.push(
    Matter.Bodies.circle(
      Math.random() * matterContainer.clientWidth,
      Math.random() * matterContainer.clientHeight,
      Math.random() * 100,
      {
        restitution: 0.8,
        // render: {
        //   fillStyle: "red",
        // },
      }
    )
  );
}
// do the same with triangles
for (let i = 0; i < 20; i++) {
  objects.push(
    Matter.Bodies.polygon(
      Math.random() * matterContainer.clientWidth,
      Math.random() * matterContainer.clientHeight,
      3,
      Math.random() * 100,
      {
        restitution: 0.8,
        // render: {
        //   fillStyle: "red",
        // },
      }
    )
  );
}

// objects.push(Matter.Bodies.rectangle(
//   Math.random() * matterContainer.clientWidth,
//   40,
//   800,
//   60,
//   {
//     restitution: 0.8,
//     render: {
//       fillStyle: "transparent",
//       text: {
//         content: "Creative Coding Fest",
//         color: "black",
//         size: 72,
//         family: "Arial",
//       },
//     },
//   }
// ))
// objects.push(
//   Matter.Bodies.rectangle(
//     Math.random() * matterContainer.clientWidth,
//     40,
//     260,
//     60,
//     {
//       restitution: 0.8,
//       render: {
//         fillStyle: "transparent",
//         text: {
//           content: "January 18th 2024",
//           color: "black",
//           size: 32,
//           family: "Arial",
//         },
//       },
//     }
//   )
// );

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
