import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ThemedView } from './ThemedView';
interface ICameraProps{
  takePicture:()=> void
}

const CameraBottomTools = ({ takePicture }:ICameraProps) => {
  return (
    <View style={styles.shutterContainer}>

    <Pressable onPress={takePicture}>
      {({ pressed }) => (
        <View
        style={[
          styles.shutterBtn,
          {
            opacity: pressed ? 0.5 : 1
          }
        ]}>
          <View style={styles.shutterBtnInner} />
        </View>
      )}
    </Pressable>
      </View>
  );
};

export default CameraBottomTools;

const styles = StyleSheet.create({
  shutterContainer: {
    position: 'absolute',
    bottom: 44,
    left: 220,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30
  },
  shutterBtn: {
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: 'white',
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'white'
  }
});
