import React from "react";
import moment from "moment";

export function TimeAgo({ timeStamp }) {
  let timeAgo = "";
  if (timeStamp) {
    const timeDistance = moment
      .duration(Date.now() - Date.parse(timeStamp), "milliseconds")
      .humanize();
    timeAgo = `created ${timeDistance} ago`;
  }
  return <small className="timeAgo">{timeAgo}</small>;
}
