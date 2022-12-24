/**
 * @generated SignedSource<<7e1511dc29bcf2910e120d7992a1aaeb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExplorerQuery$variables = {
  path: string;
};
export type ExplorerQuery$data = {
  readonly getDirectory: {
    readonly " $fragmentSpreads": FragmentRefs<"Explorer_directory">;
  };
};
export type ExplorerQuery = {
  response: ExplorerQuery$data;
  variables: ExplorerQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "path"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "path",
        "variableName": "path"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExplorerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Directory",
        "kind": "LinkedField",
        "name": "getDirectory",
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ExplorerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Directory",
        "kind": "LinkedField",
        "name": "getDirectory",
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
    "cacheID": "095db976de9e20b98cabe35b1b647978",
    "id": null,
    "metadata": {},
    "name": "ExplorerQuery",
    "operationKind": "query",
    "text": "query ExplorerQuery(\n  $path: String!\n) {\n  getDirectory(input: {path: $path}) {\n    ...Explorer_directory\n  }\n}\n\nfragment Explorer_directory on Directory {\n  id\n  children {\n    ...Folder\n  }\n}\n\nfragment Folder on Directory {\n  name\n  path\n}\n"
  }
};
})();

(node as any).hash = "5beb06e624cd4cf6163acfaf4bc6c50d";

export default node;
