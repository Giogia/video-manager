/**
 * @generated SignedSource<<7894ac21b767fea36d54436c8fd44830>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Folder_name$data = {
  readonly name: string;
  readonly " $fragmentType": "Folder_name";
};
export type Folder_name$key = {
  readonly " $data"?: Folder_name$data;
  readonly " $fragmentSpreads": FragmentRefs<"Folder_name">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Folder_name",
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

(node as any).hash = "fbbb3217ac2453651195d674552581b6";

export default node;
