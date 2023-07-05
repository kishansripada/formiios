import { useEffect, useState, useCallback, useRef } from "react";
import { Alert, StyleSheet, View, Button, TextInput, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { supabase } from "../../lib/supabase";
import { makeRedirectUri, startAsync } from "expo-auth-session";

export function GridLines({ cloudSettings, squareSize }) {
   return (
      <>
         {new Array(cloudSettings?.stageDimensions?.width + 1 || 0).fill(0).map((_, i) => {
            return (
               <View
                  style={{
                     width:
                        i === (cloudSettings?.stageDimensions?.width || 0) || i === 0 || i % 2 === 0
                           ? 0
                           : (i - (cloudSettings?.stageDimensions?.width || 0) / 2) % cloudSettings?.gridSubdivisions === 0
                           ? 1.3 * (squareSize / 10)
                           : 0.5 * (squareSize / 10),
                  }}
                  key={i}
                  className="h-full w-[2px] bg-neutral-200"
               ></View>
            );
         })}
         <View className="h-full w-full absolute flex flex-col justify-between">
            {new Array(cloudSettings?.stageDimensions?.height + 1 || 0).fill(0).map((_, i) => {
               return (
                  <View
                     style={{
                        height:
                           i === (cloudSettings?.stageDimensions?.height || 0) || i === 0 || i % 2 === 0
                              ? 0
                              : (i - (cloudSettings?.stageDimensions?.height || 0) / 2) % cloudSettings?.gridSubdivisions === 0
                              ? 1.3 * (squareSize / 10)
                              : 0.5 * (squareSize / 10),
                     }}
                     key={i}
                     className="w-full  bg-neutral-200"
                  ></View>
               );
            })}
         </View>
      </>
   );
}
