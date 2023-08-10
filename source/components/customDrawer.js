import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  
} from "react-native";
import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { getAuth, signOut } from "firebase/auth";
import { MyTGBContext } from "../api/contextAPI/myTgbContext";
import {ArrowBackIcon} from 'native-base';
const CustomDrawer = (props) => {
  const { currentUser } = useContext(MyTGBContext);
  const { emp_name, designation, user_id } = currentUser[0];
  const logout = async () => {
    try {
      const auth = getAuth();
      const signOutStatus = await signOut(auth);
      if (signOutStatus) {
        console.log("Signout Successfull");
      }
    } catch (error) {
      console.log("SignOut error: ".error.message);
    }
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#64befa'}}>
        <View style={{padding: 20}}>
          <Image
            source={require('../../assets/profile_pic.png')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 5}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,

              marginBottom: 10,
            }}>
            {emp_name} {'-'}
            {user_id}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',

                marginLeft: 5,
              }}>
              {designation}
            </Text>
            {/* <FontAwesome5 name="coins" size={14} color="#fff" /> */}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 5,
            paddingLeft: 5,
          }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={logout}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ArrowBackIcon style={{color: 'red'}} />
            {/* <Ionicons name="log-out-outline" size={22} /> */}
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                marginLeft: 15,
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
