/**
 * @generated SignedSource<<87b1e666362ddfffb8c0c4eb8576bb4e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ButtonAddFolderMutation$variables = {
  name: string;
  path: string;
};
export type ButtonAddFolderMutation$data = {
  readonly addDirectory: {
    readonly " $fragmentSpreads": FragmentRefs<"Explorer_directory">;
  };
};
export type ButtonAddFolderMutation = {
  response: ButtonAddFolderMutation$data;
  variables: ButtonAddFolderMutation$variables;
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "path",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ButtonAddFolderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Directory",
        "kind": "LinkedField",
        "name": "addDirectory",
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
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ButtonAddFolderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Directory",
        "kind": "LinkedField",
        "name": "addDirectory",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v3/*: any*/),
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
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "47363e391b60762a254723b1d41b2ae9",
    "id": null,
    "metadata": {},
    "name": "ButtonAddFolderMutation",
    "operationKind": "mutation",
    "text": "mutation ButtonAddFolderMutation(\n  $path: String!\n  $name: String!\n) {\n  addDirectory(input: {path: $path, name: $name}) {\n    ...Explorer_directory\n  }\n}\n\nfragment Explorer_directory on Directory {\n  id\n  path\n  children {\n    ...Folder\n  }\n}\n\nfragment Folder on Directory {\n  name\n  path\n}\n"
  }
};
})();

(node as any).hash = "c817ec2eaf756a671e0a74c3e08bd92d";

export default node;
