"use client";
import MultiRangeSlider from "@/components/MultiRangeSlider";
import { Fragment, useEffect, useState } from "react";
import { PriceRange } from "@/types/types";

export default function Home() {
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<PriceRange | null>(null);

  useEffect(() => {
    console.log("selectedPriceRange", selectedPriceRange);
  }, [selectedPriceRange]);

  return (
    <Fragment>
      <MultiRangeSlider
        min={0}
        max={100}
        setSelectedPriceRange={setSelectedPriceRange}
      />
    </Fragment>
  );
}
