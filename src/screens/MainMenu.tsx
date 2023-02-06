import { Link } from "react-router-dom";
import NavMenu from "../components/NavMenu";

export default function MainMenu() {
  return (
    <main>
      <h1>Root Craft</h1>
      <div style={{ margin: "auto", width: 320 }}>
        <NavMenu />
      </div>
    </main>
  );
}
