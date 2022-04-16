import { IFCNode } from 'src/app/models/ifc-node';
import { IFCRootNode } from 'src/app/models/ifc-root-node';

function recurseTree(root: IFCRootNode | IFCNode, callback: Function) {
  callback(root);

  root.children.forEach((child: IFCNode) => {
    recurseTree(child, callback);
  });
}

function getAllIds(spatialStruct: IFCRootNode): number[] {
  const allIds: number[] = [];
  recurseTree(spatialStruct, (node: IFCRootNode) => {
    allIds.push(node.expressID);
  });
  return allIds;
}

export { recurseTree, getAllIds };
