import { Link } from "react-router-dom";

export default function NavMenu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/play"}>Play!</Link>
        </li>
        <li>
          <Link to={"/how-to-play"}>How to Play</Link>
        </li>
        <li>
          <Link to={"/tech-tree"}>Tech Tree</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
      </ul>
    </nav>
  );
}
