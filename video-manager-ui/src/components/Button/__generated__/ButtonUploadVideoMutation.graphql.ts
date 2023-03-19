/**
 * @generated SignedSource<<db6fd283b1638aee1b52dca02ccaa45e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ButtonUploadVideoMutation$variables = {
  path: string;
  video: any;
};
export type ButtonUploadVideoMutation$data = {
  readonly uploadVideo: {
    readonly " $fragmentSpreads": FragmentRefs<"Explorer_directory">;
  };
};
export type ButtonUploadVideoMutation = {
  response: ButtonUploadVideoMutation$data;
  variables: ButtonUploadVideoMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "path"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "video"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "path",
        "variableName": "path"
      },
      {
        "kind": "Variable",
        "name": "video",
        "variableName": "video"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ButtonUploadVideoMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Directory",
        "kind": "LinkedField",
        "name": "uploadVideo",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ButtonUploadVideoMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Directory",
        "kind": "LinkedField",
        "name": "uploadVideo",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "children",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
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
                  (v2/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "children",
                    "plural": true,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v5/*: any*/),
                        "type": "Directory",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v5/*: any*/),
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
    "cacheID": "c604c33565de2b904f062ef05345b765",
    "id": null,
    "metadata": {},
    "name": "ButtonUploadVideoMutation",
    "operationKind": "mutation",
    "text": "mutation ButtonUploadVideoMutation(\n  $path: String!\n  $video: Upload!\n) {\n  uploadVideo(input: {path: $path, video: $video}) {\n    ...Explorer_directory\n  }\n}\n\nfragment Explorer_directory on Directory {\n  id\n  children {\n    __typename\n    ...VideoFragment\n    ...Folder\n  }\n}\n\nfragment Folder on Directory {\n  id\n  name\n  children {\n    __typename\n    ... on Directory {\n      id\n    }\n    ... on Video {\n      id\n    }\n  }\n}\n\nfragment VideoFragment on Video {\n  id\n  name\n  url\n  size\n}\n"
  }
};
})();

(node as any).hash = "11c4258af6e8ce9c0ea1ac5f828fc8ad";

export default node;
