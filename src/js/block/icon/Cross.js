export default (props) => {
  let s = '25';
  if (props.size == 'small') {
    s = 16
  }
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 16 16"
      fill="none"
      
    >
      <path
        d="M12.5 3.5L3.5 12.5"
        stroke="#718096"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 12.5L3.5 3.5"
        stroke="#718096"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
} 