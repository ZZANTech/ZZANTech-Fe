"use client";
import useKnowhowsQuery from "@/store/queries/useKnowhowsQuery";

import KnowhowFilter from "./KnowhowFilter";
import KnowhowList from "./KnowhowList";
import KnowhowPagination from "./KnowhowPagination";
import { useState } from "react";

function KnowhowContainer() {
  const { data: knowhows, isPending, error } = useKnowhowsQuery();
  knowhows && console.log(knowhows);
  // 여기서 fetching 후 filtering 후 list로 보내주기

  return (
    <section>
      <KnowhowFilter />
      <KnowhowList />
      <KnowhowPagination />
    </section>
  );
}

export default KnowhowContainer;
