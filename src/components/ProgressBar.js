import React, { useState, useEffect } from 'react';

const ProgressBar = function (props) {
  const current = props.current;
  const goal = props.goal;
  const target = Math.floor((current / goal) * 100);
  const [width, setWidth] = useState(0);

  React.useEffect(function () {
    if (width < target) {
      var timer = setTimeout(function () {
        setWidth(function (prev) { return prev + 1; });
      }, 20);
      return function () {
        clearTimeout(timer);
      };
    }
  }, [width, target]);

  return React.createElement(
    "div",
    { className: "progress-container" },
    React.createElement("div", { id: "progress-bar", style: { width: width + "%" } }, width + "%")
  );
};

export default ProgressBar;
