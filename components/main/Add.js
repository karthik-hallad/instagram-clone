import {Camera, CameraType} from "expo-camera";
import {useState} from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App({navigation}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{textAlign: "center"}}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function takePicture() {
    if (camera) {
      const data = await camera.takePictureAsync();
      setImage(data.uri);
    }
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={type}
          ratio={"1:1"}
          ref={(ref) => setCamera(ref)}
        ></Camera>
      </View>
      <Button
        style={styles.button}
        onPress={toggleCameraType}
        title="Flip Image"
      ></Button>
      <Button
        style={styles.button}
        onPress={takePicture}
        title="Take Picture"
      ></Button>
      <Button
        style={styles.button}
        onPress={pickImage}
        title="Pick From Gallery"
      ></Button>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate("Save", {image})}
        title="Save Picture"
      ></Button>
      {/* //image if image exists (if we set the uri of image ) then run the image tab and display it*/}
      {/* {image && console.log(image)} */}
      {image && <Image source={{uri: image}} style={{flex: 1}} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
