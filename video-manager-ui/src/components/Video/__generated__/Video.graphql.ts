/**
 * @generated SignedSource<<0b04633b74aaca8ebfda91d63c5366d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Video$data = {
  readonly name: string | null;
  readonly " $fragmentType": "Video";
};
export type Video$key = {
  readonly " $data"?: Video$data;
  readonly " $fragmentSpreads": FragmentRefs<"Video">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Video",
  "selections": [
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

(node as any).hash = "d5e92214a7df1c8c02c16b81562e92c3";

export default node;
