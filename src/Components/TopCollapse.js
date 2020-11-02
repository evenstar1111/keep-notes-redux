import React, { useState, useRef } from "react";
import { Filter } from "../features/filter/Filter";
import {
  selectExpandedStatus,
  changedExpandedStatus,
} from "../features/topCollapse/topCollapseExpandedStatusSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export function TopCollapse() {
  const dispatch = useDispatch();

  const expandedStatus = useSelector(selectExpandedStatus);

  const clpsContainer = useRef(null);

  useEffect(() => {
    const el = clpsContainer.current;
    if (expandedStatus) {
      el.style.height = el.scrollHeight;
    } else if (!expandedStatus) {
      el.style.height = 0;
    }
  });

  const clickHandler = () => {
    const el = clpsContainer.current;
    if (!expandedStatus) {
      el.style.height = el.scrollHeight + "px";
      dispatch(changedExpandedStatus(true));
    } else if (expandedStatus) {
      el.style.height = 0;
      dispatch(changedExpandedStatus(false));
    }
  };

  return (
    <div className="collapseContainer">
      <button
        className={`collapseButton ${expandedStatus ? "collapseShown" : ""}`}
        type="button"
        aria-expanded="false"
        aria-controls="collapseExample"
        onClick={clickHandler}
        aria-label="filter collapse bar toggler"
      ></button>
      <div className="bg-light">
        <div className="outerFilterWrapper" ref={clpsContainer}>
          <div className="innerFilterWrapper">
            <Filter />
          </div>
        </div>
      </div>
    </div>
  );
}
