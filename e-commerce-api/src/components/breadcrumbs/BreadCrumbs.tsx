import React from "react";
import { Params, useMatches } from "react-router-dom";

export default function BreadCrumbs() {
  interface IMatches {
    id: string;
    pathname: string;
    params: Params<string>;
    data: unknown;
    handle: unknown;
  }

  return <div></div>;
}
