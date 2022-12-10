/**
 * @generated SignedSource<<547505cf5d6b0934f717123ec7b6e11e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type NameRenameFolderMutation$variables = {
  newName: string;
  oldName: string;
  path: string;
};
export type NameRenameFolderMutation$data = {
  readonly renameDirectory: {
    readonly acknowledged: boolean;
  };
};
export type NameRenameFolderMutation = {
  response: NameRenameFolderMutation$data;
  variables: NameRenameFolderMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "newName"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "oldName"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "path"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "oldName"
          },
          {
            "kind": "Variable",
            "name": "path",
            "variableName": "path"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      },
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "newName"
      }
    ],
    "concreteType": "Result",
    "kind": "LinkedField",
    "name": "renameDirectory",
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NameRenameFolderMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "NameRenameFolderMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "9b1f974fd21deab81736041e6896e0d3",
    "id": null,
    "metadata": {},
    "name": "NameRenameFolderMutation",
    "operationKind": "mutation",
    "text": "mutation NameRenameFolderMutation(\n  $path: String!\n  $oldName: String!\n  $newName: String!\n) {\n  renameDirectory(input: {path: $path, name: $oldName}, name: $newName) {\n    acknowledged\n  }\n}\n"
  }
};
})();

(node as any).hash = "c019e98de6abd74ef58c06020d094557";

export default node;
