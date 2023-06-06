export type Act = {
  id: number;
  name: string;
  beats: Beat[];
};

export type Beat = {
  id: number;
  name: string;
  time: string;
  content: string;
  cameraAngle: string;
  notes: string;
};

export type ResponseError = {
  message: string;
};
