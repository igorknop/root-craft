import { useAtom } from "jotai";
import { gameAtom, timeTrackAtom } from "../App";
import { TimeTrackSlot } from "../types/TimeTrack";
import Symbol from "./Symbol";
import styles from "./TimeTrackElement.module.css";
import TokenElement from "./TokenElement";

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
            <h1><Symbol>{slot.partId}</Symbol></h1>
            <h2>{slot.label}</h2>
            <div>
              {slot.tokens?.map((token) => (
                <TokenElement token={token} key={token.id} onClick={() => {}} />
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
