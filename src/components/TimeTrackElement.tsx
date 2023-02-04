import { useAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import payTime from "../actions/payTime";
import { gameAtom, timeTrackAtom } from "../App";
import { TimeTrackSlot } from "../types/TimeTrack";
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

export default function TimeTrackElement() {
  const [timeTrack, setTimeTrack] = useAtom(timeTrackAtom);
  return (
    <div className={styles.TimeTrack}>
      <ol className={styles.TimeTrackSlots}>
        {timeTrack.map((slot: TimeTrackSlot) => (
          <li
            className={slot.tokens?.length > 0 ? styles.selectedSlot : ""}
            key={`slot${slot.time}`}
          >
            <div>{slot.label}</div>
            <div>
              {slot.tokens?.map((token) => (
                <TokenElement
                  token={token}
                  key={token.id}
                  onClick={() => {
                    setTimeTrack(payTime(timeTrack,slot.time));
                  }}
                />
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
