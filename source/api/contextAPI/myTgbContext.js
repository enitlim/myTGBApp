import React, { createContext, useEffect, useState } from "react";
import { db, auth } from "../../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firestore from '@react-native-firebase/firestore';

const MyTGBContext = createContext();
const MyTGBProvider = ({ children }) => {
  let datadet = [];
  const [currentUser, setCurrentUser] = useState(null);
  const [logincheck, setLogincheck] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if(loading){
setLogincheck('Loading');
setCurrentUser(null);
    }
    else if (!loading && !user) {
      setLogincheck("notLogged");
       setCurrentUser(null);
    } else if (!loading && user) {
      // console.log("user", user);
      async function getAlldata(email) {
        if (email === undefined) {
          email = "";
        }
      // console.log(db);
       const user = await firestore()
         .collection('users')
         // Filter results
         .where('email', '==', email)
         .get();
        // console.log("query(collection(",db,", users), where(email, ==, ",email,"))")
        const q = query(collection(db, "users"), where("email", "==", email));
        // const querySnapshot = await getDocs(q);
         
        const data1 = await getIDDetails(user);
        // console.log("jsondata");
        // console.log(data1);
        datadet = JSON.stringify(data1);
        let jsondata = JSON.parse(datadet);
        // console.log(jsondata, "jsondata");
        setCurrentUser(jsondata);
      }
      getAlldata(user?.email);
      setLogincheck("logged");
    }
  }, [loading, user]);

  const getIDDetails = (fetchData) => {
    return new Promise((resolve, reject) => {
      try {
        // console.log("Fetch data sixe", fetchData.size);
        if (fetchData.size > 0) {
                  // console.log("jsondata");

          const det = fetchData.docs.map((details) => {
            return { ...details.data(), user_id: details.id };
          });
          Promise.all(det).then(() => {
            resolve(det);
          });
        } else {
        }
      } catch (error) {
        reject(error.message);
      }
    });
  };

  // console.log(currentUser, "Current User");
  return (
    <MyTGBContext.Provider value={{ currentUser, logincheck }}>
      {children}
    </MyTGBContext.Provider>
  );
};

export { MyTGBContext, MyTGBProvider };
