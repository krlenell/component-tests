"use client";
import { Fragment, useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "@/styles/MultiRangeSlider.module.css";
import "@/styles/slider.css";
import { PriceRange } from "@/types/types";

interface Props {
  min: number;
  max: number;
  setSelectedPriceRange: Dispatch<SetStateAction<PriceRange | null>>;
}

//todo get max value from props
const MultiRangeSlider = (props: Props) => {
  const { min, max, setSelectedPriceRange } = props;
  const priceGap = 2;
  const [minValue, setMinValue] = useState<number>(min);
  const [tempMinValue, setTempMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);
  const [tempMaxValue, setTempMaxValue] = useState<number>(max);

  useEffect(() => {
    console.log("maxValue", maxValue);
    console.log("minValue", minValue);
    setSelectedPriceRange({
      min: minValue,
      max: maxValue,
    });
  }, [maxValue, minValue, setSelectedPriceRange]);

  const toNumber = (s: string) => {
    return parseInt(s, 10);
  };

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
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
                <div>{min}</div>
                <div>{max}</div>
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
              min={min}
              max={max}
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
              min={min}
              max={max}
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
