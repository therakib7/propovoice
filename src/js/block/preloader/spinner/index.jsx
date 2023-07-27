const Snipper = props => {
  return (
    <div className={(props.submit) ? "pv-preloader pv-preloader-submit" : "pv-preloader"}></div>
  )
}
export default Snipper