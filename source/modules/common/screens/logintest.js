
import React, {useState, useContext} from 'react';
import {
  Center,
  Container,
  Input,
  Icon,
  Pressable,
  Button,
  VStack,
  Image,
} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {db, auth} from '../../../firebase/firebaseConfig';
import {collection, query, where, getDocs} from 'firebase/firestore';
const LoginTest = ({navigation}) => {
  const tryLogin = async () => {
    const userEmail = email + '@tgbhyd.in';
    const user = await firestore()
      .collection('users')
      // Filter results
      .where('email', '==', userEmail)
      .get();
           
//  const querySnapshot = await getDocs(q);
 console.log('Query Snapshot', user.size);
    console.log(userEmail);
    // try {
    //   const {email, password} = loginData;
    //   const userEmail = email + '@tgbhyd.in';
    //   // console.log(email);
    //   const signInSuccess = await signInWithEmailAndPassword(
    //     auth,
    //     userEmail,
    //     password,
    //   );
      // console.log(signInSuccess);
      // console.log("Sign In Success", signInSuccess._tokenResponse.email);
      // if (signInSuccess) {
      //   navigation.dispatch(
      //     StackActions.replace("Home")
      //   );
      //   // console.log("Logged In");
      // } else {
      //   // console.log("Failed");
      // }
    // } catch (error) {
    //   console.log('Error Message while Login is: ', error.message);
    // }
  };
  const handleonchangetext = (value, fieldname) => {
    // console.log(value, fieldname);
    setloginData({...loginData, [fieldname]: value});
  };
  const [show, setShow] = React.useState(false);

  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });
  const {email, password} = loginData;
  const img = require('../../../../assets/logo_final.png');
  return (
    <Center flex={1} px="3">
      <Center>
        <Container centerContent={true}>
          <VStack space="5">
            <Image
              size={200}
              borderRadius={100}
              source={require('../../../../assets/mytgbnobg.png')}
              alt="Logo2"
            />
            <Input
              value={email}
              onChangeText={value => {
                handleonchangetext(value, 'email');
              }}
              w={{
                base: '75%',
                md: '25%',
              }}
              size="2xl"
              placeholder="Username"
              variant="rounded"
              InputLeftElement={
                <Pressable onPress={() => setShow(!show)}></Pressable>
                // <Icon
                //   as={<MaterialIcons name="person" />}
                //   size={5}
                //   ml="2"
                //   color="muted.400"
                // />
              }
            />
            <Input
              value={password}
              onChangeText={value => {
                handleonchangetext(value, 'password');
              }}
              w={{
                base: '75%',
                md: '25%',
              }}
              size="2xl"
              variant="rounded"
              type={show ? 'text' : 'password'}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  {/* <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  /> */}
                </Pressable>
              }
              placeholder="Password"
            />
            <Button
              size="lg"
              variant="solid"
              colorScheme="green"
              onPress={tryLogin}>
              Login
            </Button>
          </VStack>
        </Container>
      </Center>
    </Center>
  );
};

export default LoginTest;
