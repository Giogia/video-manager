/**
 * @generated SignedSource<<e690ef10a31e8b6b72c1748bfaa7668c>>
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
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
  (v4/*: any*/)
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
            "concreteType": null,
            "kind": "LinkedField",
            "name": "children",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "size",
                    "storageKey": null
                  }
                ],
                "type": "Video",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "children",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v7/*: any*/),
                        "type": "Directory",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v7/*: any*/),
                        "type": "Video",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "Directory",
                "abstractKey": null
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
    "cacheID": "c4c2e8211a3fd4c8acc213bb8d7bbd0a",
    "id": null,
    "metadata": {},
    "name": "FolderMoveFolderMutation",
    "operationKind": "mutation",
    "text": "mutation FolderMoveFolderMutation(\n  $path: String!\n  $name: String!\n  $newPath: String!\n) {\n  moveDirectory(input: {path: $path, name: $name}, path: $newPath) {\n    ...Explorer_directory\n  }\n}\n\nfragment Explorer_directory on Directory {\n  id\n  children {\n    __typename\n    ...VideoFragment\n    ...Folder\n  }\n}\n\nfragment Folder on Directory {\n  id\n  name\n  children {\n    __typename\n    ... on Directory {\n      id\n    }\n    ... on Video {\n      id\n    }\n  }\n}\n\nfragment VideoFragment on Video {\n  id\n  name\n  url\n  size\n}\n"
  }
};
})();

(node as any).hash = "23d6a1d8d9a7a16b9b06a06d5a16fa98";

export default node;
