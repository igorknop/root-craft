import Cytoscape from "cytoscape";
import COSEBilkent from "cytoscape-cose-bilkent";
import CytoscapeComponent from "react-cytoscapejs";
import { InitialGameState } from "../InitialGameState";
import Game from "../types/Game";
import styles from "./RootElement.module.css";

Cytoscape.use(COSEBilkent);

interface NodeElement {
  data: {
    id: string;
    label: string;
    type: string;
  };
}
interface EdgeElement {
  data: {
    source: string;
    target: string;
    label: string;
    type: string;
  };
}

export default function RootElement({ game }: { game: Game }) {
  const elements: Array<NodeElement | EdgeElement> = [
    { data: { id: "type_items", label: "Items", type: "item" } },
    { data: { id: "type_locations", label: "Locations", type: "place" } },
    { data: { id: "type_enemies", label: "Enemies", type: "enemy" } },
  ];

  const data = InitialGameState;
  data.places.forEach((place) => {
    elements.push({
      data: { id: place.id, label: place.name, type: place.type },
    });
    elements.push({
      data: {
        source: "type_locations",
        target: place.id,
        label: "is_location",
        type: "is_location",
      },
    });
  });

  data.items.forEach((item) => {
    elements.push({ data: { id: item.id, label: item.name, type: item.type } });
    elements.push({
      data: {
        source: "type_items",
        target: item.id,
        label: "is_item",
        type: "is_item",
      },
    });
  });

  data.enemies.forEach((enemy) => {
    elements.push({
      data: { id: enemy.id, label: enemy.name, type: enemy.type },
    });
    elements.push({
      data: {
        source: "type_enemies",
        target: enemy.id,
        label: "is_enemy",
        type: "is_enemy",
      },
    });
  });

  data.items.forEach((item) => {
    item.unlocks.forEach((unlock) => {
      elements.push({
        data: {
          source: item.id,
          target: unlock,
          label: "unlocks",
          type: "unlocks",
        },
      });
    });
  });

  data.places.forEach((place) => {
    place.unlocks.forEach((unlock) => {
      elements.push({
        data: {
          source: place.id,
          target: unlock,
          label: "unlocks",
          type: "unlocks",
        },
      });
    });
  });

  data.enemies.forEach((enemy) => {
    enemy.unlocks.forEach((unlock) => {
      elements.push({
        data: {
          source: enemy.id,
          target: unlock,
          label: "unlocks",
          type: "unlocks",
        },
      });
    });
  });
  const layout = { name: "cose-bilkent" };

  return (
    <CytoscapeComponent
      elements={elements}
      className={styles.RootElement}
      layout={layout}
      stylesheet={[
        {
          selector: "node",
          style: {
            label: function (e) {
              return `${e.data("id")}: ${e.data("label")}`;
            },
            "text-valign": "top",
            "text-halign": "center",
            shape: "rectangle",
            "background-color": "lightblue",
            "border-color": "black",
            "border-style": "solid",
            "border-width": 1,
          },
        },
        {
          selector: "edge",
          style: {
            width: 1,
            "target-distance-from-node": 3,
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
          },
        },
        {
          selector: "node[type='place']",
          style: {
            shape: "rectangle",
            "background-color": "lightblue",
          },
        },
        {
          selector: "node[type='item']",
          style: {
            shape: "rectangle",
            "background-color": "lightyellow",
          },
        },
        {
          selector: "node[type='enemy']",
          style: {
            shape: "rectangle",
            "background-color": "lightpink",
          },
        },
        {
          selector: "node#type_locations",
          style: {
            "background-color": "lightblue",
            "border-width": 2,
          },
        },
        {
          selector: "node#type_items",
          style: {
            "background-color": "lightyellow",
            "border-width": 2,
          },
        },
        {
          selector: "node#type_enemies",
          style: {
            "background-color": "lightpink",
            "border-width": 2,
          },
        },
        {
          selector: 'edge[source="type_locations"]',
          style: {
            width: 1,
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "mid-target-arrow-color": "lightblue",
            "line-opacity": 0.8,
            "target-arrow-color": "lightblue",
            "line-color": "lightblue",
          },
        },
        {
          selector: 'edge[source="type_items"]',
          style: {
            width: 1,
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "line-opacity": 0.8,
            "target-arrow-color": "orange",
            "line-color": "orange",
          },
        },
        {
          selector: 'edge[source="type_enemies"]',
          style: {
            width: 1,
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "line-opacity": 0.8,
            "target-arrow-color": "lightpink",
            "line-color": "lightpink",
          },
        },
        {
          selector: 'edge[label="unlocks"]',
          style: {
            width: 2,
            "line-dash-pattern": [2, 2],
            "line-fill": "solid",
            color: "green",
            "target-arrow-shape": "triangle",
            "line-color": "data(color)",
            "target-arrow-color": "green",
          },
        },
      ]}
    />
  );
}
