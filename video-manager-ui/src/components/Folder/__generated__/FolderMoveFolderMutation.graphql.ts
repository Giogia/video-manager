/**
 * @generated SignedSource<<37071adf1a164d3804581b159717cebb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FolderMoveFolderMutation$variables = {
  name: string;
  newPath: string;
  path: string;
};
export type FolderMoveFolderMutation$data = {
  readonly moveDirectory: {
    readonly " $fragmentSpreads": FragmentRefs<"Explorer_directory">;
  };
};
export type FolderMoveFolderMutation = {
  response: FolderMoveFolderMutation$data;
  variables: FolderMoveFolderMutation$variables;
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
  "name": "newPath"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "path"
},
v3 = [
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
  },
  {
    "kind": "Variable",
    "name": "path",
    "variableName": "newPath"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FolderMoveFolderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Directory",
        "kind": "LinkedField",
        "name": "moveDirectory",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Explorer_directory"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "FolderMoveFolderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Directory",
        "kind": "LinkedField",
        "name": "moveDirectory",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Directory",
            "kind": "LinkedField",
            "name": "children",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "path",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Directory",
                "kind": "LinkedField",
                "name": "children",
                "plural": true,
                "selections": [
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f18405bee91a694ab31d6c33d8ba5ae4",
    "id": null,
    "metadata": {},
    "name": "FolderMoveFolderMutation",
    "operationKind": "mutation",
    "text": "mutation FolderMoveFolderMutation(\n  $path: String!\n  $name: String!\n  $newPath: String!\n) {\n  moveDirectory(input: {path: $path, name: $name}, path: $newPath) {\n    ...Explorer_directory\n  }\n}\n\nfragment Explorer_directory on Directory {\n  id\n  children {\n    ...Folder\n  }\n}\n\nfragment Folder on Directory {\n  id\n  name\n  path\n  children {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "23d6a1d8d9a7a16b9b06a06d5a16fa98";

export default node;
