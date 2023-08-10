import "react-native-gesture-handler";
import React, { useContext } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

import {
  MyTGBProvider,
  MyTGBContext,
} from "./source/api/contextAPI/myTgbContext";
import IndexTGB from "./indexAll";

export default function App() {

  return (
    <MyTGBProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <IndexTGB />
        </NavigationContainer>
      </NativeBaseProvider>
    </MyTGBProvider>
  );
}
