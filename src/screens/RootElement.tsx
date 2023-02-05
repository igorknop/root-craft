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

export default function RootElement() {
  const elements: Array<NodeElement | EdgeElement> = [
    // { data: { id: "type_items", label: "Items", type: "item" } },
    // { data: { id: "type_locations", label: "Locations", type: "place" } },
    // { data: { id: "type_enemies", label: "Enemies", type: "enemy" } },
  ];
  
  const data = InitialGameState;
  const allPlaces = [...data.places, ...data.lockedPlaces];
  const allItems = [...data.items, ...data.lockedItems];
  const allEnemies = [...data.enemies, ...data.lockedEnemies];
  allPlaces.forEach((place) => {
    elements.push({
      data: { id: place.id, label: place.name, type: place.type },
    });
    // elements.push({
    //   data: {
    //     source: "type_locations",
    //     target: place.id,
    //     label: "is_location",
    //     type: "is_location",
    //   },
    // });
  });
  allItems.forEach((item) => {
    elements.push({ data: { id: item.id, label: item.name, type: item.type } });
    // elements.push({
    //   data: {
    //     source: "type_items",
    //     target: item.id,
    //     label: "is_item",
    //     type: "is_item",
    //   },
    // });
  });

  allEnemies.forEach((enemy) => {
    elements.push({
      data: { id: enemy.id, label: enemy.name, type: enemy.type },
    });
    // elements.push({
    //   data: {
    //     source: "type_enemies",
    //     target: enemy.id,
    //     label: "is_enemy",
    //     type: "is_enemy",
    //   },
    // });
  });

  allItems.forEach((item) => {
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
    item.actions.forEach((action, a) => {
      const actionID = `${item.id}_act_${a}`;
      elements.push({
        data: {
          id: actionID,
          label: actionID,
          type: "action",
        },
      });
      elements.push({
        data: {
          source: item.id,
          target: actionID,
          label: "is_action",
          type: "action",
        },
      });
      action.produce.forEach((produced) => {
        if (
          elements.find((e) => {
            if (e.data["id"] === produced) {
              return true;
            }
          }) === undefined
        ) {
          elements.push({
            data: {
              id: produced,
              label: produced,
              type: "effect",
            },
          });
        }

        elements.push({
          data: {
            source: actionID,
            target: produced,
            label: "produces",
            type: "produce",
          },
        });
      });
    });
  });

  allPlaces.forEach((place) => {
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
    place.actions.forEach((action, a) => {
      const actionID = `${place.id}_act_${a}`;
      elements.push({
        data: {
          id: actionID,
          label: actionID,
          type: "action",
        },
      });
      elements.push({
        data: {
          source: place.id,
          target: actionID,
          label: "is_action",
          type: "action",
        },
      });
      action.produce.forEach((produced) => {
        if (
          elements.find((e) => {
            if (e.data["id"] === produced) {
              return true;
            }
          }) === undefined
        ) {
          elements.push({
            data: {
              id: produced,
              label: produced,
              type: "effect",
            },
          });
        }

        elements.push({
          data: {
            source: actionID,
            target: produced,
            label: "produces",
            type: "produce",
          },
        });
      });
    });
  });

  allEnemies.forEach((enemy) => {
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
    enemy.actions.forEach((action, a) => {
      const actionID = `${enemy.id}_act_${a}`;
      elements.push({
        data: {
          id: actionID,
          label: actionID,
          type: "action",
        },
      });
      elements.push({
        data: {
          source: enemy.id,
          target: actionID,
          label: "is_action",
          type: "action",
        },
      });
      action.produce.forEach((produced) => {
        if (
          elements.find((e) => {
            if (e.data["id"] === produced) {
              return true;
            }
          }) === undefined
        ) {
          elements.push({
            data: {
              id: produced,
              label: produced,
              type: "effect",
            },
          });
        }

        elements.push({
          data: {
            source: actionID,
            target: produced,
            label: "produces",
            type: "produce",
          },
        });
      });
    });
  });
  const layout = { name: "cose-bilkent" };

  return (
    <main>
      <CytoscapeComponent
        elements={elements}
        className={styles.RootElement}
        layout={layout}
        wheelSensitivity={0.1}
        stylesheet={[
          {
            selector: "node",
            style: {
              label: function (e) {
                if (e.data("id") === e.data("label")) {
                  return ` ${e.data("id")}`;
                } else {
                  return ` ${e.data("id")}\n${e.data("label")} `;
                }
              },
              width: "label",
              "text-valign": "center",
              "text-halign": "center",
              shape: "rectangle",
              "background-color": "lightblue",
              "border-color": "black",
              "border-style": "solid",
              "border-width": 1,
              "font-size": 8,
              "text-wrap": "wrap",
              "text-max-width": "100px",
              "padding-left": "2px",
              "padding-right": "2px",
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
            selector: "node[type='action']",
            style: {
              shape: "ellipse",
              "background-color": "lightgray",
            },
          },
          {
            selector: "node[type='effect']",
            style: {
              shape: "octagon",
              "background-color": "orange",
              width: 30,
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
            selector: 'edge[type="unlocks"]',
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
          {
            selector: 'edge[type="produce"]',
            style: {
              width: 2,
              "line-dash-pattern": [2, 2],
              "line-fill": "solid",
              color: "orange",
              "target-arrow-shape": "triangle",
              "line-color": "orange",
              "target-arrow-color": "orange",
            },
          },
        ]}
      />
    </main>
  );
}
