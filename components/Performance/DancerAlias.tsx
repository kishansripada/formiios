import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Text } from "react-native";
export function DancerAlias({ dancerPosition, squareSize, stageDimensions, dancers }) {
   const thisDancer = dancers.find((dancer) => dancer.id === dancerPosition.id);
   const position = useRef(new Animated.ValueXY({ x: squareSize * dancerPosition.position.x, y: squareSize * dancerPosition.position.y })).current;

   const coordsToPosition = (coords: { x: number; y: number }) => {
      if (!coords) return null;
      let { x, y } = coords;
      return {
         x: (squareSize * stageDimensions.width) / 2 + squareSize * x - squareSize / 2,
         y: (squareSize * stageDimensions.height) / 2 + squareSize * -y - squareSize / 2,
      };
   };

   useEffect(() => {
      Animated.timing(position, {
         toValue: coordsToPosition(dancerPosition.position),
         duration: 330,
         useNativeDriver: false,
      }).start();
   }, [dancerPosition, squareSize]);

   return (
      <Animated.View
         style={[
            position.getLayout(),
            {
               position: "absolute",
               height: squareSize,
               //    transform: [{ translateX: -50 }, { translateY: -50 }],
               //    top: "50%",
               //    left: "50%",
               width: squareSize,
               backgroundColor: thisDancer?.color || "#db2777",
               borderRadius: 9999,
               //    display: "grid",
               //    placeItems: "center",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            },
         ]}
      >
         <Text className={"text-[8px] lg:text-base font-bold text-white"}>{initials(thisDancer?.name)}</Text>
      </Animated.View>
   );
}

export const initials = (name: string) => {
   if (!name) return "";
   return name
      .split(" ")
      .map((name) => name[0])
      .slice(0, 3)
      .join("")
      .toUpperCase();
};
