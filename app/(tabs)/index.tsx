import React, { useRef, useState } from 'react';
import { Image } from 'expo-image';
import {
  Button,
  Platform,
  StyleSheet,
  TextInput,
  View,
  Pressable,
  TouchableOpacity
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import CameraBottomTools from '@/components/CameraBottomTools';
import CameraSideTools from '@/components/CameraSideTools';

export default function HomeScreen() {
  const [textValue, setTextValue] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }
  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
      setUri(photo.uri);
    }
  };
  const handleText = (val: string) => {
    setTextValue(val);
  };
  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <ThemedText style={styles.message}>
          We need your permission to show the camera
        </ThemedText>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }
  return showCamera ? (
    <>
      <CameraView style={styles.camera} />
      <CameraSideTools setShowCamera={setShowCamera} />
      <CameraBottomTools takePicture={takePicture} />
    </>
  ) : (
    <ThemedView
      style={{
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10
      }}>
      <ThemedText style={{ marginVertical: 40 }}>Photo Vision App</ThemedText>
      <ThemedText>
        This a camera that can detect objects and label them into a form from a
        picture
      </ThemedText>
      <ThemedText>Value populated by user or camera</ThemedText>

      <ThemedView style={{ flexDirection: 'row', marginVertical: 20 }}>
        <ThemedText style={{ marginRight: 10 }}>Input</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={handleText}
          value={textValue}
          placeholder='Enter value here'
        />
      </ThemedView>
      <ThemedText>{textValue}</ThemedText>
      <ThemedView>
        <Button onPress={handleOpenCamera} title='Open Camera' />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10
  },
  input: {
    // flex:1,
    height: 40,
    width: 200,
    backgroundColor: '#488c7d',
    // height: 40,
    // margin: 12,
    borderWidth: 1
    // padding: 10,
  }
});
