/**
 * @generated SignedSource<<df721172b40310da7c541930fe382aa3>>
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
    readonly " $fragmentSpreads": FragmentRefs<"Folder">;
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
      "concreteType": "Directory",
      "kind": "LinkedField",
      "name": "children",
      "plural": true,
      "selections": [
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

(node as any).hash = "7ebd0ebef857671943f86d07eaa1df81";

export default node;
