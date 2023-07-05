import { useEffect, useState, useCallback, useRef } from "react";
import { Alert, StyleSheet, View, Button, TextInput, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { supabase } from "../../lib/supabase";
import { makeRedirectUri, startAsync } from "expo-auth-session";
import { DancerAlias } from "./DancerAlias";
import { GridLines } from "./GridLines";
export function Performance({ session, performanceOpen, setPerformanceOpen }) {
   const [formations, setFormations] = useState([]);
   const [dancers, setDancers] = useState([]);
   const [danceName, setDanceName] = useState<string>("");
   const [selectedFormation, setSelectedFormation] = useState<string>("");
   const [cloudSettings, setCloudSettings] = useState({});
   const stageContainer = useRef(null);
   const stage = useRef(null);
   const [loading, setLoading] = useState(false);
   const [containerWidth, setContainerWidth] = useState(0);
   const [squareSize, setSquareSize] = useState(0);
   const fetchData = useCallback(async () => {
      setLoading(true);

      // Make your API call here
      // For example:
      // const response = await fetch('https://api.example.com/data');
      // const newData = await response.json();

      // Simulating an API call with a timeout
      supabase
         .from("dances")
         .select("*")
         .eq("id", performanceOpen)
         .single()
         .then((r) => {
            setCloudSettings(r.data.settings);
            setFormations(r.data.formations);
            setSelectedFormation(r.data.formations[0].id);
            setDancers(r.data.dancers);
            setDanceName(r.data.name);
            setLoading(false);
         });
   }, []);

   useEffect(() => {
      fetchData();
   }, []);

   const onLayout = useCallback(
      (event) => {
         const { x, y, height, width } = event.nativeEvent.layout;
         //  console.log(cloudSettings.stageDimensions.width);
         const squareSize = Math.min(width / cloudSettings?.stageDimensions?.width, height / cloudSettings?.stageDimensions?.height) - 0.25;
         setSquareSize(squareSize);
      },
      [cloudSettings]
   );
   return (
      <>
         <View className="flex flex-col w-full h-full  ">
            <View className="flex flex-row items-center justify-between px-5 pt-14 pb-5  ">
               <TouchableOpacity className="w-1/4" onPress={() => setPerformanceOpen(null)}>
                  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                     <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </Svg>
               </TouchableOpacity>
               <Text className="font-semibold text-xl w-1/2 text-center">{danceName}</Text>
               <Text className="font-semibold text-xl w-1/4"></Text>
            </View>
            {!cloudSettings?.stageDimensions?.width ? (
               <View className="flex flex-row items-center justify-center h-full w-full">
                  <Text className="text-5xl font-semibold">FORMI</Text>
               </View>
            ) : (
               <View className=" flex-1 flex flex-col justify-between h-full  ">
                  <View
                     ref={stageContainer}
                     onLayout={onLayout}
                     className=" w-full  flex-col justify-center  lg:px-5 px-1 flex-grow "
                     style={{
                        alignItems: "center",
                     }}
                  >
                     <View className=" border-2 rounded-xl border-pink-600">
                        <View
                           ref={stage}
                           style={{
                              height: squareSize * cloudSettings?.stageDimensions?.height,
                              width: squareSize * cloudSettings?.stageDimensions?.width,
                           }}
                           className="w-full  relative  rounded-xl flex  flex-row justify-between  "
                        >
                           <GridLines squareSize={squareSize} cloudSettings={cloudSettings}></GridLines>
                           {formations
                              .find((formation) => formation.id === selectedFormation)
                              ?.positions.map((dancerPosition) => {
                                 return (
                                    <DancerAlias
                                       key={dancerPosition.id}
                                       dancers={dancers}
                                       stageDimensions={cloudSettings?.stageDimensions}
                                       dancerPosition={dancerPosition}
                                       squareSize={squareSize}
                                    ></DancerAlias>
                                 );
                              })}
                        </View>
                     </View>
                  </View>

                  {/* timeline container */}
                  <View className=" mb-5  w-full h-24   max-h-24 ">
                     <ScrollView
                        contentContainerStyle={{
                           alignItems: "center",
                        }}
                        className="flex flex-row pl-4 "
                        horizontal
                        showsHorizontalScrollIndicator={false}
                     >
                        {formations.map((formation) => {
                           return (
                              <TouchableOpacity
                                 key={formation.id}
                                 onPress={() => setSelectedFormation(formation.id)}
                                 style={{
                                    opacity: selectedFormation === formation.id ? 1 : 0.5,
                                 }}
                                 className="rounded-full bg-pink-600 w-32  lg:w-44  mr-2"
                              >
                                 <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    className="text-white text-center whitespace-nowrap   px-3 py-3 lg:py-5"
                                 >
                                    {formation.name}
                                 </Text>
                              </TouchableOpacity>
                           );
                        })}
                     </ScrollView>
                  </View>
               </View>
            )}
         </View>
      </>
   );
}
