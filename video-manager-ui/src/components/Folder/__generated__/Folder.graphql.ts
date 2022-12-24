/**
 * @generated SignedSource<<e65faa2634a27b57fbe4e8b15b418261>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Folder$data = {
  readonly name: string | null;
  readonly path: string;
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
  "type": "Directory",
  "abstractKey": null
};

(node as any).hash = "844154ae208bedf7f605ce526f0d090d";

export default node;
