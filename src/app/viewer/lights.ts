import { AmbientLight, DirectionalLight, Scene } from 'three';

function addLight(scene: Scene) {
  const lightColor = 0xffffff;
  const ambientLight = new AmbientLight(lightColor, 0.5);
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(lightColor, 1);
  directionalLight.position.set(0, 10, 0);
  directionalLight.target.position.set(-5, 0, 0);
  scene.add(directionalLight);
  scene.add(directionalLight.target);
}

export { addLight };
