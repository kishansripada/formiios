import { useState } from "react";
import { Alert, StyleSheet, View, Button, TextInput, Text } from "react-native";
import { supabase, supabaseUrl } from "../lib/supabase";
import { makeRedirectUri, startAsync } from "expo-auth-session";

export default function Auth() {
   const [loading, setLoading] = useState(false);

   async function signInWithEmail() {
      setLoading(true);

      const redirectUrl = makeRedirectUri({
         scheme: "formi",
         path: "/auth/callback",
      });

      const authResponse = await startAsync({
         authUrl: `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`,
         returnUrl: redirectUrl,
      });

      if (authResponse.type === "success") {
         supabase.auth.setSession({
            access_token: authResponse.params.access_token,
            refresh_token: authResponse.params.refresh_token,
         });
      }

      // if (error) Alert.alert(error.message);
      setLoading(false);
   }

   return (
      <View className=" my-auto  ">
         <View className="w-[200px] mx-auto  mb-5  ">
            <>
               <Text className="text-5xl font-bold z-10 relative">FORMI</Text>
               <View className="bg-pink-600 relative h-3 opacity-40 top-[-15px] mr-auto w-[100%]"></View>
            </>
         </View>

         <Button className="text-black " color={"#000000"} title="Sign in with Google" disabled={loading} onPress={() => signInWithEmail()}></Button>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      marginTop: 40,
      padding: 12,
   },
   verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: "stretch",
   },
   mt20: {
      marginTop: 20,
   },
});
