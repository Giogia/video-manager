/**
 * @generated SignedSource<<7dabc4be117a1442af5a17052587f535>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ExplorerQuery$variables = {
  name: string;
  path: string;
};
export type ExplorerQuery$data = {
  readonly getDirectory: {
    readonly children: ReadonlyArray<{
      readonly name: string;
    }>;
    readonly path: string;
  };
};
export type ExplorerQuery = {
  response: ExplorerQuery$data;
  variables: ExplorerQuery$variables;
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
    "concreteType": "Directory",
    "kind": "LinkedField",
    "name": "getDirectory",
    "plural": false,
    "selections": [
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
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
    "name": "ExplorerQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ExplorerQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "51cf71ba07c964dc73dc45e970eda2f3",
    "id": null,
    "metadata": {},
    "name": "ExplorerQuery",
    "operationKind": "query",
    "text": "query ExplorerQuery(\n  $path: String!\n  $name: String!\n) {\n  getDirectory(input: {path: $path, name: $name}) {\n    path\n    children {\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "22aa9cf9c88e5b238a044fbc0ae5ab9a";

export default node;
