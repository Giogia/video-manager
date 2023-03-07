/**
 * @generated SignedSource<<7d0cca39f05c45b40c011ae0cd844fb1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Folder$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "Folder";
};
export type Folder$key = {
  readonly " $data"?: Folder$data;
  readonly " $fragmentSpreads": FragmentRefs<"Folder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Folder",
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
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Directory",
  "abstractKey": null
};

(node as any).hash = "699328296b843c7471336a70674a3eb3";

export default node;
