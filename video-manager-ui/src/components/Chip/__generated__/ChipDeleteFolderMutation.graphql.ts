/**
 * @generated SignedSource<<5867ec060713535f1ae1cc96e8f0c1cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChipDeleteFolderMutation$variables = {
  name: string;
  path: string;
};
export type ChipDeleteFolderMutation$data = {
  readonly removeDirectory: {
    readonly acknowledged: boolean;
  };
};
export type ChipDeleteFolderMutation = {
  response: ChipDeleteFolderMutation$data;
  variables: ChipDeleteFolderMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "path"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name"
          },
          {
            "kind": "Variable",
            "name": "path",
            "variableName": "path"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "Result",
    "kind": "LinkedField",
    "name": "removeDirectory",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "acknowledged",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChipDeleteFolderMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChipDeleteFolderMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "142e45edce37e6a4e6c0b80a539235b3",
    "id": null,
    "metadata": {},
    "name": "ChipDeleteFolderMutation",
    "operationKind": "mutation",
    "text": "mutation ChipDeleteFolderMutation(\n  $path: String!\n  $name: String!\n) {\n  removeDirectory(input: {path: $path, name: $name}) {\n    acknowledged\n  }\n}\n"
  }
};
})();

(node as any).hash = "18ad3d6fb87830198c562d935cd7b772";

export default node;
