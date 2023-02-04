import { useState } from "react";
import styles from "./TimeTrack.module.css";
import TokenElement from "./TokenElement";

const MAX_TIME = 12;
const TIME_SLOTS = [
  { time: 1, label: "Dawn" },
  { time: 2, label: "Morning" },
  { time: 3, label: "Noon" },
  { time: 4, label: "Afternoon" },
  { time: 5, label: "Dusk" },
  { time: 6, label: "Evening" },
  { time: 7, label: "Midnight" },
  { time: 8, label: "Night" },
];

interface TimeTrackProps {
  time: number;
}

export default function TimeTrack({ time }: TimeTrackProps) {
  return (
    <div className={styles.TimeTrack}>
      <ol className={styles.TimeTrackSlots}>
        {TIME_SLOTS.map((slot) => (
          <li
            className={time === slot.time ? styles.selectedSlot : ""}
            key={`slot${slot.time}`}
          >
            <div>{slot.label}</div>
            <div>
              {time === slot.time ? (
                <TokenElement token={{ id: "T", player: 1, name: "Time" }} />
              ) : (
                ""
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
