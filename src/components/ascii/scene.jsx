import React, { useContext, useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Group, LoadingManager, MeshNormalMaterial } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { AsciiContext } from "@/components/ascii/context";
import { a, useSpring } from "@react-spring/three";
import { OrbitControls } from "@react-three/drei";
import { useGui } from "@/lib/store";

const src = "/Porsche_Carrera_GT_2003.glb";

const animationTime = 4000;

export function Scene() {
  const { setLoading } = useGui();
  const [started, setStarted] = useState(false);
  const model = useRef();
  const { set } = useContext(AsciiContext);

  const manager = new LoadingManager();
  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Started loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files.",
    );
  };

  manager.onLoad = function () {
    console.log("Loading complete!");

    setTimeout(() => {
      dissolve();
      setStarted(true);
    }, 200);

    setTimeout(() => {
      setLoading(false);
    }, animationTime + 500);
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files.",
    );
  };

  manager.onError = function (url) {
    console.log("There was an error loading " + url);
  };

  const gltfLoader = useMemo(() => {
    const loader = new GLTFLoader(manager);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);

    return loader;
  }, []);

  const gltf = useMemo(() => {
    const group = new Group();

    gltfLoader.load(src, ({ scene }) => {
      group.add(scene);
      scene.traverse((mesh) => {
        mesh.material = new MeshNormalMaterial();
      });
    });

    return group;
  }, [gltfLoader]);

  const { camera } = useThree();

  const defCamera = {
    x: 1500,
    y: 550,
    z: 1500,
  };

  camera.position.set(defCamera.x, defCamera.y, defCamera.z);

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // dark mode
    set({ greyscale: false });
  }

  function doSetTimeout(delta) {
    let charLimit = 34;
    const timer = setTimeout(() => {
      set({
        time: delta,
        charactersLimit:
          delta < 0.5 ? delta * charLimit : charLimit - delta * charLimit, //fade out
      });
    }, delta * animationTime);

    return () => clearTimeout(timer);
  }

  const dissolve = () => {
    for (let i = 0; i < 3000; i++) {
      let delta = i / 3000;
      doSetTimeout(delta);
    }
  };

  const springs = useSpring({
    scale: started ? 300 : 0,
    config: {
      duration: animationTime - 1000,
    },
  });

  useFrame((state, delta) => {
    // console.log(goal);
    model.current.rotation.y += delta * 0.7;
  });

  return (
    <a.group>
      <OrbitControls enabled={false} />

      <a.group ref={model} scale={springs.scale}>
        <primitive object={gltf} />
      </a.group>
    </a.group>
  );
}
