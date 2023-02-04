import Token from "./Token";

export interface TimeTrack {
  slots: TimeTrackSlot[];
}

export interface TimeTrackSlot {
  time: number;
  label: string;
  tokens:Token[];
}