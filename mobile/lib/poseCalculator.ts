export const calculateAngle = (a: any, b: any, c: any) => {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);

  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return angle;
};

export const checkPushUpState = (angle: number, stage: string | null) => {
  // Ambang batas (Threshold)
  // Sudut > 160 derajat = Tangan Lurus (Posisi ATAS)
  // Sudut < 90 derajat = Tangan Menekuk (Posisi BAWAH)
  
  if (angle > 160) {
    return { stage: "UP", isRep: false };
  }
  if (angle < 90 && stage === "UP") {
    return { stage: "DOWN", isRep: false };
  }
  if (angle > 160 && stage === "DOWN") {
    // Transisi dari DOWN ke UP = 1 Repetisi selesai
    return { stage: "UP", isRep: true };
  }
  
  return { stage, isRep: false };
};