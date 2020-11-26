import React from "react";
import { useHistory } from "react-router-dom";
import Arrow from "../ARROW.svg";

export function PrevPage() {
  const history = useHistory();
  return (
    <div className="prevPage">
      <button title="go back to previous page" onClick={() => history.goBack()}>
        <span>
          <img src={Arrow} alt="back arrow icon" />
        </span>
      </button>
    </div>
  );
}
