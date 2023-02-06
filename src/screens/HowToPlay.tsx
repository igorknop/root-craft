import NavMenu from "../components/NavMenu";

export default function HowToPlay() {
  return (
    <main>
      <h1>How to Play: Root Craft</h1>
      <h2>Goal</h2>
      <p>
        In Root Craft you choose your ultimate goal: do you want to survive 10,
        20, 100 days? Want to unlock all items? Or is your goal to make a safe
        and comfortable home? It doesn't matter, you are the one who defines
        when and how much you will play.
      </p>

      <h2>Actions</h2>
      <p>
        The game is based on performing actions provided by cards (represented
        by arrows). You can only perform an action if: you have the necessary
        requirements (icons below the arrow) and; the materials needed to
        complete the action (icons to the left of the arrow). If the action is
        performed, you receive the resulting production (icons to the right of
        the arrow) in more materials or effects.
      </p>

      <h2>Time</h2>
      <p>
        The time of day is represented by an hourglass marker on the time track.
        Actions will require time to perform, and this results in moving the
        hourglass that many spaces to the right. If the marker turns around, it
        means that a new day has started. At the end of each day, hunger
        increases.
      </p>

      <h2>Locations</h2>
      <p>
        Blue cards represent locations. The compass marker represents where you
        are and your campfire marker. You can move between locations using the
        action that results in a Boot icon: you will spend the action's
        resources (usually just time) plus an amount of time equal to the
        distance of the cards on the location track. Actions with a spyglass
        icon let you discover new locations. A location is always added to the
        end of the location track.
      </p>

      <h2>Monsters</h2>
      <p>
        If your time track marker is in the night period, a monster is added to
        the game. Monsters will cause effects such as damage and hunger,
        (represented by actions that have themselves as requirements). It is
        possible to destroy a monster with your actions with the crossbones
        symbol.
      </p>

      <h2>Death</h2>
      <p>
        You die if you take 10 damage or if you get 10 hunger points. At the end
        of the day, you will always receive 2 hunger points to remove 1 point of
        damage. If you have no damage points, you only get 1 hunger point.
      </p>
      <NavMenu />
    </main>
  );
}
