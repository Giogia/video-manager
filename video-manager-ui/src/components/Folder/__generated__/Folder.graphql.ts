/**
 * @generated SignedSource<<a0859b33bc75c0468582be1c187a6079>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Folder$data = {
  readonly children: ReadonlyArray<{
    readonly id?: string;
  }>;
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "Folder";
};
export type Folder$key = {
  readonly " $data"?: Folder$data;
  readonly " $fragmentSpreads": FragmentRefs<"Folder">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Folder",
  "selections": [
    (v0/*: any*/),
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "children",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": (v1/*: any*/),
          "type": "Directory",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v1/*: any*/),
          "type": "Video",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Directory",
  "abstractKey": null
};
})();

(node as any).hash = "8baeef90867a80875a8f517a8a878480";

export default node;
