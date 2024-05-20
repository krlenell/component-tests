"use client";
import {
  Fragment,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
  MutableRefObject,
  RefObject,
} from "react";
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
  const priceGap = (min + max) * 0.15;
  const [minValue, setMinValue] = useState<number>(min);
  const [tempMinValue, setTempMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);
  const [tempMaxValue, setTempMaxValue] = useState<number>(max);

  const minSliderRef = useRef(null);
  const maxSliderRef = useRef(null);

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

  const calculateTooltipPosition = (
    sliderRef: RefObject<HTMLInputElement>,
    value: number,
  ) => {
    if (!sliderRef.current) return 0;
    const slider = sliderRef.current;
    const percentage = (value - min) / (max - min);
    const thumbWidth = 24; // Width of the thumb
    const tooltipWidth = 40; // Approximate width of the tooltip
    const offset = percentage * (slider.clientWidth - thumbWidth);
    return offset + thumbWidth / 2 - tooltipWidth / 2;
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
      <div className="w-[300px] rounded-xl p-5 relative">
        <div>
          <div className="h-[5px] relative bg-[#595959] rounded-[5px]">
            <div
              className="h-full absolute rounded-[5px] bg-white"
              style={{
                left: `calc(${getPercentage(tempMinValue)}%)`,
                right: `calc(${100 - getPercentage(tempMaxValue)}%)`,
              }}
            ></div>
          </div>
        </div>
        <div className="rangeInput relative">
          <div
            className="rangeValue"
            style={{
              left: `calc(${calculateTooltipPosition(minSliderRef, tempMinValue) + 18}px)`,
              transform: "translateX(-50%)",
            }}
          >
            {tempMinValue}
          </div>
          <div
            className="rangeValue"
            style={{
              left: `calc(${calculateTooltipPosition(maxSliderRef, tempMaxValue)}px)`,
            }}
          >
            {tempMaxValue}
          </div>

          <input
            id="minRange"
            ref={minSliderRef}
            className="slider"
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
            ref={maxSliderRef}
            className="slider"
            type="range"
            min={min}
            max={max}
            value={tempMaxValue}
            step="1"
            onChange={handleMaxChange}
            onMouseUp={handleMaxRelease}
            onTouchEnd={handleMaxRelease}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default MultiRangeSlider;
