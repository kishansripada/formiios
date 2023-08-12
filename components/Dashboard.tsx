import { useEffect, useState, useCallback } from "react";
import { Alert, StyleSheet, View, Button, TextInput, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { supabase, supabaseUrl } from "../lib/supabase";
import { makeRedirectUri, startAsync } from "expo-auth-session";

export default function Dashboard({ session, setPerformanceOpen }) {
   const [myDances, setMyDances] = useState([]);
   const [refreshing, setRefreshing] = useState(false);

   const fetchData = useCallback(async () => {
      setRefreshing(true);

      // Simulating an API call with a timeout
      supabase
         .from("dances")
         .select("*")
         .eq("user", session.user.id)
         .then((r) => {
            setMyDances(r.data);
            setRefreshing(false);
         });
   }, []);

   useEffect(() => {
      fetchData();
   }, []);

   const handleSignOut = async () => {
      try {
         const { error } = await supabase.auth.signOut();
         if (error) throw error;
         // Optionally, you can redirect to a login screen here or handle it differently
      } catch (error) {
         // alert("Failed to sign out:", error?.message);
      }
   };

   return (
      <>
         <View style={styles.headerContainer}>
            <Text style={styles.headerText}>My performances</Text>
            <Button title="Sign out" color="#000000" onPress={handleSignOut} />
         </View>
         <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
            contentContainerStyle={styles.scrollContentContainer}
            style={styles.scrollStyle}
         >
            {myDances.length ? (
               myDances
                  .sort((a, b) => new Date(b.last_edited) - new Date(a.last_edited))
                  .map((dance) => (
                     <TouchableOpacity key={dance.id} onPress={() => setPerformanceOpen(dance.id)}>
                        <View style={styles.danceContainer}>
                           <View style={styles.danceSubContainer}>
                              <Text style={styles.danceName}>{dance.name}</Text>
                           </View>
                        </View>
                     </TouchableOpacity>
                  ))
            ) : (
               <Text>looks like you don't have any dances</Text>
            )}
         </ScrollView>
      </>
   );
}

const styles = StyleSheet.create({
   headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      marginTop: 64,
   },
   headerText: {
      fontWeight: "bold",
      fontSize: 24,
   },
   scrollContentContainer: {
      flexDirection: "column",
   },
   scrollStyle: {
      width: "100%",
      marginTop: 20,
   },
   danceContainer: {
      flexDirection: "column",
      marginTop: 20,
      height: 48,
      width: "100%",
   },
   danceSubContainer: {
      flexDirection: "row",
      paddingHorizontal: 12,
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
   },
   danceName: {
      marginTop: 4,
      fontWeight: "600",
   },
   danceTime: {
      fontSize: 10,
      color: "#7C7C7C",
   },
});
