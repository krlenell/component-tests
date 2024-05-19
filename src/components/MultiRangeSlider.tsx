"use client";
import { Fragment, useState, useEffect } from "react";
import styles from "@/styles/MultiRangeSlider.module.css";
import "@/styles/slider.css";

//todo get max value from props
const MultiRangeSlider = () => {
  const globalMin = 0;
  const globalMax = 100;
  const dummyMinVal = 3;
  const dummyMaxVal = 16;
  const [maxValue, setMaxValue] = useState<number>(dummyMaxVal);
  const [tempMaxValue, setTempMaxValue] = useState<number>(dummyMaxVal); //todo switch to ref
  const [minValue, setMinValue] = useState<number>(dummyMinVal);
  const [tempMinValue, setTempMinValue] = useState<number>(dummyMinVal);

  const toNumber = (s: string) => {
    return parseInt(s, 10);
  };

  const getPercentage = (val: number) => {
    ((val - globalMin) / (globalMax - globalMin)) * 100;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e);
    if (e.target.id === "minRange") {
      setTempMinValue(toNumber(e.target.value));
    }
    if (e.target.id === "maxRange") {
      setTempMaxValue(toNumber(e.target.value));
    }
  };
  return (
    <Fragment>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.priceInputContainer}>
            <div className={styles.sliderContainer}>
              <div
                className={styles.priceSlider}
                style={{
                  left: `calc(${tempMinValue}%)`,
                  right: `calc(${100 - tempMaxValue}%)`,
                }}
              ></div>
            </div>
            {/* //maybe delete this */}
            <div className="absolute w-full">
              <div className="flex justify-between text-black">
                <div>{globalMin}</div>
                <div>{globalMax}</div>
              </div>
            </div>
          </div>
          <div className={styles.rangeInput}>
            <output
              className={styles.bubble}
              style={{
                left: `calc(${tempMinValue}% + (${-18 - tempMinValue * 0.15}px))`,
              }}
            >
              {tempMinValue}
            </output>
            <input
              id="minRange"
              className="priceRange"
              type="range"
              min={globalMin}
              max={globalMax}
              value={tempMinValue}
              step="1"
              onChange={handleChange}
            />
            <input
              id="maxRange"
              className="priceRange"
              type="range"
              min={globalMin}
              max={globalMax}
              value={tempMaxValue}
              step="1"
              onChange={handleChange}
            />
            <output
              className={styles.bubble}
              style={{
                left: `calc(${tempMaxValue}% + (${-18 - tempMaxValue * 0.15}px))`,
              }}
            >
              {tempMaxValue}
            </output>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MultiRangeSlider;
