import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { Performance } from "./components/Performance/Layout";
import Auth from "./components/Auth";

import Dashboard from "./components/Dashboard";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { Buffer } from "buffer";
global.Buffer = Buffer;
import * as Linking from "expo-linking";

import { Text } from "react-native";
// global.Buffer = require("buffer").Buffer;

export default function App() {
   const [session, setSession] = useState<Session | null>(null);
   const [performanceOpen, setPerformanceOpen] = useState<string | null>(null);

   useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
         setSession(session);
      });

      supabase.auth.onAuthStateChange((_event, session) => {
         setSession(session);
      });
   }, []);

   return (
      <View
         style={{
            height: "100%",
         }}
      >
         {session ? (
            <>
               {performanceOpen ? (
                  <Performance setPerformanceOpen={setPerformanceOpen} session={session} performanceOpen={performanceOpen}></Performance>
               ) : (
                  <Dashboard setPerformanceOpen={setPerformanceOpen} session={session}></Dashboard>
               )}
            </>
         ) : (
            <Auth></Auth>
         )}
      </View>
   );
}
