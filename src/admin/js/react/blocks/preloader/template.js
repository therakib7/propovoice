import React from 'react'
import ContentLoader from 'react-content-loader'

const Template = props => {
  // Get values from props
  // const { rows, columns, coverHeight, coverWidth, padding, speed } = props;

  // Hardcoded values
  const rows = 2
  const columns = 5
  const coverHeight = 105
  const coverWidth = 85
  const padding = 8

  const coverHeightWithPadding = coverHeight + padding
  const coverWidthWithPadding = coverWidth + padding
  const initial = 0
  const covers = Array(columns * rows).fill(1)

  return (
    <div style={{ width: "100%" }}>
      <ContentLoader
        viewBox="0 0 500 220"
        {...props}
      >

        {covers.map((g, i) => {
          let vy = Math.floor(i / columns) * coverHeightWithPadding + initial
          let vx = (i * coverWidthWithPadding) % (columns * coverWidthWithPadding)
          return (
            <rect
              key={i}
              x={vx}
              y={vy}
              rx="0"
              ry="0"
              width={coverWidth}
              height={coverHeight}
            />
          )
        })}
      </ContentLoader>
    </div>

  )
}

export default Template