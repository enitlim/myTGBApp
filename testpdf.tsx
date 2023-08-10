import React from 'react';
import {StyleSheet, Dimensions, View, Text, ScrollView} from 'react-native';
import Pdf from 'react-native-pdf';

export default class Testpdf extends React.Component {
  render() {
    const source = {
      uri: 'https://firebasestorage.googleapis.com/v0/b/inspection-app-2d9bd.appspot.com/o/Circulars%2F21042023%20PERSONNEL_0001-compressed.pdf?alt=media&token=6ed5f7d1-3ca1-4f63-9d83-43231e2cdaa0',
      cache: true,
    };
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf' };
    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
    //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
    //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>I am PDF</Text>
          <Pdf
            trustAllCerts={false}
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
  },
});

