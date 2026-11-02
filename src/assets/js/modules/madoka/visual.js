import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js";
import WebGL from 'https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/capabilities/WebGL.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scroll distance the cards' depths below line up with. Scroll is mapped onto it as a percentage,
// so each card stays with its section however tall the layout makes the page.
const SCROLL_DEPTH = 22000;
// At 1920x1080, each card comes into view at the same point in the text as it did on the original layout.
// Pairs of [share of the page scrolled, camera travel], with one stop per card.
const FULL_HD_PATH = [[0, 0], [0.3392, 5900], [0.5106, 9000], [0.6103, 10870], [0.7736, 13980], [0.9057, 16450], [1, 18176]];
const FOV = 75;
// Narrower screens widen the view until they can see this much to each side of centre.
const MIN_HALF_WIDTH = Math.tan(THREE.MathUtils.degToRad(30));
const POSTER_DISTANCE = 3;
const POSTER_X = 2;
const POSTER_PORTRAIT_Y = -1.1;

if (WebGL.isWebGL2Available()) {

  const canvas = document.querySelector('#bg');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas });

  // A phone's 3x screen would cost far more than it shows
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  camera.position.setZ(30);
  camera.position.setX(-3);

  renderer.render(scene, camera);

  // Torus

  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
  const torus = new THREE.Mesh(geometry, material);

  scene.add(torus);

  // Lights

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);

  // Helpers

  // const lightHelper = new THREE.PointLightHelper(pointLight)
  // const gridHelper = new THREE.GridHelper(200, 50);
  // scene.add(lightHelper, gridHelper)

  // const controls = new OrbitControls(camera, renderer.domElement);

  /*function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
  }

  Array(200).fill().forEach(addStar);*/

  // Background

  const spaceTexture = new THREE.TextureLoader().load('/assets/images/madoka/space.png', coverBackground);
  scene.background = spaceTexture;

  // Crops the background to fill the screen, the way CSS background-size: cover does, rather than stretching it
  function coverBackground() {
    if (!spaceTexture.image) return;

    const scale = camera.aspect / (spaceTexture.image.width / spaceTexture.image.height);
    const repeatX = Math.min(scale, 1);
    const repeatY = Math.min(1 / scale, 1);

    spaceTexture.repeat.set(repeatX, repeatY);
    spaceTexture.offset.set((1 - repeatX) / 2, (1 - repeatY) / 2);
  }

  // Avatar

  // const posterTexture = new THREE.TextureLoader().load('/images/Puella Magi Madoka Magica.jpg');
  const posterTexture = new THREE.TextureLoader().load('/assets/images/madoka/Puella Magi Madoka Magica.jpg');
  const poster = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.1), new THREE.MeshBasicMaterial({ map: posterTexture }));

  const mamiTexture = new THREE.TextureLoader().load('/assets/images/madoka/Mami_Tomoe.jpg');
  const mami = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.1), new THREE.MeshBasicMaterial({ map: mamiTexture }));

  const sakuraTexture = new THREE.TextureLoader().load('/assets/images/madoka/Kyoko_Sakura.jpg');
  const sakura = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.1), new THREE.MeshBasicMaterial({ map: sakuraTexture }));

  const sayakaTexture = new THREE.TextureLoader().load('/assets/images/madoka/Sayaka_Miki.jpg');
  const sayaka = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.1), new THREE.MeshBasicMaterial({ map: sayakaTexture }));

  const homuraTexture = new THREE.TextureLoader().load('/assets/images/madoka/Homura_Akemi.jpg');
  const homura = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.1), new THREE.MeshBasicMaterial({ map: homuraTexture }));

  const madokaTexture = new THREE.TextureLoader().load('/assets/images/madoka/Madoka_Kaname.jpg');
  const madoka = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.1), new THREE.MeshBasicMaterial({ map: madokaTexture }));

  scene.add(poster);
  poster.position.z = -POSTER_DISTANCE;
  poster.position.x = POSTER_X;

  scene.add(mami);
  mami.position.z = 59;
  mami.position.x = -2.5;
  mami.rotateY(-1.8);

  scene.add(sakura);
  sakura.position.z = 90;
  sakura.position.x = -1;
  sakura.rotateY(-1.2);

  scene.add(sayaka);
  sayaka.position.z = 108.7;
  sayaka.position.x = -1.6;
  sayaka.rotateY(-4.4);

  scene.add(homura);
  homura.position.z = 139.8;
  homura.position.x = -0.5;
  homura.rotateY(-3.7);

  scene.add(madoka);
  madoka.position.z = 164.5;
  madoka.position.x = 0.5;

  // Moon

  const moonTexture = new THREE.TextureLoader().load('/assets/images/madoka/moon.jpg');
  const normalTexture = new THREE.TextureLoader().load('/assets/images/madoka/normal.jpg');

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture,
    })
  );

  scene.add(moon);

  moon.position.z = 30;
  moon.position.setX(-10);

  // Scroll Animation

  function cameraTravel(progress) {
    // Toolbars leave a maximized 1080p browser shorter than 1080, so only the width has to match exactly
    if (window.innerWidth !== 1920 || window.innerHeight > 1080) return progress * SCROLL_DEPTH;

    const clamped = THREE.MathUtils.clamp(progress, 0, 1);
    const next = FULL_HD_PATH.findIndex(([share], i) => i > 0 && share >= clamped);
    const [fromShare, fromTravel] = FULL_HD_PATH[next - 1];
    const [toShare, toTravel] = FULL_HD_PATH[next];
    return THREE.MathUtils.mapLinear(clamped, fromShare, toShare, fromTravel, toTravel);
  }

  function moveCamera() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const t = scrollable > 0 ? -cameraTravel(window.scrollY / scrollable) : 0;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    //poster.rotation.y += 0.01;
    //poster.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
  }

  document.body.onscroll = moveCamera;

  // Animation Loop

  function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    moon.rotation.x += 0.005;

    // controls.update();

    renderer.render(scene, camera);
  }

  // Windows Resize

  function onWindowResize() {

    const aspect = canvas.clientWidth / canvas.clientHeight;
    const halfHeight = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const fittedHalfHeight = Math.max(halfHeight, MIN_HALF_WIDTH / aspect);

    camera.aspect = aspect;
    camera.fov = THREE.MathUtils.radToDeg(Math.atan(fittedHalfHeight)) * 2;
    camera.updateProjectionMatrix();

    // Slide the poster in from the right until it fits on narrower screens
    const halfWidth = fittedHalfHeight * aspect;
    poster.position.x = Math.min(POSTER_X, POSTER_DISTANCE * halfWidth * 0.9 - 1);
    // On a portrait screen the title spans the width, so the poster goes below it
    poster.position.y = aspect < 1 ? POSTER_PORTRAIT_Y : 0;

    coverBackground();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    moveCamera();

  }

  window.addEventListener('resize', onWindowResize);
  onWindowResize();

  animate();

} else {

  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById('bg').appendChild(warning);

}