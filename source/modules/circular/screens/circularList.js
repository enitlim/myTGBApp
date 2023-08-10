import {
  View,
  Text,
  Dimensions,
  Touchable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  Center,
  Avatar,
  Pressable,
  StatusBar,
  Heading,
  Input,
  Icon,
  Skeleton,
  Button
} from 'native-base';
import Pdf from 'react-native-pdf';

import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native';

const AllCir = props => {
  return (
    <Box pb="3">
      <HStack space="3" alignItems="center">
        <Box pl="5" width={(props.width)/1.3}>
          <Text style={{color:"#323130", fontSize:15}}>{props.name}</Text>
          <Text style={{color:"#323130", fontSize:15}}>{props.dateofissue}</Text>
        </Box>
        <Button
        margin={3}
          colorScheme="primary"
          onPress={() => props.viewCiccular(props.url)}>
          View
        </Button>
      </HStack>
    </Box>
  );
};
const CircularList = ({navigation, route}) => {
  const [loadStatus, useLoadStatus]=useState(true)
  console.log(loadStatus);
   const [screenwidth, setWidth] = useState(null);
   const [screenheight, setHeight] = useState(null);
   useEffect(() => {
     setWidth(Dimensions.get('window').width);
     setHeight(Dimensions.get('window').height);
   }, [screenwidth, screenheight]);
  const [circular, setCircular] = useState([]);
  useEffect(() => {
    const dept = route.params.dept;
    const fy = route.params.fy;
    const date = new Date().toJSON().slice(0,10).split('-');
    const today= new Date().toJSON().slice(0,10);
    if (dept == 'Today') {
       let cirDet = [];
       const getCircular = async () => {
         const snapshot = await firestore()
           .collection('Circular')
           .where('date_of_issue', '==', today)
           .get();
         snapshot.forEach(data => {
           cirDet.push(data.data());
         });
         setCircular(cirDet);
         useLoadStatus(false)
       };
      // console.log(dept);
      // console.log(date[2]);
      getCircular();
    } else if (dept == 'This Month') {
       let cirDet = [];
       const getCircular = async () => {
         const snapshot = await firestore()
           .collection('Circular')
           .where('month', '==', date[1])
           .get();
         snapshot.forEach(data => {
           cirDet.push(data.data());
         });
         setCircular(cirDet);
         useLoadStatus(false)
       };
      // console.log(dept);
      // console.log(date[1]);
      getCircular();
    } else if (dept == 'This Year') {
       let cirDet = [];
       const getCircular = async () => {
         const snapshot = await firestore()
           .collection('Circular')
           .where('year', '==', date[0])
           .get();
         snapshot.forEach(data => {
           cirDet.push(data.data());
         });
         setCircular(cirDet);
         useLoadStatus(false)
       };
      // console.log(dept);
      // console.log(date[0]);
      getCircular();
    } else if (dept == 'View All') {
      console.log(dept);
    } else if (dept == 'Favourite') {
      console.log(dept);
    } else {
       let cirDet = [];
       const getCircular = async () => {
         const snapshot = await firestore()
           .collection('Circular')
           .where('dept', '==', dept)
           .where('fy', '==', fy)
           .get();
         snapshot.forEach(data => {
           cirDet.push(data.data());
         });
         setCircular(cirDet);
         useLoadStatus(false)
       };
       getCircular();
    }

    
  }, []);

  const viewCiccular = async url => {
    navigation.navigate('Circular Detail', {uri: url});
  };

  if (route.params.dept) {
    return (
      <View>
        <Box bg="coolGray.100" rounded="lg" height="100%">
          <Box p="5">
            <Center
              h="20"
              w="100%"
              bg="#0094f7"
              rounded="sm"
              _text={{
                color: '#f5fbff',
                fontWeight: 'medium',
              }}
              shadow={'3'}>
              <Text style={{fontSize: 20, textAlign: 'left', color: '#f5fbff'}}>
                {route.params.dept}
              </Text>
              {route.params.fy}
            </Center>
          </Box>
          {loadStatus === true ? (
            <Center w="100%">
              <VStack
                w="100%"
                borderWidth="1"
                space={8}
                overflow="hidden"
                rounded="md"
                _dark={{
                  borderColor: 'coolGray.500',
                }}
                _light={{
                  borderColor: 'coolGray.200',
                }}>
                <Skeleton h="40" />
                <Skeleton.Text px="4" />
                <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
              </VStack>
            </Center>
          ) : (
            <VStack space="2">
              <Box bg="warmGray.50" width={screenwidth} height={screenheight}>
                {Object.keys(circular).length > 0 ? (
                  <FlatList
                    data={Object.keys(circular)}
                    renderItem={({item}) => (
                      <>
                        <AllCir
                          viewCiccular={viewCiccular}
                          name={circular[item].circular_name}
                          dateofissue={circular[item].date_of_issue}
                          url={circular[item].url}
                          width={screenwidth}
                        />
                      </>
                    )}
                  />
                ) : (
                  <Box
                    bg="red.100"
                    height={screenheight / 4}
                    width="100%"
                    alignContent="center"
                    justifyContent="center">
                    <Text
                      style={{color: 'red', fontSize: 20, textAlign: 'center'}}>
                      No Circular Available
                    </Text>
                  </Box>
                )}
              </Box>
            </VStack>
          )}
        </Box>
      </View>
    );
  } else {
    return (
      <View>
        <Box bg="coolGray.100" rounded="lg" height="100%">
          {/* <AppBar header={"Circulars List"} subHeader={"All"} nav={navigation} /> */}
          <Box p="5">
            <Center
              h="20"
              w="100%"
              bg="primary.400"
              rounded="sm"
              _text={{
                color: 'warmGray.50',
                fontWeight: 'medium',
              }}
              shadow={'3'}>
              <Text style={{fontSize: 20, textAlign: 'left'}}>
                {route.params.dept}
              </Text>
              {route.params.fy}
            </Center>
          </Box>
          {loadStatus === true ? (
            <Center w="100%">
              <VStack
                w="100%"
                borderWidth="1"
                space={8}
                overflow="hidden"
                rounded="md"
                _dark={{
                  borderColor: 'coolGray.500',
                }}
                _light={{
                  borderColor: 'coolGray.200',
                }}>
                <Skeleton h="40" />
                <Skeleton.Text px="4" />
                <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
              </VStack>
            </Center>
          ) : (
            <VStack space="2">
              <Text>
                {Object.keys(circular).length > 0 ? (
                  Object.keys(circular).map(([k, v], i) => (
                    <>
                      <AllCir
                        viewCiccular={viewCiccular}
                        name={circular[k].circular_name}
                        dateofissue={circular[k].date_of_issue}
                        url={circular[k].url}
                      />
                    </>
                  ))
                ) : (
                  <Box
                    bg="red.100"
                    height={screenheight / 4}
                    width="100%"
                    alignContent="center"
                    justifyContent="center">
                    <Text
                      style={{color: 'red', fontSize: 20, textAlign: 'center'}}>
                      No Circular Available
                    </Text>
                  </Box>
                )}
              </Text>
            </VStack>
          )}
        </Box>
      </View>
    );
  }
};

export default CircularList;
