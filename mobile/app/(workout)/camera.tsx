import React from 'react';
import { View } from 'react-native';
// Pastikan path import ini benar mengarah ke komponen kamera Web kamu
import PushUpCameraWeb from '../../components/PushUpCameraWeb';

export default function CameraScreen() {
  return (
    <View style={{ flex: 1 }}>
      <PushUpCameraWeb />
    </View>
  );
}