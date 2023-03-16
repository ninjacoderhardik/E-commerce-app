/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Container, Icon} from 'native-base';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import styles from './styles';
import globalStyles from '../../constants/globalStyles';
import Colors from '../../constants/colors';
import URL from '../../constants/url';

async function _doDownload(uri) {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'Thangam Exports wants to use your Storage.',
        },
      );
      if (granted) {
        const {config, fs} = RNFetchBlob;
        let date = new Date();
        let DownloadDir = fs.dirs.DownloadDir; // this is the pictures directory. You can check the available directories in the wiki.
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
            notification: true,
            path:
              DownloadDir +
              '/PDF_' +
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              '.' +
              extention(uri), // this is the path where your downloaded file will live in
            description: 'Downloading...',
          },
        };
        config(options)
          .fetch('GET', uri)
          .then((res) => {
            Alert.alert('Download Successfully.');
          });
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  } else {
  }
}

function extention(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
}

function _doShare(path) {
  Share.open({
    type: 'application/pdf',
    url: Platform.OS === 'android' ? 'file://' + path : path,
  });
}

export default function DocumentViewScreen(props) {
  const {documentDetail = {}} = props.route.params;
  const [filePath, setFilePath] = useState('');

  useLayoutEffect(() => {
    console.log(`${URL.ORDER_PDF}${documentDetail?.order_id}`);
    props.navigation.setOptions({
      headerRight: () =>
        props.navigation.setOptions({
          title: documentDetail?.order_no,
          headerRight: () => (
            <View style={styles.rowContainer}>
              {Platform.OS === 'android' && filePath !== '' && (
                <TouchableOpacity
                  onPress={() =>
                    _doDownload(`${URL.ORDER_PDF}${documentDetail?.order_id}`)
                  }
                  style={{paddingRight: 10}}>
                  <Icon
                    name="clouddownloado"
                    type="AntDesign"
                    style={{color: Colors.White}}
                  />
                </TouchableOpacity>
              )}
              {filePath !== '' && (
                <TouchableOpacity
                  onPress={() => _doShare(filePath)}
                  style={{paddingHorizontal: 10}}>
                  <Icon
                    name="sharealt"
                    type="AntDesign"
                    style={{color: Colors.White, fontSize: 26}}
                  />
                </TouchableOpacity>
              )}
            </View>
          ),
        }),
    });
  }, [props, filePath]);

  return (
    <Container style={globalStyles.container}>
      <Pdf
        source={{
          uri: `${URL.ORDER_PDF}${documentDetail?.order_id}`,
        }}
        onLoadComplete={(numberOfPages, fPath) => {
          setFilePath(fPath);
        }}
        onPageChanged={(page, numberOfPages) => {}}
        onError={(error) => {}}
        onPressLink={(uri) => {}}
        style={styles.container}
      />
    </Container>
  );
}
