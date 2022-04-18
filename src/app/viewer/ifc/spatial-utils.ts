import { IFCNode } from 'src/app/models/ifc-node';
import { IFCRootNode } from 'src/app/models/ifc-root-node';
import { SpatialTreeNode } from 'src/app/models/spatial-tree-node';

function groupChildren(parentId: any, children: IFCNode[]) {
  const groups: any = {};
  const groupLess: any = [];
  for (let node of children) {
    const nodeType = node.type || 'UNKNOWN';
    if (nodeType) {
      if (!groups[nodeType]) {
        groups[nodeType] = [];
      }
      groups[nodeType].push(node);
    } else {
      groupLess.push(node);
    }
  }

  let ret: any[] = children;
  if (Object.keys(groups).length > 0) {
    ret = Object.entries(groups).map((kv) => {
      return {
        Name: { type: -1, value: kv[0] },
        type: kv[0],
        children: kv[1],
        isGroup: true,
      };
    });
    ret = ret.concat(groupLess);
    // ret.push({
    //   Name: { type: -1, value: 'Undefined' },
    //   children: groupLess,
    //   isGroup: true,
    // });
  }
  return ret;
}

function groupStoreyElements(root: IFCRootNode | IFCNode) {
  let children = root.children;
  if (root.type === 'IFCBUILDINGSTOREY') {
    children = groupChildren(root.expressID, root.children);
    children.sort((a: any, b: any) => {
      if (a.Name.value > b.Name.value) return 1;
      else return -1;
    });
  }
  for (let child of root.children) {
    groupStoreyElements(child);
  }
  root.children = children;
}

function recurseTree(
  root: IFCRootNode | IFCNode,
  callback: Function,
  parent: any = null
) {
  callback(root, parent);

  root.children.forEach((child: IFCNode) => {
    recurseTree(child, callback, root);
  });
}

function getAllIds(spatialStruct: IFCRootNode): number[] {
  const allIds: number[] = [];
  recurseTree(spatialStruct, (node: IFCRootNode) => {
    allIds.push(node.expressID);
  });
  return allIds;
}

function buildTreeNode(ifcNode: any, parentId: any = null, collapsed: boolean = false): SpatialTreeNode {
  const node: SpatialTreeNode = {
    highlighted: false,
    hidden: false,
    collapsed: !!ifcNode.isGroup || collapsed,
    isGroup: ifcNode.isGroup,
    nodeId: ifcNode.expressID || `hz_group_${parentId}_${ifcNode.type}`,
    label: ifcNode.Name?.value || ifcNode.type,
    data: ifcNode,
    children: [],
  };

  collapsed = node.collapsed;
  for (let child of ifcNode.children) {
    node.children.push(
      buildTreeNode(child, ifcNode.expressID, collapsed)
    );
  }

  return node;
}

export { recurseTree, getAllIds, groupStoreyElements, buildTreeNode };
