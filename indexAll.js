import React,{useEffect} from "react";
import { useContext } from "react";
import { MyTGBContext } from "./source/api/contextAPI/myTgbContext";
import AppStack from "./source/navigator/appStack";
import AuthStack from "./source/navigator/authStack";


const IndexTGB = () => {
  const { currentUser } = useContext(MyTGBContext);
  const { logincheck } = useContext(MyTGBContext);
  // console.log(logincheck);
  // console.log(currentUser);
  // useEffect(() => {
  //   if (logincheck == 'logged') {
  //     console.log('logged');
  //   } else if (logincheck == 'loading') {
  //     console.log('loading');
  //   } else if (logincheck == 'notLogged') {
  //     console.log('notLogged');
  //   }
  // }, [logincheck]);
  
   return (
    <>
    {logincheck === "logged"&& currentUser != null?<AppStack /> : <AuthStack />}
    </>
  );
};

export default IndexTGB;

//  