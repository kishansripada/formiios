import { useEffect, useState, useCallback } from "react";
import { Alert, StyleSheet, View, Button, TextInput, Text, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { supabase, supabaseUrl } from "../lib/supabase";
import { makeRedirectUri, startAsync } from "expo-auth-session";

export default function Dashboard({ session, setPerformanceOpen }) {
   const [myDances, setMyDances] = useState([]);
   const [refreshing, setRefreshing] = useState(false);

   const fetchData = useCallback(async () => {
      setRefreshing(true);

      // Make your API call here
      // For example:
      // const response = await fetch('https://api.example.com/data');
      // const newData = await response.json();

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
         alert("Failed to sign out:", error.message);
      }
   };
   return (
      <>
         {/* <Text className="mt-12">Welcome, {session.user.user_metadata.full_name}</Text> */}
         <View className={"flex mt-16 flex-row justify-between items-center px-4 "}>
            <Text className=" font-bold text-3xl ">My performances</Text>
            <Button className="text-black " color={"#000000"} title="Sign out" onPress={handleSignOut}></Button>
         </View>
         <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
            className=" flex flex-col  w-full  h-full mt-5"
            contentContainerStyle={{
               display: "flex",
               flexDirection: "column",
            }}
            style={{ width: "100%" }}
         >
            {myDances.length ? (
               myDances
                  .sort((a, b) => new Date(b.last_edited) - new Date(a.last_edited))
                  .map((dance) => {
                     return (
                        <>
                           <TouchableOpacity
                              onPress={() => {
                                 setPerformanceOpen(dance.id);
                              }}
                              key={dance.id}
                           >
                              <View style={{ width: "100%" }} className="flex flex-col mt-5 text-gray-700 h-12  relative cursor-pointer w-full">
                                 <View style={{ width: "100%" }} className="flex flex-row px-3 lg:px-5 items-center justify-between w-full">
                                    <Text className="mt-1 font-semibold">{dance.name}</Text>
                                    <Text className=" text-xs text-gray-400">{timeSince(dance.last_edited)} ago</Text>
                                 </View>
                              </View>
                           </TouchableOpacity>
                        </>
                     );
                  })
            ) : (
               <Text>looks like you don't have any dances</Text>
            )}
         </ScrollView>
      </>
   );
}
var timeSince = function (date: string) {
   if (typeof date !== "object") {
      date = new Date(date);
   }

   var seconds = Math.floor((new Date() - date) / 1000);
   var intervalType;

   var interval = Math.floor(seconds / 31536000);
   if (interval >= 1) {
      intervalType = "year";
   } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
         intervalType = "month";
      } else {
         interval = Math.floor(seconds / 86400);
         if (interval >= 1) {
            intervalType = "day";
         } else {
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
               intervalType = "hour";
            } else {
               interval = Math.floor(seconds / 60);
               if (interval >= 1) {
                  intervalType = "minute";
               } else {
                  interval = seconds;
                  intervalType = "second";
               }
            }
         }
      }
   }

   if (interval > 1 || interval === 0) {
      intervalType += "s";
   }

   return interval + " " + intervalType;
};
