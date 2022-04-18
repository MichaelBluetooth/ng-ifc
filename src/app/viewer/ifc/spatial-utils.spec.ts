import { IFCGroupNode } from 'src/app/models/ifc-group-node';
import { IFCNode } from 'src/app/models/ifc-node';
import { IFCRootNode } from 'src/app/models/ifc-root-node';
import { buildTree, getAllIds, recurseTree } from './spatial-utils';

describe('Test: Spatial Utilities', () => {
  it('groups elements under a storey ', () => {
    const spatial: IFCRootNode = {
      expressID: 1,
      type: 'IFCPROJECT',
      children: [
        {
          GlobalId: { type: 1, value: '' },
          expressID: 2,
          Name: { type: 1, value: '' },
          type: 'IFCBUILDINGSTOREY',
          children: [
            {
              GlobalId: { type: 1, value: '' },
              expressID: 3,
              Name: { type: 1, value: '' },
              type: 'IFCWALL',
              children: [],
            },
            {
              GlobalId: { type: 1, value: '' },
              expressID: 4,
              Name: { type: 1, value: '' },
              type: 'IFCROOF',
              children: [],
            },
          ],
        },
      ],
    };

    const spatialWithGroups = buildTree(spatial);
    expect(1).toBe(2);
  });

  it('groups elements under a storey ', () => {
    const spatial: IFCRootNode = {
      expressID: 1,
      type: 'IFCPROJECT',
      children: [
        {
          GlobalId: { type: 1, value: '' },
          expressID: 2,
          Name: { type: 1, value: '' },
          type: 'IFCBUILDINGSTOREY',
          children: [
            {
              GlobalId: { type: 1, value: '' },
              expressID: 3,
              Name: { type: 1, value: '' },
              type: 'IFCWALL',
              children: [],
            },
            {
              GlobalId: { type: 1, value: '' },
              expressID: 4,
              Name: { type: 1, value: '' },
              type: 'IFCROOF',
              children: [],
            },
          ],
        },
      ],
    };

    const allElements: any[] = [];
    recurseTree(spatial, (node: IFCNode, parent: IFCNode) => {
      allElements.push({
        parentId: parent?.expressID ?? null,
        virtualId: node.expressID,
        node: node,
      });
    });

    expect(allElements.length).toBe(4);
    const storeys = allElements.filter(
      (element) => element.node.type === 'IFCBUILDINGSTOREY'
    );
    expect(storeys.length).toBe(1);
    storeys.forEach((storey) => {
      const storeyGroups: any = {};

      const storeyChildren = allElements.filter(
        (el) => el.parentId === storey.virtualId
      );
      storeyChildren.forEach((storeyChild) => {
        if (!storeyGroups[storeyChild.node.type]) {
          storeyGroups[storeyChild.node.type] = [];
        }

        storeyChild.parentId = `${storey.virtualId}_${storeyChild.node.type}`;
        storeyGroups[storeyChild.node.type].push(storeyChild);
      });

      const groupedChildren: any[] = [];
      Object.keys(storeyGroups).forEach((groupName: string) => {
        const group: IFCGroupNode = {
          Name: { type: -1, value: groupName },
          children: storeyGroups[groupName],
          isGroup: true,
        };
        allElements.push({
          parentId: storey.virtualId,
          virtualId: `${storey.virtualId}_${groupName}`,
          node: group,
        });
      });
    });

    allElements.forEach((el) => {
      el.node.children = allElements
        .filter((otherEl) => el.virtualId === otherEl.parentId)
        .map((child) => child.node);
    });

    const rootIdx = allElements.findIndex((el) => !!el.parentId);
    const root = allElements.splice(rootIdx, 1)[0];
    expect(root).toBeDefined();
  });

  it('iterates all nodes in the tree', () => {
    const spatial: IFCRootNode = {
      expressID: 1,
      type: 'something',
      children: [
        {
          GlobalId: { type: 1, value: '' },
          expressID: 2,
          Name: { type: 1, value: '' },
          type: 'something',
          children: [],
        },
        {
          GlobalId: { type: 1, value: '' },
          expressID: 3,
          Name: { type: 1, value: '' },
          type: 'something',
          children: [
            {
              GlobalId: { type: 1, value: '' },
              expressID: 4,
              Name: { type: 1, value: '' },
              type: 'something',
              children: [],
            },
          ],
        },
      ],
    };

    const ids: number[] = getAllIds(spatial);
    expect(ids).toEqual([1, 2, 3, 4]);
  });
});
