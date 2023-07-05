import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { Text } from "react-native";
export function DancerAlias({ dancerPosition, squareSize, stageDimensions, dancers }) {
   const thisDancer = dancers.find((dancer) => dancer.id === dancerPosition.id);
   const position = useRef(new Animated.ValueXY({ x: squareSize * dancerPosition.position.x, y: squareSize * dancerPosition.position.y })).current;

   const coordsToPosition = (coords: { x: number; y: number }) => {
      if (!coords) return null;
      let { x, y } = coords;
      return {
         x: (squareSize * stageDimensions.width) / 2 + squareSize * x - squareSize,
         y: (squareSize * stageDimensions.height) / 2 + squareSize * -y - squareSize,
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
               height: squareSize * 2,
               //    transform: [{ translateX: -50 }, { translateY: -50 }],
               //    top: "50%",
               //    left: "50%",
               width: squareSize * 2,
               backgroundColor: hexToRGBA(thisDancer?.color || "#db2777", 0.3),
               borderRadius: 9999,
               //    display: "grid",
               //    placeItems: "center",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            },
         ]}
      >
         <View
            style={{
               // position: "absolute",
               height: squareSize * 1.5,
               //    transform: [{ translateX: -50 }, { translateY: -50 }],
               //    top: "50%",
               //    left: "50%",
               width: squareSize * 1.5,
               backgroundColor: thisDancer?.color || "#db2777",
               borderRadius: 9999,
               //    display: "grid",
               //    placeItems: "center",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}
         ></View>
         <Text
            style={{
               bottom: -squareSize / 2 - 3,
            }}
            numberOfLines={1}
            className={"text-[6px] whitespace-nowrap w-[100px] text-center absolute bottom-0  lg:text-base   text-black"}
         >
            {thisDancer?.name.split(" ")[0]}
         </Text>
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

function hexToRGBA(hex, alpha) {
   let r = parseInt(hex.slice(1, 3), 16);
   let g = parseInt(hex.slice(3, 5), 16);
   let b = parseInt(hex.slice(5, 7), 16);

   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
