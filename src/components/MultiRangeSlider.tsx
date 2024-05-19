"use client";
import { Fragment, useState, useEffect } from "react";
import styles from "@/styles/MultiRangeSlider.module.css";
import "@/styles/slider.css";

//todo get max value from props
const MultiRangeSlider = () => {
  const globalMin = 0;
  const globalMax = 64;
  const dummyMinVal = 3;
  const dummyMaxVal = 16;
  const priceGap = 2;
  const [maxValue, setMaxValue] = useState<number>(dummyMaxVal);
  const [tempMaxValue, setTempMaxValue] = useState<number>(dummyMaxVal); //todo switch to ref
  const [minValue, setMinValue] = useState<number>(dummyMinVal);
  const [tempMinValue, setTempMinValue] = useState<number>(dummyMinVal);

  useEffect(() => {
    console.log("maxValue", maxValue);
    console.log("minValue", minValue);
  }, [maxValue, minValue]);

  const toNumber = (s: string) => {
    return parseInt(s, 10);
  };

  const getPercentage = (val: number) => {
    return ((val - globalMin) / (globalMax - globalMin)) * 100;
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = toNumber(e.target.value);
    if (val <= maxValue - priceGap) {
      setTempMinValue(val);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = toNumber(e.target.value);
    if (val >= minValue + priceGap) {
      setTempMaxValue(val);
    }
  };

  const handleMinRelease = () => {
    if (tempMinValue <= maxValue - priceGap) {
      setMinValue(tempMinValue);
    }
  };

  const handleMaxRelease = () => {
    if (tempMaxValue >= minValue + priceGap) {
      setMaxValue(tempMaxValue);
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
                  left: `calc(${getPercentage(tempMinValue)}%)`,
                  right: `calc(${100 - getPercentage(tempMaxValue)}%)`,
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
                left: `calc(${getPercentage(tempMinValue)}% + (${-18 - tempMinValue * 0.15}px))`,
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
              onChange={handleMinChange}
              onMouseUp={handleMinRelease}
              onTouchEnd={handleMinRelease}
            />
            <input
              id="maxRange"
              className="priceRange"
              type="range"
              min={globalMin}
              max={globalMax}
              value={tempMaxValue}
              step="1"
              onChange={handleMaxChange}
              onMouseUp={handleMaxRelease}
              onTouchEnd={handleMaxRelease}
            />
            <output
              className={styles.bubble}
              style={{
                left: `calc(${getPercentage(tempMaxValue)}% + (${-18 - tempMaxValue * 0.15}px))`,
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
