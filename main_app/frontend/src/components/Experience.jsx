// import React, { Suspense, useEffect, useRef, useState } from "react";
// import {
//   CameraControls,
//   ContactShadows,
//   Environment,
//   Text,
// } from "@react-three/drei";
// import { useChat } from "../hooks/useChat";
// import { Emma } from "./Emma";
// import { Alex } from "./Alex";
// import { Sam } from "./Sam";
// import { Sophie } from "./Sophie";
// import { Jordan } from "./Jordan";
// import { Olivia } from "./Olivia";

// export const Experience = () => {
//   const cameraControls = useRef();
//   const { zoomLevel } = useChat();
//   const [characterName, setCharacterName] = useState("jordan"); // Default to jordan

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const name = params.get("name");
//     if (name) {
//       const firstName = name.split(" ")[0].toLowerCase();
//       console.log("Setting character name to:", firstName);
//       setCharacterName(firstName);
//     }
//   }, []);

//   useEffect(() => {
//     if (!cameraControls.current) return;

//     const zoomPositions = {
//       0: [0, 1.5, 5, 0, 1.0, 0],
//       1: [0, 1.0, 1.5, 0, 1.0, 0],
//       2: [0, 0.8, 1.0, 0, 1.0, 0],
//       3: [0, 0.6, 0.7, 0, 1.0, 0],
//     };

//     const position = zoomPositions[zoomLevel] || zoomPositions[0];
//     cameraControls.current.setLookAt(...position, true);
//   }, [zoomLevel]);

//   const getCharacterComponent = () => {
//     switch (characterName) {
//       case "emma":
//         return <Emma position-y={-0.5} />;
//       case "alex":
//         return <Alex position-y={-0.5} />;
//       case "sam":
//         return <Sam position-y={-0.5} />;
//       case "sophie":
//         return <Sophie position-y={-0.5} />;
//       case "olivia":
//         return <Olivia position-y={-0.5} />;
//       default:
//         return <Jordan position-y={-0.5} />;
//     }
//   };

//   return (
//     <>
//       <CameraControls ref={cameraControls} />
//       <Environment preset="sunset" />
//       <Suspense fallback={null}>{getCharacterComponent()}</Suspense>
//       <ContactShadows opacity={0.7} />
//     </>
//   );
// };

import {
  CameraControls,
  ContactShadows,
  Environment,
  Text,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { Emma } from "./Emma";
import { Alex } from "./Alex";
import { Sam } from "./Sam";
import { Sophie } from "./Sophie";
import { Jordan } from "./Jordan";
import { Olivia } from "./Olivia";

const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((loadingText) => {
          if (loadingText.length > 2) {
            return ".";
          }
          return loadingText + ".";
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);
  if (!loading) return null;
  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX={"left"} anchorY={"bottom"}>
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

export const Experience = ({ characterName }) => {
  const cameraControls = useRef();
  const { zoomLevel } = useChat();

  useEffect(() => {
    // Different positions based on zoom level
    const zoomPositions = {
      0: [0, 1.5, 5, 0, 1.0, 0], // Default view
      1: [0, 1.0, 1.5, 0, 1.0, 0], // First zoom
      2: [0, 0.8, 1.0, 0, 1.0, 0], // Closer
      3: [0, 0.6, 0.7, 0, 1.0, 0], // Very close
    };

    const [px, py, pz, tx, ty, tz] = zoomPositions[zoomLevel];
    cameraControls.current.setLookAt(px, py, pz, tx, ty, tz, true);
  }, [zoomLevel]);

  const getCharacterComponent = () => {
    const avatarName = characterName.split(" ")[0];
    switch (avatarName) {
      case "jordan":
        return <Jordan position-y={-0.5} />;
      case "alex":
        return <Alex position-y={-0.5} />;
      case "sam":
        return <Sam position-y={-0.5} />;
      case "sophie":
        return <Sophie position-y={-0.5} />;
      case "olivia":
        return <Olivia position-y={-0.5} />;
      default:
        return <Emma position-y={-0.5} />;
    }
  };

  return (
    <>
      <CameraControls ref={cameraControls} />
      <Environment preset="sunset" />
      <Suspense>
        <Dots position-y={1.25} position-x={-0.02} />
      </Suspense>
      {getCharacterComponent()}
      <ContactShadows opacity={0.7} />
    </>
  );
};
