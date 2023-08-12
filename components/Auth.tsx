import { useState } from "react";
import { Alert, StyleSheet, View, Button, TextInput, Text } from "react-native";
import { supabase, supabaseUrl } from "../lib/supabase";
import { makeRedirectUri, startAsync } from "expo-auth-session";
import * as Linking from "expo-linking";

export default function Auth() {
   const [loading, setLoading] = useState(false);

   async function signInWithEmail() {
      setLoading(true);

      // const redirectUrl = makeRedirectUri({
      //    scheme: "formi",
      //    path: "/auth/callback",
      // });

      const redirectUrl = "formi://auth/callback";

      // let redirectURL = Linking.createURL("/auth/callback");
      // console.log(redirectURL);
      // const { data, error } = await supabase.auth.signInWithOtp({
      //    email: "kishansripada@gmail.com",
      //    options: {
      //       emailRedirectTo: redirectURL,
      //    },
      // });

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
      <View style={styles.container}>
         <View style={styles.innerContainer}>
            <Text style={styles.headerText}>FORMI</Text>
         </View>

         <Button title="Sign in with Google" color="#000000" disabled={loading} onPress={signInWithEmail} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
   },
   innerContainer: {
      width: 200,
      alignSelf: "center",
      marginBottom: 20,
      alignItems: "center",
   },
   headerText: {
      fontSize: 40,
      fontWeight: "bold",
      zIndex: 10,
      position: "relative",
   },
   underline: {
      backgroundColor: "#F06292",
      height: 3,
      width: "100%",
      opacity: 0.4,
      position: "relative",
      top: -15,
   },
});
