import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import CytoscapeComponent from 'react-cytoscapejs';
import Game from '../types/Game';
import styles from './RootElement.module.css';

Cytoscape.use(COSEBilkent);

export default function RootElement({game}: {game: Game}){
  const elements = [
    { data: { id: 'one', label: 'Node 1' } },
    { data: { id: 'two', label: 'Node 2' } },
    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
 ];

 

 const layout = { name: 'cose-bilkent' };

 return <CytoscapeComponent elements={elements} className={styles.RootElement} layout={layout} />;

}