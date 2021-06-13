import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    // if camera exists
    if(camera){
        const data = await camera.takePictureAsync(null)
        console.log(data.uri)
        setImage(data.uri)
    }
  }
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera 
      ref={ref => setCamera(ref)}
      style={styles.camera} 
      type={type}
    //   ratio={'1:1'} // not working on ios
      >
      </Camera>
      <Button
            title = 'Flip Image'
            onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
            }}>
        </Button>
        <Button title='Take a picture' onPress={() => takePicture()} />
        {image && <Image source={{uri: image}} style={styles.imageContainer}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
      flex: 1,
  },
  camera: {
    flex: 1,
  }
});
