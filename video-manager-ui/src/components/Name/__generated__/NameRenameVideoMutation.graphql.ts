/**
 * @generated SignedSource<<82e2c2d016d8e09b6ae31596fb28ce0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NameRenameVideoMutation$variables = {
  newName: string;
  oldName: string;
  path: string;
};
export type NameRenameVideoMutation$data = {
  readonly renameVideo: {
    readonly " $fragmentSpreads": FragmentRefs<"Explorer_directory">;
  };
};
export type NameRenameVideoMutation = {
  response: NameRenameVideoMutation$data;
  variables: NameRenameVideoMutation$variables;
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
    "name": "NameRenameVideoMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Directory",
        "kind": "LinkedField",
        "name": "renameVideo",
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
    "name": "NameRenameVideoMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Directory",
        "kind": "LinkedField",
        "name": "renameVideo",
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
    "cacheID": "a06068f1eb0b91561711a8896a0fa206",
    "id": null,
    "metadata": {},
    "name": "NameRenameVideoMutation",
    "operationKind": "mutation",
    "text": "mutation NameRenameVideoMutation(\n  $path: String!\n  $oldName: String!\n  $newName: String!\n) {\n  renameVideo(input: {path: $path, name: $oldName}, name: $newName) {\n    ...Explorer_directory\n  }\n}\n\nfragment Explorer_directory on Directory {\n  id\n  children {\n    __typename\n    ...VideoFragment\n    ...Folder\n  }\n}\n\nfragment Folder on Directory {\n  id\n  name\n  children {\n    __typename\n    ... on Directory {\n      id\n    }\n    ... on Video {\n      id\n    }\n  }\n}\n\nfragment VideoFragment on Video {\n  id\n  name\n  url\n  size\n}\n"
  }
};
})();

(node as any).hash = "50cdbe221b9f885d5bdd489cbe2dd254";

export default node;
