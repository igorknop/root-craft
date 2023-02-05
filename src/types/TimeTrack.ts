import Token from "./Token";

export interface TimeTrack {
  slots: TimeTrackSlot[];
}

export interface TimeTrackSlot {
  id: string;
  time: number;
  partId: string;
  label: string;
  tokens: Token[];
}
