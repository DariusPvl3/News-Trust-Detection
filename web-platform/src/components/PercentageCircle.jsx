import React from "react";
import "../styles/PercentageCircle.css";

const PercentageCircle = ({ percentage, circleWidth }) => {
  // Make radius relative to circleWidth
  const radius = circleWidth / 2.6; // Adjust this value as necessary to fit the circle within the SVG container
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  // Calculate stroke width relative to circleWidth
  const strokeWidth = circleWidth / 15; // Adjust this value as necessary

  return (
    <div>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <style>
          {`
            .circle-background {
              fill: none;
              stroke: #ddd;
            }
            .circle-progress {
              fill: none;
              stroke: var(--accent-color);
              stroke-linecap: round;
              stroke-linejoin: round;
            }
            .circle-text {
              font-size: ${circleWidth / 5}px; // Adjust font size relative to circleWidth
              font-weight: bold;
              fill: var(--primary-text-color);
            }
          `}
        </style>
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={strokeWidth}
          r={radius}
          className="circle-background"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={strokeWidth}
          r={radius}
          className="circle-progress"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
          className="circle-text"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default PercentageCircle;
