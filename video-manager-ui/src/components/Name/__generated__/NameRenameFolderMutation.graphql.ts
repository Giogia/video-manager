/**
 * @generated SignedSource<<52e9cf9b84f6ed524aca0a2b5dd9b985>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NameRenameFolderMutation$variables = {
  newName: string;
  oldName: string;
  path: string;
};
export type NameRenameFolderMutation$data = {
  readonly renameDirectory: {
    readonly " $fragmentSpreads": FragmentRefs<"Explorer_directory">;
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
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Directory",
        "kind": "LinkedField",
        "name": "renameDirectory",
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
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "NameRenameFolderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Directory",
        "kind": "LinkedField",
        "name": "renameDirectory",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
    "cacheID": "f19614917606ee88ddac26930c15db75",
    "id": null,
    "metadata": {},
    "name": "NameRenameFolderMutation",
    "operationKind": "mutation",
    "text": "mutation NameRenameFolderMutation(\n  $path: String!\n  $oldName: String!\n  $newName: String!\n) {\n  renameDirectory(input: {path: $path, name: $oldName}, name: $newName) {\n    ...Explorer_directory\n  }\n}\n\nfragment Explorer_directory on Directory {\n  id\n  children {\n    ...Folder\n  }\n}\n\nfragment Folder on Directory {\n  name\n  path\n}\n"
  }
};
})();

(node as any).hash = "2888c921dcd8cbad67084f2ab46654fd";

export default node;
