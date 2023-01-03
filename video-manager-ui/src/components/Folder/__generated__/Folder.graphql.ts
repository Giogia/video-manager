/**
 * @generated SignedSource<<f6e6ff806fe0b6b831a37681fbf75538>>
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
    readonly id: string;
  }>;
  readonly id: string;
  readonly name: string | null;
  readonly path: string;
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
};
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
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Directory",
  "abstractKey": null
};
})();

(node as any).hash = "933840c67593e962cb75b55748826f4b";

export default node;
