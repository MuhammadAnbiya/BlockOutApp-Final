import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Webcam from 'react-webcam';
// KITA HAPUS SEMUA IMPORT DARI @mediapipe AGAR TIDAK ERROR DI METRO BUNDLER
// import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
// import { Camera } from '@mediapipe/camera_utils';

import { calculateAngle, checkPushUpState } from '../lib/poseCalculator';
import { apiMintReward } from '../lib/authApi';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function PushUpCameraWeb() {
  const router = useRouter();
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  
  // State untuk memastikan semua script AI sudah siap
  const [isPoseLoaded, setIsPoseLoaded] = useState(false);
  const [isCameraLoaded, setIsCameraLoaded] = useState(false);
  const [isDrawingLoaded, setIsDrawingLoaded] = useState(false);
  
  const [poseModel, setPoseModel] = useState<any>(null);
  const [count, setCount] = useState(0);
  const [stage, setStage] = useState<string | null>("UP");
  const [timer, setTimer] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Cek apakah semua dependency sudah siap
  const isReady = isPoseLoaded && isCameraLoaded && isDrawingLoaded;

  // Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- 1. Load Script MediaPipe dari CDN (Solusi Paling Stabil) ---
  useEffect(() => {
    const loadScript = (src: string, onLoad: () => void) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        onLoad();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = onLoad;
      document.body.appendChild(script);
    };

    // Load Pose
    loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/pose.js', () => {
      console.log("Pose Loaded");
      setIsPoseLoaded(true);
    });

    // Load Camera Utils
    loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js', () => {
      console.log("Camera Utils Loaded");
      setIsCameraLoaded(true);
    });

    // Load Drawing Utils
    loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js', () => {
      console.log("Drawing Utils Loaded");
      setIsDrawingLoaded(true);
    });

  }, []);

  // --- 2. Inisialisasi Model Pose ---
  useEffect(() => {
    if (!isReady) return;

    const Pose = (window as any).Pose;
    if (!Pose) return;

    const pose = new Pose({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`;
      },
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);
    setPoseModel(pose);

    return () => {
      pose.close();
    };
  }, [isReady]);

  // --- 3. Setup Kamera ---
  useEffect(() => {
    if (!poseModel || !webcamRef.current || !webcamRef.current.video || !isReady) return;

    const Camera = (window as any).Camera;
    if (!Camera) return;

    const camera = new Camera(webcamRef.current.video, {
      onFrame: async () => {
        if (webcamRef.current?.video && poseModel) {
          try {
            await poseModel.send({ image: webcamRef.current.video });
          } catch (err) {
            // Ignore frame errors
          }
        }
      },
      width: 640,
      height: 480,
    });
    
    camera.start();

    return () => {
      // Biarkan browser menghandle stop
    };
  }, [poseModel, isReady]);

  // --- 4. Fungsi Callback Hasil Deteksi ---
  const onResults = useCallback((results: any) => {
    if (!canvasRef.current || !webcamRef.current || !webcamRef.current.video) return;

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasCtx = canvasRef.current.getContext('2d');
    if (!canvasCtx) return;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
    
    // Ambil drawing utils dari window
    const drawConnectors = (window as any).drawConnectors;
    const drawLandmarks = (window as any).drawLandmarks;
    const POSE_CONNECTIONS = (window as any).POSE_CONNECTIONS;

    if (results.poseLandmarks) {
      // Gambar Garis & Titik (Jika library sudah load)
      if (drawConnectors && POSE_CONNECTIONS) {
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
          color: '#00FF00', lineWidth: 4
        });
      }
      if (drawLandmarks) {
        drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: '#FF0000', lineWidth: 2
        });
      }

      // --- LOGIC HITUNG PUSH UP ---
      const landmarks = results.poseLandmarks;
      const shoulder = landmarks[11];
      const elbow = landmarks[13];
      const wrist = landmarks[15];

      if (shoulder && elbow && wrist) {
        const angle = calculateAngle(shoulder, elbow, wrist);
        
        setStage((prevStage) => {
           const check = checkPushUpState(angle, prevStage);
           if (check.isRep) {
             setCount(c => c + 1);
           }
           return check.stage;
        });

        // Visualisasi Sudut
        canvasCtx.font = "30px Arial";
        canvasCtx.fillStyle = "white";
        canvasCtx.fillText(Math.floor(angle).toString(), elbow.x * videoWidth, elbow.y * videoHeight);
      }
    }
    canvasCtx.restore();
  }, []);

  const handleFinish = async () => {
    if (count === 0) {
      alert("Lakukan minimal 1 push up!");
      return;
    }

    setIsProcessing(true);
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      if (!token) throw new Error("No token found. Silakan Login ulang.");

      const result = await apiMintReward({
        workoutType: "PUSH_UP",
        count: count,
        duration: timer,
        walletAddress: "" 
      }, token);

      alert(`Selamat! Anda mendapatkan waktu: ${result.data.formattedTime}`);
      router.back();

    } catch (error: any) {
      alert("Gagal menyimpan workout: " + (error.message || "Unknown Error"));
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
         <Webcam
            ref={webcamRef}
            style={styles.webcam}
            mirrored
          />
         <canvas ref={canvasRef} style={styles.canvas} />
      </View>

      <View style={styles.overlay}>
        {!isReady && (
            <Text style={{color: 'yellow', fontSize: 16, marginBottom: 10, backgroundColor: 'rgba(0,0,0,0.5)', padding: 5}}>
                Loading AI Modules... (Mohon Tunggu)
            </Text>
        )}

        <Text style={styles.title}>Do some Push Up</Text>
        
        <View style={styles.statsContainer}>
            <Text style={styles.statLabel}>Count: <Text style={styles.statValue}>{count}</Text></Text>
            <Text style={styles.statLabel}>Time: <Text style={styles.statValue}>{formatTime(timer)}</Text></Text>
            <Text style={styles.statLabel}>Stage: <Text style={styles.statValue}>{stage}</Text></Text>
        </View>

        <TouchableOpacity 
          style={styles.finishButton} 
          onPress={handleFinish}
          disabled={isProcessing || !isReady}
        >
          <Text style={styles.finishText}>
            {isProcessing ? "Saving..." : "Finish"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  webcam: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 9,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as any, 
  },
  canvas: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 9,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as any,
  },
  overlay: {
    zIndex: 20,
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00D1FF',
    marginBottom: 20,
    position: 'absolute',
    top: 50, 
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  statsContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  statLabel: {
    color: 'white',
    fontSize: 18,
    marginVertical: 5,
  },
  statValue: {
    color: '#00D1FF',
    fontWeight: 'bold',
    fontSize: 22,
  },
  finishButton: {
    backgroundColor: '#00D1FF',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#00D1FF',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  finishText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  }
});