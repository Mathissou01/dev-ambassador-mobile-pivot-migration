import { useAppSelector } from "../hooks/store";
import React from "react";
import { colors } from "@/config/styles/01-settings/_colors";
import EStyleSheet from "react-native-extended-stylesheet";
import { hexToRgbA } from "../../../utils/hexToRgbA.js";
import { Appearance, View, Dimensions } from "react-native";
import { Renderer, TextureLoader } from "expo-three";
import { AmbientLight, DirectionalLight, HemisphereLight } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Asset } from "expo-asset";

import * as ExpoTHREE from "expo-three";
import * as THREE from "three";
import { GLView } from "expo-gl";

export default function LeaderboardScene() {
  // Snow
  async function _onContextCreate(gl) {
    const materials = [];
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl; // Définition des dimensions d'affichage
    const sceneColor = 0xe5ee; // Couleur de fond de la zone

    // Création d'un "Renderer" WEBGL sans le DOM habituel avec THRE
    const renderer = new ExpoTHREE.Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor, 0); // Utilisez 0 pour rendre le fond transparent

    let camera, scene, parameters;

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0008);

    // !!
    const light = new HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);
    // !!
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    const textureLoader = new THREE.TextureLoader();

    const assignSRGB = (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
    };
    // Loading textures for snow
    const spriteTexture1 = require("../../../assets/textures/snowflake1.png");
    const spriteTexture2 = require("../../../assets/textures/snowflake2.png");
    const spriteTexture3 = require("../../../assets/textures/snowflake3.png");
    const spriteTexture4 = require("../../../assets/textures/snowflake4.png");
    const spriteTexture5 = require("../../../assets/textures/snowflake5.png");

    const sprite1 = textureLoader.load(spriteTexture1, assignSRGB);
    const sprite2 = textureLoader.load(spriteTexture2, assignSRGB);
    const sprite3 = textureLoader.load(spriteTexture3, assignSRGB);
    const sprite4 = textureLoader.load(spriteTexture4, assignSRGB);
    const sprite5 = textureLoader.load(spriteTexture5, assignSRGB);

    for (let i = 0; i < 10000; i++) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;

      vertices.push(x, y, z);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

    parameters = [
      [[1.0, 0.2, 0.5], sprite2, 20],
      [[0.95, 0.1, 0.5], sprite3, 15],
      [[0.9, 0.05, 0.5], sprite1, 10],
      [[0.85, 0, 0.5], sprite5, 8],
      [[0.8, 0, 0.5], sprite4, 5],
    ];
    // Définir des couleurs prédéfinies pour chaque particule
    const winterColors = [
      [240, 100, 50], // Bleu ancien
      [330, 90, 75], // Rose
      [200, 100, 50], // Bleu glace
      [0, 0, 100], // Blanc
      [270, 100, 50], // Violet
      [0, 0, 5], // Léger noir
      // Ajoutez d'autres couleurs d'hiver au besoin
    ];
    for (let i = 0; i < parameters.length; i++) {
      const color = winterColors[i % winterColors.length];
      const sprite = parameters[i][1];
      const size = parameters[i][2];

      materials[i] = new THREE.PointsMaterial({
        size: size,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      });
      // Utiliser la couleur hivernale correspondante
      materials[i].color.setHSL(
        color[0] / 360,
        color[1] / 100,
        color[2] / 100,
        THREE.SRGBColorSpace
      );

      const particles = new THREE.Points(geometry, materials[i]);

      particles.rotation.x = Math.random() * 6;
      particles.rotation.y = Math.random() * 6;
      particles.rotation.z = Math.random() * 6;

      scene.add(particles);
    }

    // !!
    // LOAD OBJECTS
    const asset = Asset.fromModule(require("../../../assets/models/GLB/podium.glb"));
    await asset.downloadAsync();

    let model;
    const loader = new GLTFLoader();
    loader.load(
      asset.uri,
      function (gltf) {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(200, 200, 200);
        scene.add(model);
      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error("An error happened", error);
      }
    );
    // !!
    function render() {
      const time = Date.now() * 0.00005;

      // !!
      if (model) {
        model.rotation.y += 0.01; // Adjust the rotation speed as needed
      }
      // !!
      camera.position.x += camera.position.x * 0.05;
      camera.position.y += camera.position.y * 0.05;

      camera.lookAt(scene.position);

      for (let i = 0; i < scene.children.length; i++) {
        const object = scene.children[i];

        if (object instanceof THREE.Points) {
          object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
        }
      }

      // Utilisation des couleurs hivernales prédéfinies pour chaque flocon
      for (let i = 0; i < materials.length; i++) {
        const winterColors = [
          [240, 100, 50], // Bleu ancien
          [330, 90, 75], // Rose
          [200, 100, 50], // Bleu glace
          [0, 0, 100], // Blanc
          [270, 100, 50], // Violet
          [0, 0, 5], // Léger noir
          // Ajoutez d'autres couleurs d'hiver au besoin
        ];

        const color = winterColors[i % winterColors.length];

        const h = ((360 * (color[0] + time * (i + 1))) % 360) / 360;
        materials[i].color.setHSL(
          color[0] / 360,
          color[1] / 100,
          color[2] / 100,
          THREE.SRGBColorSpace
        );
      }

      renderer.render(scene, camera);
    }

    // !!
    // Fonction de rendu
    const animate = () => {
      requestAnimationFrame(animate);
      gl.endFrameEXP();
      render();
    };
    // !!
    animate();
  }
  return (
    <View style={[styles.leaderTop, { height: (Dimensions.get("window").height * 4) / 7 }]}>
      <GLView style={{ flex: 1 }} onContextCreate={_onContextCreate} />
    </View>
  );
}
const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === "dark";
const styles = EStyleSheet.create({
  leaderTop: {
    borderBottomLeftRadius: 50,
    justifyContent: "center",
    backgroundColor: isDark ? hexToRgbA(colors.white, 0.16) : colors.gray200,
  },
});
