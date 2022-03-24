const Empty = (props) => {
    const { title, clickHandler, logo = ''} = props;
    return (
        <> 
            <div className="pi-empty-content pi-text-center">
                <img src={ncpi_local.assetImgUri+'empty-data.png'} className="" />
                <h4>You haven&apos;t create any {title} yet.</h4>
                <button className="pi-btn pi-bg-blue pi-bg-hover-blue" onClick={() => clickHandler('new')}>
                    Let&apos;s Start Creating
                </button>
            </div>
        </>
    );
} 
export default Empty;