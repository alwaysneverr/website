import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js";
import WebGL from 'https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/capabilities/WebGL.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const AMOUNT = 6;

if (WebGL.isWebGL2Available()) {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
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

  const spaceTexture = new THREE.TextureLoader().load('/assets/images/madoka/space.png');
  scene.background = spaceTexture;

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
  poster.position.z = -3;
  poster.position.x = 2;

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

  function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
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
  moveCamera();

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

    const ASPECT_RATIO = window.innerWidth / window.innerHeight;
    const WIDTH = (window.innerWidth / AMOUNT) * window.devicePixelRatio;
    const HEIGHT = (window.innerHeight / AMOUNT) * window.devicePixelRatio;

    camera.aspect = ASPECT_RATIO;
    camera.updateProjectionMatrix();

    for (let y = 0; y < AMOUNT; y++) {

      for (let x = 0; x < AMOUNT; x++) {

        const subcamera = camera.cameras[AMOUNT * y + x];

        subcamera.viewport.set(
          Math.floor(x * WIDTH),
          Math.floor(y * HEIGHT),
          Math.ceil(WIDTH),
          Math.ceil(HEIGHT));

        subcamera.aspect = ASPECT_RATIO;
        subcamera.updateProjectionMatrix();

      }

    }

    renderer.setSize(window.innerWidth, window.innerHeight);

  }

  window.addEventListener('resize', onWindowResize);

  animate();

} else {

  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById('bg').appendChild(warning);

}