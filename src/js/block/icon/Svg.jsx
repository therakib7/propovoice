
const Svg = ({ name, size = "small", style = "default" }) => {
  const svgStyles = {
    width: 25,
    height: 25,
    viewBox: "0 0 16 16",
    fill: "none"
  }
  const pathStyles = {
    stroke: "#dfdfdf",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fillRule: "evenodd",
    clipRule: "evenodd"
  }
  const styles = {
    default: {
      svg: {
        ...svgStyles
      },
      path: {
        ...pathStyles
      }
    },
    blue: {
      svg: {
        ...svgStyles
      },
      path: {
        ...pathStyles,
        stroke: "#4C6FFF"
      }
    }
  }
  let iconD = {
    x: "M12.5 3.5l-9 9M12.5 12.5l-9-9",
    upload: "M3.66824 10.0907C3.01193 10.0915 2.37842 9.85536 1.88909 9.42768C1.39976 9 1.08901 8.41081 1.01638 7.773C0.943746 7.13518 1.11434 6.49358 1.49547 5.97112C1.87661 5.44866 2.44148 5.08208 3.08188 4.94161C2.89659 4.09662 3.06217 3.21426 3.5422 2.48865C4.02223 1.76304 4.77738 1.25361 5.64153 1.07243C6.50568 0.891248 7.40804 1.05316 8.1501 1.52254C8.89217 1.99193 9.41315 2.73034 9.59844 3.57533H9.66507C10.4913 3.57451 11.2883 3.87392 11.9014 4.41541C12.5146 4.9569 12.9001 5.70185 12.9831 6.50564C13.0662 7.30943 12.8408 8.11472 12.3508 8.76517C11.8608 9.41562 11.1411 9.86483 10.3314 10.0256M8.99875 8.13612L6.99981 6.1815M6.99981 6.1815L5.00087 8.13612M6.99981 6.1815V13",
    link: "M7.976 1.903a1.5 1.5 0 112.121 2.12l-2.25 2.25a1.5 1.5 0 01-2.12 0 .75.75 0 00-1.061 1.061 3 3 0 004.242 0l2.25-2.25A3 3 0 006.916.842L5.79 1.967a.75.75 0 101.06 1.06l1.125-1.124zm-3.75 3.75a1.5 1.5 0 012.121 0 .75.75 0 101.06-1.06 3 3 0 00-4.241 0l-2.25 2.25a3 3 0 104.242 4.241L6.283 9.96a.75.75 0 10-1.06-1.06l-1.126 1.125a1.5 1.5 0 11-2.12-2.121l2.25-2.25z",
    tick: "M1 7l4.5 4.5L14 3"
  };

  return (<svg {...styles[style]["svg"]}>
    <path
      d={iconD[name]}
      {...styles[style]["path"]}
    />
  </svg>)
}
export default Svg;