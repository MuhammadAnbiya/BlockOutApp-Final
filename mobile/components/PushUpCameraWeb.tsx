import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Webcam from 'react-webcam';
import { calculateAngle } from '@/lib/poseCalculator';
import { apiMintReward } from '@/lib/authApi';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function PushUpCameraWeb() {
  const router = useRouter();
  const webcamRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  
  const [isPoseLoaded, setIsPoseLoaded] = useState(false);
  const [isCameraLoaded, setIsCameraLoaded] = useState(false);
  const [isDrawingLoaded, setIsDrawingLoaded] = useState(false);
  
  const [poseModel, setPoseModel] = useState<any>(null);
  const [count, setCount] = useState(0);
  const [stage, setStage] = useState<string | null>("UP"); 
  const [timer, setTimer] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [debugAngle, setDebugAngle] = useState(0);

  const countRef = useRef(0);
  const isDownRef = useRef(false);

  const isReady = isPoseLoaded && isCameraLoaded && isDrawingLoaded;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

    loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/pose.js', () => setIsPoseLoaded(true));
    loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js', () => setIsCameraLoaded(true));
    loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js', () => setIsDrawingLoaded(true));
  }, []);

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

  useEffect(() => {
    if (!poseModel || !webcamRef.current || !webcamRef.current.video || !isReady) return;

    const Camera = (window as any).Camera;
    if (!Camera) return;

    const camera = new Camera(webcamRef.current.video, {
      onFrame: async () => {
        if (webcamRef.current?.video && poseModel) {
          try {
            await poseModel.send({ image: webcamRef.current.video });
          } catch (err) {}
        }
      },
      width: 640,
      height: 480,
    });
    
    camera.start();
  }, [poseModel, isReady]);

  const onResults = useCallback((results: any) => {
    if (!canvasRef.current || !webcamRef.current || !webcamRef.current.video) return;

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasCtx = canvasRef.current.getContext('2d');
    if (!canvasCtx) return;

    canvasCtx.save();
    canvasCtx.scale(-1, 1);
    canvasCtx.translate(-videoWidth, 0);
    
    canvasCtx.clearRect(0, 0, videoWidth, videoHeight);
    
    const drawConnectors = (window as any).drawConnectors;
    const drawLandmarks = (window as any).drawLandmarks;
    const POSE_CONNECTIONS = (window as any).POSE_CONNECTIONS;

    if (results.poseLandmarks) {
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

      const landmarks = results.poseLandmarks;
      
      const leftPoints = [landmarks[11], landmarks[13], landmarks[15]]; 
      const rightPoints = [landmarks[12], landmarks[14], landmarks[16]];

      let activeAngle = 0;
      let activeElbow = null;

      const leftVis = (leftPoints[0]?.visibility || 0) + (leftPoints[1]?.visibility || 0);
      const rightVis = (rightPoints[0]?.visibility || 0) + (rightPoints[1]?.visibility || 0);

      if (leftVis > rightVis && leftPoints[0] && leftPoints[1] && leftPoints[2]) {
        activeAngle = calculateAngle(leftPoints[0], leftPoints[1], leftPoints[2]);
        activeElbow = leftPoints[1];
      } else if (rightPoints[0] && rightPoints[1] && rightPoints[2]) {
        activeAngle = calculateAngle(rightPoints[0], rightPoints[1], rightPoints[2]);
        activeElbow = rightPoints[1];
      }

      if (activeAngle > 0) {
        setDebugAngle(Math.floor(activeAngle));

        if (activeAngle < 100) {
            if (!isDownRef.current) {
                isDownRef.current = true;
                setStage("DOWN");
            }
        } else if (activeAngle > 160) {
            if (isDownRef.current) {
                countRef.current += 1;
                setCount(countRef.current);
                isDownRef.current = false;
                setStage("UP");
            }
        }

        canvasCtx.save();
        canvasCtx.scale(-1, 1); 
        const textX = - (activeElbow.x * videoWidth); 
        const textY = activeElbow.y * videoHeight;
        
        canvasCtx.font = "bold 40px Arial";
        canvasCtx.fillStyle = activeAngle < 100 ? "#00FF00" : "white";
        canvasCtx.fillText(Math.floor(activeAngle).toString(), textX, textY);
        canvasCtx.restore();
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
        duration: timer > 0 ? timer : 10,
        walletAddress: "" 
      }, token);

      alert(`Selamat! Anda mendapatkan waktu: ${result.data.formattedTime}\nKoin: ${result.data.coinsEarned}`);
      
      router.replace('/(dashboard)/blockout'); 

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
            <Text style={styles.statLabel}>Stage: <Text style={{color: stage === "DOWN" ? "#00FF00" : "#00D1FF", fontWeight: 'bold'}}>{stage}</Text></Text>
            <Text style={{color: 'yellow', fontSize: 14}}>Angle: {debugAngle}° (Target: &lt;100)</Text>
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