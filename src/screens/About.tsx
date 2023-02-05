import { Link } from "react-router-dom";

export default function About() {
  return (
    <main>
      <h1>Root Craft</h1>
      <p>
        In Root Craft you are a frogman trying to survive in a fantastic
        mangrove swamp full of dangers and giant animals. Gather materials,
        craft equipment, feed yourself and survive as long as you can by running
        away from night creatures amid the aerial roots.
      </p>

      <p>
        This game was made by <a href="igorknop.com.br"> Igor Knop</a> for{" "}
        <a href="https://globalgamejam.org/2023/jam-sites/universidade-federal-de-juiz-de-fora">
          Global Game Jam 2023, Federal University of Juiz de Fora website
          (#ggjUFJF23)
        </a>
        . With Root Craft I wanted to have a compact board game, made up of very
        few cards and a handful of tokens. The expectation is that it mimics all
        the emotions of the genre with a very small set of rules and components.
      </p>

      <h2>Diversifiers</h2>
      <dl>
        <div>
          <dt>Sharing Is Caring (Sponsored by GitHub)</dt>
          <dd>
            Share the source code for your submission in a public GitHub
            repository and list the URL on your submission page.
          </dd>
          <dd>
            Source Code:{" "}
            <a href="https://github.com/igorknop/root-craft">
              https://github.com/igorknop/root-craft
            </a>
          </dd>
        </div>
      </dl>
      <nav><Link to="/">Back to Main Menu</Link>.</nav>
    </main>
  );
}
