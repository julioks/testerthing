import * as React from "react"
const SVGLeaf = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={153.475}
    height={107.486}
    viewBox="0 0 40.607 28.439"
    {...props} 
  >
    <g
      className="leaf-inside"
      style={{
        stroke: "#0c5200",
      }}
    >
      <path className="leaf-inside"
        d="M537.7 239.04a.5.5 0 0 0-.33.436c-2.852 39.646-37.82 74.168-88.607 87.248a.5.5 0 0 0-.225.841 63.009 63.009 0 0 0 43.967 17.932c34.788 0 63-28.212 63-63a63.003 63.003 0 0 0-17.273-43.33.5.5 0 0 0-.53-.127zm.525 1.65c10.44 11.416 16.278 26.31 16.28 41.807 0 34.248-27.753 62-62 62-15.878-.013-31.11-6.145-42.608-17.06 50.12-13.206 84.871-47.284 88.328-86.747z"
        style={{
          InkscapeStroke: "none",
          color: "#000",
          paintOrder: "stroke fill markers",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          stroke: "#0c5200",
        }}
        transform="translate(-106.5 -63.107) scale(.26458)"
      />
      <path className="leaf-inside"
        d="M537.86 239.51a132.73 98.386 0 0 1-88.98 87.697 62.5 62.5 0 0 0 43.617 17.789 62.5 62.5 0 0 0 62.5-62.5 62.5 62.5 0 0 0-17.137-42.986z"
        style={{
          InkscapeStroke: "none",
          color: "#000",
          fill: "#587702",
          paintOrder: "stroke fill markers",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          stroke: "#0c5200",
        }}
        transform="translate(-106.5 -63.107) scale(.26458)"
      />
    </g>
    <path 
      d="M142.31 63.371c7.144 25.135-29.333 31.879-35.683 12.564"
      className="leaf-outside"
      style={{
        fill: "none",
        strokeWidth: 1.46458,
      }}
      transform="translate(-106.5 -63.107)"
    />
  </svg>
)
export default SVGLeaf
