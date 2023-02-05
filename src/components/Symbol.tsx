import {
  GiBoneGnawer,
  GiCampfire,
  GiChest,
  GiCompass,
  GiCrossedBones,
  GiFly,
  GiForest,
  GiGrassMushroom,
  GiHand,
  GiHeartMinus,
  GiHeartPlus,
  GiKnifeFork,
  GiLightBackpack,
  GiLog,
  GiMeat,
  GiMoonClaws,
  GiMountainRoad,
  GiRiver,
  GiSadCrab,
  GiSandsOfTime,
  GiSpiderAlt,
  GiSpiderWeb,
  GiSpyglass,
  GiStoneAxe,
  GiStonePile,
  GiSwapBag,
  GiTable,
  GiWalkingBoot,
  GiWoodenHelmet,
  GiWoodStick,
} from "react-icons/gi";
import { BsHammer, BsQuestionDiamond } from "react-icons/bs";
import { AiFillHourglass } from "react-icons/ai";
import {
  FaHourglass,
  FaHourglassEnd,
  FaHourglassHalf,
  FaHourglassStart,
} from "react-icons/fa";

export default function Symbol({ children }: { children: string }) {
  switch (children) {
    case "I1":
      return <GiWoodStick title="Wooden Stick" />;
    case "I2":
      return <GiStonePile title="Pebble" />;
    case "I3":
      return <BsHammer title="Wooden Hammer" />;
    case "I4":
      return <GiWoodenHelmet title="Wooden Table" />;
    case "I5":
      return <GiStoneAxe title="Stone Axe" />;
    case "I6":
      return <GiLog title="Wood Log" />;
    case "I7":
      return <GiSpiderWeb title="Silk" />;
    case "I8":
      return <GiMeat title="Meat" />;

    case "S":
      return <GiCampfire title="Player campfire token" />;
    case "P":
      return <GiCompass title="Player position token" />;
    case "T":
      return <AiFillHourglass title="Player time token" />;
    case "X":
      return <GiSpyglass title="Explore for new Locations" />;
    case "M":
      return <GiWalkingBoot title="Move to this location" />;

    case "D":
      return <GiHeartMinus title="Enemy attack" />;
    case "!D":
      return <GiHeartPlus title="Heal Wounds" />;

    case "F":
      return <GiBoneGnawer title="Famine" />;
    case "!F":
      return <GiKnifeFork title="Eat" />;
    case "K":
      return <GiCrossedBones title="Kill this Enemy" />;

    case "M1":
      return <GiSpiderAlt title="Giant Spider" />;
    case "M2":
      return <GiSadCrab title="Giant Crab" />;
    case "M3":
      return <GiFly title="Giant Fly" />;

    case "L1":
      return <GiRiver title="River" />;
    case "L2":
      return <GiForest title="Forest" />;
    case "L3":
      return <GiMountainRoad title="Mountain" />;
    case "L4":
      return <GiGrassMushroom title="Mushroom Forest" />;

    case "HR":
    case "HL":
      return <GiHand title="Player in hand token" />;

    case "B1":
    case "B2":
    case "B3":
    case "B4":
    case "B5":
      return <GiLightBackpack title="Player backpack token" />;

    case "S1":
    case "S2":
    case "S3":
    case "S4":
    case "S5":
      return <GiSwapBag title="Player sack token" />;

    case "C1":
    case "C2":
    case "C3":
    case "C4":
    case "C5":
      return <GiChest title="Player chest token" />;

    case "TP1":
      return <FaHourglassStart title="Morning Time" />;
    case "TP2":
      return <FaHourglassHalf title="Day Time" />;
    case "TP3":
      return <FaHourglassEnd title="Night Time" />;
    case "T1":
      return <FaHourglassStart title="Dawn" />;
    case "T2":
      return <FaHourglassStart title="Morning" />;
    case "T3":
      return <FaHourglassStart title="Noon" />;

    case "T4":
      return <FaHourglassHalf title="Afternoon" />;
    case "T5":
      return <FaHourglassHalf title="Dusk" />;
    case "T6":
      return <FaHourglassHalf title="Evening" />;
    case "T7":
      return <FaHourglassEnd title="Midnight" />;
    case "T8":
      return <FaHourglassEnd title="Night" />;

    default:
      return <BsQuestionDiamond title={`unknown symbol ${children}`} />;
      break;
  }
}
