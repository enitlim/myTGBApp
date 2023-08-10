import React, { useEffect, useState, useContext } from "react";
import { View, Text, Dimensions } from "react-native";
import {
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  Center,
  FlatList,
  Pressable,
  StatusBar,
  Heading,
  Input,
  Icon,
  ScrollView,
  Skeleton ,
  Spinner
} from 'native-base';
import firestore from '@react-native-firebase/firestore';

import BottomNavBar from "../../../components/bottomnavbar";
import AppBar from "../../../components/appBar";
import Tasks from "../../workschedule/screens/tasks";
import { MyTGBContext } from "../../../api/contextAPI/myTgbContext";
import {
  FlatGrid,
} from 'react-native-super-grid';

const DeptView = props => {
  return (
    <View>
      {/* <Pressable
        style={{justifyContent: 'center', alignItems: 'center', height: 100}}
        onPress={() => {
          props.nav.navigate('Circular FY', {dept: props.deptname});
        }}> */}
      <Center
        h="90"
        w="170"
        bg="#f5fbff"
        rounded="lg"
        _text={{
          color: 'warmGray.50',
          fontWeight: 'medium',
        }}
        shadow={'3'}>
        <VStack space="2" alignItems="center">
          <Text style={{color: '#00538b', fontSize: 30}}>
            {(props.dashVal / 100000).toFixed(2)}
          </Text>
          <Text style={{color: 'black', fontSize: 13}}>{props.dashKey}</Text>
        </VStack>
      </Center>
      {/* </Pressable> */}
    </View>
  );
};
const Home = ({ navigation, route }) => {
  const {currentUser} = useContext(MyTGBContext);
  const {emp_name, designation, user_id, br_name, br_code} = currentUser[0];
  // console.log(emp_name, designation, user_id);
  const [screenwidth, setWidth] = useState(null);
  const [screenheight, setHeight] = useState(null);
  const [dash, setDash] = useState([]);
  const [goldRate, setGoldRate] = useState({});
  const [chairmanRank, setChairmanRank] = useState([]);
  const [dashboardItems, setDashboardItems] = useState([]);
  const [rankData, setrankData] = useState([]);
  useEffect(() => {
    setWidth(Dimensions.get('window').width);
    setHeight(Dimensions.get('window').height);
  }, [screenwidth, screenheight]);

 

   useEffect(() => {
     const fetchDashboard = firestore()
       .collection('dashboard')
       .doc('mytgb')
       .onSnapshot(docSnap => {
         setDash(docSnap.data());
       });

     return () => {
       fetchDashboard();
     };
   }, []);
   
  useEffect(() => {
    const goldSubscribe = firestore()
      .collection('dashboard')
      .doc('gold_rate')
      .onSnapshot(docSnapShot => {
        setGoldRate(docSnapShot.data());
      });

    return () => {
      goldSubscribe();
    };
  }, []);
   useEffect(() => {
     const fetchChairmanRank = firestore()
       .collection('dashboard')
       .doc('bankrank')
       .onSnapshot(docSnapShot2 => {
         setChairmanRank(docSnapShot2.data());
       });

     return () => {
       fetchChairmanRank();
     };
   }, []);
  
  useEffect(() => {
    const displayDashboard = async () => {
      if (Object.keys(dash).length > 0) {
        const dashbdata = Object.entries(dash[br_code])
          .filter(([key]) => key !== 'AsOnDate')
          .filter(([key]) => key !== 'UpdatedOn')
          .filter(([key]) => key !== 'BrCode')
          .filter(([key]) => key !== 'PNPA')
          .map(([dashKey, dashVal]) => {
            return {dashKey, dashVal};
          });
        setDashboardItems(dashbdata);

        //  console.log('Branch Specfic Data: ', dashbdata);
      }
    };
    displayDashboard();
  }, [dash]);
  
   useEffect(() => {
    
const displayRank = async () => {
       if (Object.keys(chairmanRank).length > 0) {
         const rankData = Object.entries(chairmanRank[br_code])
         
           .map(([br, rank]) => {
             return br, rank;
           });
         setrankData(rankData);

        //  console.log('Branch Specfic Data: ', dashbdata);
       }
     };

     displayRank();

   }, [chairmanRank]);
  // console.log('Dashboard Length is ', Object.keys(dash).length);
 

  return (
    <>
      <Box bg="#faf9f8" rounded="lg" height="100%">
        <AppBar header={emp_name} subHeader={'Welcome'} nav={navigation} />

        <Box pl="5">
          <Heading>Dashboard for {br_name}</Heading>
        </Box>
        <Box h={screenheight / 3} pb="5">
          {Object.keys(dashboardItems).length > 0 ? (
            <FlatGrid
              showsHorizontalScrollIndicator={false}
              itemDimension={100}
              spacing={5}
              data={dashboardItems}
              maxItemsPerRow={2}
              horizontal={true}
              renderItem={({item}) => (
                <>
                  <DeptView
                    dashKey={item.dashKey}
                    dashVal={item.dashVal}
                    nav={navigation}
                  />
                </>
              )}
            />
          ) : (
            <Center w="100%">
              <VStack
                w="90%"
                maxW="400"
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
              </VStack>
            </Center>
          )}
        </Box>
        <VStack space="5" pl="5" pr="5">
          <Center
            bg="#f5fbff"
            width="100%"
            rounded="xl"
            h="100"
            p="5"
            shadow={'3'}>
            {rankData.length > 0 ? (
              <Text style={{color: '#00538b', fontSize: 30}}>
                {rankData[1]}
              </Text>
            ) : (
              <Spinner size="lg" />
            )}

            <Text style={{color: '#323130', fontSize: 17}}>
              Chairman's Ranking
            </Text>
          </Center>
          <Center
            bg="#f5fbff"
            width="100%"
            rounded="xl"
            h="100"
            p="5"
            shadow={'3'}>
            {Object.keys(goldRate).length > 0 ? (
              <>
                <Text style={{color: '#00538b', fontSize: 30}}>
                  {goldRate.gramAmt} /- Per Gram
                </Text>
                <Text style={{color: '#323130'}}>{goldRate.gramDate}</Text>
              </>
            ) : (
              <Spinner size="lg" />
            )}

            <Text style={{color: '#323130', fontSize: 17}}>
              Gold Lending rate(22 carat)
            </Text>
          </Center>
        </VStack>
      </Box>
      {/* <BottomNavBar /> */}
    </>
  );
};
export default Home;
