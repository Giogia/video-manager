/**
 * @generated SignedSource<<050c94d7c5859afe8a07c4bdb704c535>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VideoFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly size: number;
  readonly url: string;
  readonly " $fragmentType": "VideoFragment";
};
export type VideoFragment$key = {
  readonly " $data"?: VideoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"VideoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VideoFragment",
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
    },
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
};

(node as any).hash = "dc8add3d59d16506545af3a461b409f8";

export default node;
