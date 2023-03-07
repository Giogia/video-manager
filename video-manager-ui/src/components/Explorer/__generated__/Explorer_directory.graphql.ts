/**
 * @generated SignedSource<<2d4b7016a024f277b0c91037ee36f739>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Explorer_directory$data = {
  readonly children: ReadonlyArray<{
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"Folder" | "VideoFragment">;
  }>;
  readonly id: string;
  readonly " $fragmentType": "Explorer_directory";
};
export type Explorer_directory$key = {
  readonly " $data"?: Explorer_directory$data;
  readonly " $fragmentSpreads": FragmentRefs<"Explorer_directory">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Explorer_directory",
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "children",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "VideoFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Folder"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Directory",
  "abstractKey": null
};

(node as any).hash = "6cb7605a95bf5dd1b99d153cf2bf77b3";

export default node;
