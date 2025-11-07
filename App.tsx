import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/Context/AuthContext";
import Index from "./src/Navigation";
import React from "react";

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Index />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
