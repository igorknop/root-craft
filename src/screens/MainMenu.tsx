import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <div>
      <h1>Root Craft</h1>
      <nav>
        <ul>
          <li>
            <Link to={"/play"}>Start a new game.</Link>
          </li>
          <li>
            <Link to={"/techtree"}>Tech Tree.</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
