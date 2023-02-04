import { useAtom } from "jotai";
import { timeTrackAtom } from "../App";
import { TimeTrack, TimeTrackSlot } from "../types/TimeTrack";

export default function payTime(oldTimeTrack: TimeTrackSlot[], amount: number) {
  console.log("payTime", oldTimeTrack, amount);
  
  const sourceSlot = oldTimeTrack.findIndex((slot) => slot.tokens.length > 0);
  const targetSlot = (sourceSlot + amount) % oldTimeTrack.length;
  
  const newTimeTrack = structuredClone(oldTimeTrack);
  newTimeTrack[targetSlot].tokens = newTimeTrack[sourceSlot].tokens;
  newTimeTrack[sourceSlot].tokens = [];
  return newTimeTrack;
};