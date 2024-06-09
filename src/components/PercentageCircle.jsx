import React from "react";
import "../styles/PercentageCircle.css";

const PercentageCircle = ({ percentage, circleWidth }) => {
  const radius = 85;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

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
              font-size: 2.5rem;
              font-weight: bold;
              fill: var(--primary-text-color);
            }
          `}
        </style>
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          className="circle-background"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
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
