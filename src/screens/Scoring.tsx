import Game from "../types/Game";
import styles from "./Scoring.module.css";
import { Link } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { gameAtom } from "./App";

export default function Scoring() {
  const [game] = useAtom(gameAtom);

  return (
    <main>
      <div className={styles.Scoring}>
        <h1>Scoring</h1>
        <table>
          <thead>
            <tr>
              <th>Criteria</th>
              <th>Value</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Items</td>
              <td>2</td>
              <td>{game.items.length}</td>
              <td>{game.items.length * 2}</td>
            </tr>
            <tr>
              <td>Places</td>
              <td>5</td>
              <td>{game.places.length}</td>
              <td>{game.places.length * 5}</td>
            </tr>
            <tr>
              <td>Days</td>
              <td>1</td>
              <td>{game.players[0].days}</td>
              <td>{game.players[0].days}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Total</td>
              <td>
                {game.items.length * 2 +
                  game.places.length * 5 +
                  game.players[0].days}
              </td>
            </tr>
          </tfoot>
        </table>
        <nav>
          <Link to="/">Back to Main Menu</Link>.
        </nav>
      </div>
    </main>
  );
}
