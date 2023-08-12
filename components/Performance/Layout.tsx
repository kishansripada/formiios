import { useEffect, useState, useCallback, useRef } from "react";
import { Alert, StyleSheet, View, Button, TextInput, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { supabase } from "../../lib/supabase";
import { makeRedirectUri, startAsync } from "expo-auth-session";

export function Performance({ session, performanceOpen, setPerformanceOpen }) {
   const [formations, setFormations] = useState([]);
   const [dancers, setDancers] = useState([]);
   const [danceName, setDanceName] = useState<string>("");
   const [selectedFormation, setSelectedFormation] = useState<string>("");
   const [cloudSettings, setCloudSettings] = useState({});
   const [loading, setLoading] = useState(false);

   const fetchData = useCallback(async () => {
      setLoading(true);

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

   return (
      <>
         <View style={styles.container}>
            <View style={styles.header}>
               <TouchableOpacity style={styles.touchable} onPress={() => setPerformanceOpen(null)}>
                  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor">
                     <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </Svg>
               </TouchableOpacity>
               <Text style={styles.text}>{danceName}</Text>
               <Text style={[styles.text, styles.emptyText]}></Text>
            </View>
         </View>
      </>
   );
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: "column",
      width: "100%",
      height: "100%",
   },
   header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 56,
      paddingBottom: 20,
   },
   touchable: {
      flex: 1 / 4,
   },
   text: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      flex: 1 / 2,
   },
   emptyText: {
      flex: 1 / 4,
   },
});
