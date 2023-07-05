import React, { useRef, useState } from "react";
import { SpotLight, useDepthBuffer, SpotLightShadow } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, Plane } from "three";
import { Canvas } from "@react-three/fiber/native";
import { Grid, OrbitControls, Text } from "@react-three/drei/native";

//  import { ThreeDancer } from "./ThreeDComponents/ThreeDancer";
//  import { ThreeSetPiece } from "./ThreeDComponents/ThreeSetPiece";
// import { ThreeComment } from "./ThreeDComponents/ThreeComment";

//  const CheerLines = dynamic(() => import("./ThreeDComponents/CheerLines").then((mod) => mod.CheerLines));
//  const Path = dynamic(() => import("./ThreeDComponents/Path").then((mod) => mod.Path));
//  const StageBackground = dynamic(() => import("./ThreeDComponents/StageBackground").then((mod) => mod.StageBackground));

function Box(props) {
   const meshRef = useRef(null);
   const [hovered, setHover] = useState(false);
   const [active, setActive] = useState(false);
   useFrame((state, delta) => (meshRef.current.rotation.x += 0.01));
   return (
      <mesh
         {...props}
         ref={meshRef}
         scale={active ? 1.5 : 1}
         onClick={(event) => setActive(!active)}
         onPointerOver={(event) => setHover(true)}
         onPointerOut={(event) => setHover(false)}
      >
         <boxGeometry args={[1, 1, 1]} />
         <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
   );
}
export const ThreeD: React.FC<{
   children: React.ReactNode;
   setFormations: Function;
   selectedFormation: number | null;
   formations: formation[];
   selectedDancers: string[];
   setSelectedDancers: Function;
   setSelectedFormation: Function;
   setIsPlaying: Function;
   viewOnly: boolean;
   setPixelsPerSecond: Function;
   songDuration: number | null;
   coordsToPosition: (coords: { x: number; y: number }) => { left: number; top: number };
   draggingDancerId: string | null;
   setDraggingDancerId: Function;
   player: any;
   undo: Function;
   addToStack: Function;
   pushChange: Function;
   localSettings: localSettings;
   isCommenting: boolean;
   setIsCommenting: Function;
   zoom: number;
   setZoom: Function;
   soundCloudTrackId: string | null;
   cloudSettings: cloudSettings;
   stageFlipped: boolean;
   shiftHeld: boolean;
   setShiftHeld: Function;
   setIsThreeDancerDragging: Function;
   isThreeDancerDragging: boolean;
   isPlaying: boolean;
   currentFormationIndex: number;
   percentThroughTransition: number;
   dancers: dancer[];
   position: number;
   props: prop[];
   items: item[];
   // comments: comment[];
}> = ({
   player,
   children,
   setFormations,
   selectedFormation,
   formations,
   setSelectedDancers,
   selectedDancers,
   setSelectedFormation,
   setIsPlaying,
   viewOnly,
   setPixelsPerSecond,
   songDuration,
   cloudSettings,
   coordsToPosition,
   draggingDancerId,
   setDraggingDancerId,
   undo,
   addToStack,
   pushChange,
   localSettings,
   isCommenting,
   setIsCommenting,
   zoom,
   setZoom,
   soundCloudTrackId,
   stageFlipped,
   shiftHeld,
   setShiftHeld,
   setIsThreeDancerDragging,
   isThreeDancerDragging,
   isPlaying,
   currentFormationIndex,
   percentThroughTransition,
   dancers,
   position,
   props,
   items,
   // comments,
}) => {
   //    const { gridSnap } = localSettings;
   const { stageBackground } = cloudSettings;
   //    let planeIntersectPoint = new Vector3();
   //    const floorPlane = new Plane(new Vector3(0, 1, 0), 0);
   // const depthBuffer = useDepthBuffer({ frames: 1 });
   return (
      <Canvas>
         <ambientLight />
         <pointLight position={[10, 10, 10]} />
         <Box position={[-1.2, 0, 0]} />
         <Box position={[1.2, 0, 0]} />
      </Canvas>
   );
   return (
      <Canvas
         onPointerUp={() => {
            // if (viewOnly) return;
            // setIsThreeDancerDragging(false);
            //  setFormations((formations: formation[]) => {
            //     return formations.map((formation) => {
            //        return {
            //           ...formation,
            //           positions: formation.positions.map((position) => {
            //              return {
            //                 ...position,
            //                 position: {
            //                    x: Math.round(position.position.x * gridSnap) / gridSnap,
            //                    y: Math.round(position.position.y * gridSnap) / gridSnap,
            //                 },
            //              };
            //           }),
            //        };
            //     });
            //  });
            // pushChange();
         }}
         //  className="h-full w-full"
         gl={{ logarithmicDepthBuffer: true }}
         camera={{ position: [0, 10, 40], fov: 40, near: 0.1, far: 1000 }}
      >
         {/* {(formations[selectedFormation]?.comments || []).map((comment: comment) => {
             return (
                <ThreeComment
                   // draggingCommentId={draggingCommentId}
                   // setDraggingCommentId={setDraggingCommentId}
                   setIsThreeDancerDragging={setIsThreeDancerDragging}
                   isThreeDancerDragging={isThreeDancerDragging}
                   viewOnly={viewOnly}
                   isPlaying={isPlaying}
                   selectedFormation={selectedFormation}
                   formations={formations}
                   setFormations={setFormations}
                   comment={comment}
                ></ThreeComment>
             );
          })} */}
         {stageBackground === "cheer9" ? (
            //  <CheerLines
            //     localSettings={localSettings}
            //     stageWidth={cloudSettings.stageDimensions.width}
            //     stageHeight={cloudSettings.stageDimensions.height}
            //  />
            <></>
         ) : stageBackground === "grid" || stageBackground === "custom" ? (
            <Grid
               receiveShadow
               castShadow
               //    onPointerDown={(e) => {
               //       setSelectedDancers([]);
               //    }}
               renderOrder={-1}
               position={[0, 0, 0]}
               args={[cloudSettings.stageDimensions.width, cloudSettings.stageDimensions.height]}
               cellSize={1}
               cellThickness={0.5}
               sectionSize={8}
               sectionThickness={1.5}
               //    cellColor={`${localSettings.isDarkMode ? "white" : "black"}`}
               sectionColor={"#737373"}
            />
         ) : null}
         {/* <mesh receiveShadow castShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
             <planeBufferGeometry attach="geometry" args={[cloudSettings.stageDimensions.width, cloudSettings.stageDimensions.height]} />
             <meshStandardMaterial attach="material" color={`${localSettings.isDarkMode ? "white" : "black"}`} />
          </mesh> */}

         {/* {cloudSettings?.backgroundUrl && cloudSettings.stageBackground === "custom" ? (
             <StageBackground cloudSettings={cloudSettings} url={cloudSettings.backgroundUrl}></StageBackground>
          ) : null} */}

         {/* {props.map((prop: prop) => {
             return (
                <ThreeSetPiece
                   selectedFormation={selectedFormation}
                   isPlaying={isPlaying}
                   position={position}
                   currentFormationIndex={currentFormationIndex}
                   percentThroughTransition={percentThroughTransition}
                   prop={prop}
                   formations={formations}
                ></ThreeSetPiece>
             );
          })} */}

         {/* <color attach="background" args={["#09090b"]} /> */}
         {/* <fog attach="fog" args={["#202020", 5, 20]} /> */}
         <ambientLight intensity={0.5} />
         {/* <SpotLight
             position={[0, 20, cloudSettings.stageDimensions.height / 2]}
             color={"white"}
             castShadow
             penumbra={0}
             distance={25}
             angle={1}
             attenuation={50}
             anglePower={10}
             intensity={5}
          /> */}
         {/* <LightArray cloudSettings={cloudSettings}></LightArray> */}
         {/* <Scene /> */}
         {/* <SpotLight color={"blue"} castShadow penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} /> */}
         <directionalLight position={[0, 10, 5]} intensity={1} />
         {/* <directionalLight position={[0, 10, 0]} intensity={1} castShadow /> */}

         {/* <MovingSpot color="#0c8cbf" position={[3, 3, 2]} /> */}

         {/* <spotLight intensity={1} position={[10, 10, 10]} color="blue" /> */}
         {/* <spotLight ref={spotLightRef} args={[0xffffff, 1]} position={[0, 5, 10]} angle={0.3} penumbra={1} castShadow /> */}
         {/* {spotLightRef.current && <SpotLightHelper args={[spotLightRef.current]} />} */}

         {/* {selectedFormation !== null
             ? formations[selectedFormation].positions.map((dancerPosition: dancerPosition) => {
                  return (
                     <ThreeDancer
                        items={items}
                        setSelectedDancers={setSelectedDancers}
                        key={dancerPosition.id}
                        selectedDancers={selectedDancers}
                        setIsThreeDancerDragging={setIsThreeDancerDragging}
                        isThreeDancerDragging={isThreeDancerDragging}
                        isPlaying={isPlaying}
                        currentFormationIndex={currentFormationIndex}
                        percentThroughTransition={percentThroughTransition}
                        dancers={dancers}
                        position={position}
                        addToStack={addToStack}
                        pushChange={pushChange}
                        viewOnly={viewOnly}
                        dancerPosition={dancerPosition}
                        formations={formations}
                        setFormations={setFormations}
                        selectedFormation={selectedFormation}
                        localSettings={localSettings}
                     ></ThreeDancer>
                  );
               })
             : null} */}

         <OrbitControls
            enableDamping={false}
            // dampingFactor={0.5}
            // autoRotate
            // autoRotateSpeed={0}
            enableZoom={true}
            makeDefault
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
            // enabled={!isThreeDancerDragging}
            // minDistance={5} // Prevents the camera from going too close to the point of interest
            // maxDistance={50} //
         />
         <Text
            scale={[1, 1, 1]}
            position={[0, 0, cloudSettings.stageDimensions.height / 2 + 1]}
            rotation={[Math.PI * 1.5, 0, 0]}
            // color={`${localSettings.isDarkMode ? "white" : "black"}`}
            anchorX="center"
            // anchorY="middle"
         >
            AUDIENCE
         </Text>
         <Text
            scale={[1, 1, 1]}
            position={[0, 0, -(cloudSettings.stageDimensions.height / 2 + 1)]}
            rotation={[Math.PI * 1.5, 0, Math.PI * 1]}
            // color={`${localSettings.isDarkMode ? "white" : "black"}`}
            anchorX="center"
            // anchorY="middle"
         >
            BACKSTAGE
         </Text>
         <Text
            scale={[1, 1, 1]}
            position={[cloudSettings.stageDimensions.width / 2 + 1, 0, 0]}
            rotation={[Math.PI * 1.5, 0, Math.PI * 2.5]}
            // color={`${localSettings.isDarkMode ? "white" : "black"}`}
            anchorX="center"
            // anchorY="middle"
         >
            STAGE LEFT
         </Text>
         <Text
            scale={[1, 1, 1]}
            position={[-(cloudSettings.stageDimensions.width / 2 + 1), 0, 0]}
            rotation={[Math.PI * 1.5, 0, Math.PI * 1.5]}
            // color={`${localSettings.isDarkMode ? "white" : "black"}`}
            anchorX="center"
            // anchorY="middle"
         >
            STAGE RIGHT
         </Text>

         {/* <mesh
             rotation={[0, 0, 0]}
             position={[0, -1, 0]}
             onPointerMove={(event) => {
                // console.log(planeIntersectPoint.x, planeIntersectPoint.z);
                event.ray.intersectPlane(floorPlane, planeIntersectPoint);
                if (!isThreeDancerDragging) return;
 
                setFormations((formations: formation[]) => {
                   return formations.map((formation, i) => {
                      if (i === selectedFormation) {
                         return {
                            ...formation,
                            positions: formation.positions.map((position: dancerPosition) => {
                               if (selectedDancers.includes(position.id)) {
                                  return {
                                     ...position,
                                     position: {
                                        x: planeIntersectPoint.x,
                                        y: -planeIntersectPoint.z,
                                     },
                                  };
                               }
                               return position;
                            }),
                         };
                      }
                      return formation;
                   });
                });
             }}
          >
             <boxBufferGeometry attach="geometry" args={[100, 0.1, 100]} />
             <meshBasicMaterial attach="material" color="transparent" opacity={0} transparent />
          </mesh> */}

         {/* {selectedFormation &&
             formations[selectedFormation].positions
                .filter((position) => selectedDancers.includes(position.id))
                .map((dancerPosition: dancerPosition) => {
                   return (
                      <Path
                         dancer={dancers.find((dancer) => dancer.id === dancerPosition.id)}
                         previousPosition={formations[selectedFormation - 1]?.positions.find((position) => position.id === dancerPosition.id)}
                         dancerPosition={dancerPosition}
                      ></Path>
                   );
                })} */}
      </Canvas>
   );
};
