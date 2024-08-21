import { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Button,
  Pressable,
  TouchableOpacity,
  Switch,
  FlatList,
  SectionList,
  BackHandler,
  Alert,
  DrawerLayoutAndroid,
  PermissionsAndroid,
  ToastAndroid,
  ActionSheetIOS,
  ActivityIndicator,
  useWindowDimensions,
  Linking,
  Modal,
  PixelRatio,
  StatusBar,
} from 'react-native'

export default function HomeScreen() {
  const [isLoad, setIsLoad] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [result, setResult] = useState('start')
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
  const data = [
    { id: 1, title: 'Title 1', content: 'content 1' },
    { id: 2, title: 'Title 2', content: 'content 2' },
    { id: 3, title: 'Title 2', content: 'content 3' },
    { id: 4, title: 'Title 4', content: 'content 4' },
    { id: 5, title: 'Title 5', content: 'content 5' },
    { id: 6, title: 'Title 6', content: 'content 6' },
    { id: 7, title: 'Title 7', content: 'content 7' },
    { id: 8, title: 'Title 8', content: 'content 8' },
    { id: 9, title: 'Title 9', content: 'content 9' },
    { id: 10, title: 'Title 10', content: 'content 10' },
    { id: 11, title: 'Title 11', content: 'content 11' },
    { id: 12, title: 'Title 12', content: 'content 12' },
    { id: 13, title: 'Title 13', content: 'content 13' },
    { id: 14, title: 'Title 14', content: 'content 14' },
    { id: 15, title: 'Title 15', content: 'content 15' },
    { id: 16, title: 'Title 16', content: 'content 16' },
    { id: 17, title: 'Title 17', content: 'content 17' },
    { id: 18, title: 'Title 18', content: 'content 18' },
    { id: 19, title: 'Title 19', content: 'content 19' },
    { id: 20, title: 'Title 20', content: 'content 20' },
  ]
  const data2 = [
    {
      title: 'Main dishes',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: 'Sides',
      data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
      title: 'Drinks',
      data: ['Water', 'Coke', 'Beer'],
    },
    {
      title: 'Desserts',
      data: ['Cheese Cake', 'Ice Cream'],
    },
  ]
  const drawerRef = useRef<DrawerLayoutAndroid>(null)

  // Android-specific --- 2. Permissimons
  const requestPermissimonsHandler = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'allow access to camera permission',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    )
    try {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera')
      } else {
        console.log('Camera permission denied')
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Android-specific --- 3. ToastAndroid
  const toastAndoridHandler = async () => {
    ToastAndroid.show('Hello Toast', ToastAndroid.SHORT)
  }

  //  IOS-specific --- 1. ActionSheetIOS
  const actionSheetIOSHandler = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Generate Number', 'reset'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 2,
      },
      (btnIndex) => {
        if (btnIndex === 0) {
          return
        } else if (btnIndex === 1) {
          setResult(String(Math.random()))
        } else if (btnIndex === 2) {
          setResult('start')
        } else {
          return
        }
      },
    )
  }

  // Others --- 2. Alert
  const alertHandler = () => {
    Alert.alert('Title', 'Messaage', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
      },
      {
        text: 'Ok',
        onPress: () => console.log('Ok'),
      },
    ])
  }

  // Others --- 2.2. Prompt
  const promptHandler = () => {
    // Alert.prompt('Title', 'Messaage', null, 'default', undefined, undefined)
    // Alert.prompt(
    //   'Title',
    //   'Messaage',
    //   null,
    //   'login-password',
    //   'email',
    //   undefined,
    // )
    // Alert.prompt(
    //   'Title',
    //   'Messaage',
    //   null,
    //   'plain-text',
    //   'plain text',
    //   undefined,
    // )
    // Alert.prompt(
    //   'Title',
    //   'Messaage',
    //   null,
    //   'secure-text',
    //   'secure text',
    //   undefined,
    // )
  }

  //  Others --- 3.Dimensions
  const useStyles = () => {
    const { height, width, scale, fontScale } = useWindowDimensions()

    return StyleSheet.create({
      containerDimensions: {
        flexDirection: 'row',
        flex: 1,
      },

      left: {
        backgroundColor: 'pink',
        width: width > 400 ? 200 : 400,
      },

      right: {
        backgroundColor: 'skyblue',
        flex: 1,
      },
    })
  }
  const styles2 = useStyles()

  //  Others --- 5.Modal
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    //  Android-specific --- 1. BackHandler
    const exitHandler = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit App?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => BackHandler.exitApp(),
        },
      ])
      return true
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      exitHandler,
    )
    return backHandler.remove()
  }, [])

  return (
    <ScrollView>
      {/* Basic Components --- 1. View */}
      {/* <View style={styles.header}> */}
      {/* <View style={{ backgroundColor: 'red' }}>
        <Text>Home page</Text>
      </View> */}

      {/* Basic Components --- 2. Text */}
      {/* <View
        style={{
          padding: 20,
        }}
      >
        <Text
          onPress={() => console.log('onPress()')}
          numberOfLines={1}
          ellipsizeMode='middle'
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae
          eveniet maxime omnis, esse saepe pariatur dolores aspernatur
          temporibus ea possimus veniam! Corporis, soluta molestiae! Quas
          repellendus soluta deserunt omnis? Aut!
        </Text>
      </View> */}

      {/* Basic Components --- 3. Image */}
      {/* <View style={styles.container}>
        <Image
          source={{
            uri:
              'https://devtop.io/wp-content/uploads/2022/10/react-native-1.png',
          }}
          style={{ width: 150, height: 150 }}
          resizeMode='repeat'
          onLoad={() => setIsLoad(true)}
          onError={() => setIsError(true)}
          defaultSource={require('../../assets/images/adaptive-icon.png')} // Ignore in debug mode
          blurRadius={10}
        />
        <Text>
          {isLoad ? 'Image loaded Sucssesfuly...' : 'Image not loaded...'}
        </Text>
        <Text>{isError ? 'Error Image...' : 'Success Image...'}</Text>
      </View> */}

      {/* Basic Components --- 4. TextInput */}
      {/* <View style={styles.container}> */}
        {/* <TextInput
          style={{ backgroundColor: '#fff', padding: 5, width: 300 }}
          // value="value"
          // defaultValue="dafault value"
          // placeholder="add some text..."
          // placeholderTextColor="red"
          // onChangeText={(value) => console.log(value)}
          // onFocus={() => console.log('onFocus')}
          // onBlur={() => console.log('onBlur')}
          // maxLength={300}
          multiline={false}
          numberOfLines={3}
          // keyboardType='number-pad'
          secureTextEntry={true}
          autoCapitalize='words'
          autoCorrect={true}
          editable={true}
        />
      </View> */}

      {/* Basic Components --- 5. ScrollView */}
      {/* <ScrollView
        contentContainerStyle={{ backgroundColor: '#e0e0e0' }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
      >
        {data.map((item) => (
          <View key={item.id} style={styles.container}>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        ))}
      </ScrollView> */}

      {/* Basic Components --- 6. StyleSheet */}
      {/* <View style={compineStyles}></View> */}
      {/* <View style={flattenStyles}></View> */}

      {/*  ------------------------ */}

      {/* User Interaction --- 1. Button */}
      {/* <View style={styles.container}>
        <Button
          title="Button" //required
          onPress={() => console.log('onPress()')} //required
          color="#f194ff"
          // style={{}}
        />
      </View> */}

      {/* User Interaction --- 2. Pressable */}
      {/* <View style={styles.container}>
        <Pressable
          style={styles.pressable}
          onPress={() => console.log('onPress()')}
        >
          <Text>Pressable</Text>
        </Pressable>
      </View> */}

      {/* User Interaction --- 3. TouchableOpacity */}
      {/* <View style={styles.container}>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => console.log('onPress()')}
        >
          <Text>TouchableOpacity</Text>
        </TouchableOpacity>
      </View> */}

      {/* User Interaction --- 4. Switch */}
      {/* <View style={styles.container}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#81b0ff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e" // ios
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View> */}

      {/*  ------------------------ */}

      {/* List Views --- 1. FlatList */}
      {/* <FlatList
        data={data} //required
        renderItem={(
          { item }, //required
        ) => (
          <View key={item.id} style={styles.container}>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item) => (item.id as unknown) as string}
        ListHeaderComponent={() => (
          <View style={styles.container}>
            <Text
              style={{
                color: '#eb606b',
                fontWeight: 'bold',
              }}
            >
              List Header Component
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.container}>
            <Text style={{ color: '#eb606b', fontWeight: 'bold' }}>
              List Footer Component
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={styles.container}>
            <Text style={{ color: 'green' }}>Item Separator Component</Text>
          </View>
        )}
      /> */}

      {/* List Views --- 2. SectionList */}
      {/* <View style={styles.container}>
        <SectionList
          sections={data2} // required
          renderItem={(
            { item }, // required
          ) => (
            <Text style={{ color: '#a1a1a1', paddingLeft: 10 }}>{item}</Text>
          )}
          keyExtractor={(index) => index}
          renderSectionHeader={({ section }) => (
            <Text style={{ fontWeight: 'bold' }}>{section.title}</Text>
          )}
        />
      </View> */}

      {/*  ------------------------ */}

      {/* Android-specific --- 2. Permissimons */}
      {/* <View style={styles.container}>
        <Button
          title="Request Permissimons"
          onPress={requestPermissimonsHandler}
        />
      </View> */}

      {/* Android-specific --- 3. ToastAndorid */}
      {/* <View style={styles.container}>
        <Button title="Toast Andorid" onPress={toastAndoridHandler} />
      </View> */}

      {/*  ------------------------ */}

      {/* IOS-specific --- 1. ActionSheetIOS */}
      {/* --- Skip --- */}
      {/* <View style={styles.container}>
        <Text>{result}</Text>
        <Button title="Action Sheet IOS" onPress={actionSheetIOSHandler} />
      </View> */}

      {/*  ------------------------ */}

      {/* Others --- 1. ActivityIndicator */}
      {/* <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" color="#00ff00" />
      </View> */}

      {/* Others --- 2. Alert */}
      {/* <View style={styles.container}>
        <Button title="Alert Click" onPress={alertHandler} />
      </View> */}

      {/* Others --- 2.2 Prompt */}
      {/* IOS Only */}
      {/* <View style={styles.container}>
        <Button title="Prompt Click" onPress={promptHandler} />
      </View> */}

      {/* Others --- 3.Dimensions */}
      {/* <View style={styles2.containerDimensions}>
        <View style={styles2.left}>
          <Text>left</Text>
        </View>
        <View style={styles2.right}>
          <Text>right</Text>
        </View>
      </View> */}

      {/* Others --- 3.Linking */}
      {/* <View style={styles.container}>
        <Button
          title="open mail"
          onPress={() => Linking.openURL('mailto:example.com')}
        />
        <Button
          title="open phone"
          onPress={() => Linking.openURL('tel:+12345')}
        />
        <Button
          title="open sms"
          onPress={() => Linking.openURL('sms:+12345')}
        />
        <Button title="open url" onPress={() => Linking.openURL('https://')} />
      </View> */}

      {/* Others --- 5.Modal */}
      {/* <View style={styles.container}>
        <Modal
          animationType='fade'
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Open Modal</Text>
        </Pressable>
      </View> */}

      {/* Others --- 6.PixelRatio */}
      {/* <View style={styles.container}>
        <Image
          source={{
            uri:
              'https://devtop.io/wp-content/uploads/2022/10/react-native-1.png',
          }}
          style={{
            width: PixelRatio.getPixelSizeForLayoutSize(50),
            height: PixelRatio.getPixelSizeForLayoutSize(50),
          }}
        />
      </View> */}

      {/* Others --- 7.StatusBar */}
      {/* <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle='dark-content'
          // hidden={false}
        />
        <Text>Hello</Text>
      </View> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
  },

  container: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pressable: {
    backgroundColor: '#eb606b',
    padding: 5,
    margin: 5,
  },

  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },

  // Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

/* Basic Components --- 6. StyleSheet */
const isActiveStyle = true
const baseStyles = StyleSheet.create({
  contaier: {
    height: 200,
    backgroundColor: 'blue',
  },
})
const customStyles = StyleSheet.create({
  contaier: {
    height: 200,
    backgroundColor: 'green',
  },
})
const compineStyles = StyleSheet.compose(
  baseStyles.contaier,
  isActiveStyle ? baseStyles.contaier : customStyles.contaier,
)
const flattenStyles = StyleSheet.flatten([
  baseStyles.contaier,
  customStyles.contaier,
])
