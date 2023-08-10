import React, {useState, useContext} from 'react';
import {StackActions} from '@react-navigation/native';
import {
  Center,
  Container,
  Input,
  Icon,
  Pressable,
  Button,
  VStack,
  Image,
  useToast,
  Box,
  Alert,
  HStack,
  InfoIcon,
  
} from 'native-base';
import client from '../../../api/client';
import {firebase as db} from '../../../firebase/firebaseConfig';
import {auth} from '../../../firebase/firebaseConfig';
// import auth from '@react-native-firebase/auth';

import {signInWithEmailAndPassword} from 'firebase/auth';
import Home from './home';
import {KeyboardAvoidingView, Text} from 'react-native';
const Login = ({navigation}) => {
  const toast = useToast();
  const toastid = 'test-toast';
  const toastid2 = 'test-toast';
  const tryLogin = async () => {
    // console.log(email);
    try {
      const {email, password} = loginData;
      const userEmail = email + '@tgbhyd.in';
      // console.log(email);
      const signInSuccess = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password,
      );
      if (!toast.isActive(toastid2)) {
        toast.show({
          placement: 'top',
          id: toastid2,
          render: () => {
            return (
              <Alert maxWidth="100%" alignSelf="center" flexDirection="row">
                <VStack space={1}>
                  <HStack
                    flexShrink={1}
                    alignItems="center"
                    justifyContent="space-between">
                    <HStack space={2} flexShrink={1} alignItems="center">
                      <Alert.Icon />
                      <Text
                        fontSize="md"
                        fontWeight="medium"
                        flexShrink={1}
                        color="solid">
                        Login Successfull
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Alert>
            );
          },
        });
      }
    } catch (error) {
      let msg = error.message.split('/')[1].slice(0, 4);
      let error_msg;
      if (msg == 'inva') {
        error_msg = 'Enter a valid User ID';
      } else if (msg == 'miss') {
        error_msg = 'Enter Password';
      } else if (msg == 'user') {
        error_msg = 'User not Found';
      } else {
        error_msg = 'Invalid credential';
      }
      
      if (!toast.isActive(toastid)) {
        toast.show({
          id:toastid,
          render: () => {
            return (
              <Alert maxWidth="100%" alignSelf="center" flexDirection="row">
                <VStack space={1}>
                  <HStack
                    flexShrink={1}
                    alignItems="center"
                    justifyContent="space-between">
                    <HStack
                      space={2}
                      flexShrink={1}
                      alignItems="center"
                      justifyContent="space-between">
                      <Alert.Icon />
                      <Text
                        fontSize="md"
                        fontWeight="medium"
                        flexShrink={1}
                        color="solid">
                        {error_msg}
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Alert>
            );
          },
        });
      }
      // console.log('Error Message while Login is: ', msg);
    }
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
    <KeyboardAvoidingView style={{flex: 1}}>
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
                    <InfoIcon mr="3"/>
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
    </KeyboardAvoidingView>
  );
};

export default Login;
