import Token from "./Token";

export interface TimeTrack {
  slots: TimeTrackSlot[];
}

export interface TimeTrackSlot {
  id: string;
  time: number;
  label: string;
  tokens: Token[];
}
