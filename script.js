const scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load(
  "./threejs-scroll-animation-demo/space.jpg"
);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(1, 1, 1);
// scene.add(directionalLight);

const TorusGeometry = new THREE.TorusGeometry(8.5, 2, 100, 1000);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(TorusGeometry, material);
scene.add(torus);

torus.position.z -= 50;

const MoonGeometry = new THREE.SphereGeometry(5, 64, 32, 100);
const moon = new THREE.Mesh(
  MoonGeometry,
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(
      "./threejs-scroll-animation-demo/moon.jpg"
    ),
    normalMap: new THREE.TextureLoader().load(
      "threejs-scroll-animation-demo\normal.jpg"
    ),
  })
);
scene.add(moon);

moon.position.z -= 50;
moon.position.x -= 70;
moon.rotation.x = 0;

const BoxGeometry = new THREE.BoxGeometry(10, 10, 10);
const box = new THREE.Mesh(
  BoxGeometry,
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("boxMap.jpg"),
  })
);
scene.add(box);

box.position.z -= 50;
box.position.x += 50;

box.rotation.z += 22;

const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(0, 0, -0);

scene.add(pointLight2);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 64, 64);
  const material = new THREE.MeshStandardMaterial({ color: "white" });

  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.z = -50;
  mesh.position.x = Math.random() * 140 - 70;
  mesh.position.y = Math.random() * 100 - 50;
  scene.add(mesh);
}
let scroll;

function move() {
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  box.rotation.y += 0.01;
  box.rotation.z += 0.01;

  scroll = document.body.getBoundingClientRect().top;

  camera.position.z = scroll * -0.001;
  camera.position.x = scroll * -0.0001;
  camera.rotation.y = scroll * -0.0001;
}

torus.rotation.x -= 10;
torus.rotation.y += 60;
torus.position.x -= 40;
torus.position.y -= 20;

box.position.x -= 70;
document.body.onscroll = move;
function update() {
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;
  renderer.render(scene, camera);

  moon.rotation.y += 0.1;

  requestAnimationFrame(update);
}

update();
