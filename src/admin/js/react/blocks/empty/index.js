const Empty = (props) => {
    const { title, clickHandler, searchVal, logo = '' } = props;
    return (
        <>
            <div className="pi-empty-content pi-text-center">
                <img src={ncpi.assetImgUri + 'empty-data.png'}  />
                {!searchVal.length && <h4>You haven&apos;t  {title == 'Client' ? 'added' : 'created'} any {title} yet.</h4>}
                {searchVal.length > 0 && <h4>No {title} found by your search query.</h4>}
                <button className="pi-btn pi-bg-blue pi-bg-hover-blue" onClick={() => clickHandler('new')}>
                    Let&apos;s Start {title == 'Client' ? 'Adding' : 'Creating'}
                </button>
            </div>
        </>
    );
}
export default Empty;