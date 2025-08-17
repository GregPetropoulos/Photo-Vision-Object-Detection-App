import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
interface ICameraSideTools {
  setShowCamera: React.Dispatch<React.SetStateAction<boolean>>;
}
const CameraSideTools = ({ setShowCamera }: ICameraSideTools) => {
  const closeCamera = () => setShowCamera(false);
  return (
    <View style={styles.container}>
      <MaterialIcons
        name='close'
        color={'#ffff'}
        size={44}
        onPress={closeCamera}
      />
    </View>
  );
};

export default CameraSideTools;

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 30, left: 280, width: '100%' }
});
