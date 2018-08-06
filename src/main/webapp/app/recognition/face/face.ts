export interface FaceRectangle {
  width: number;
  height: number;
  left: number;
  top: number;
}

export interface Face {
  index: number;
  faceId: number;
  identityId: number;
  label: string;
  confidence: number;
  faceRectangle: FaceRectangle;
  recognizer: string;
}
