import React from 'react';

const Single = props => {

    function handleClick(data) {
        props.selectEntry(data);
    }

    return props.tableData.map((row, index) => { 
        return (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
                <div className={(props.currentTemplate.id == row.id) ? 'pi-single-image-content pi-active' : 'pi-single-image-content'}>
                    <img src={row.img} className="pi-single-image" />
                    { ( props.currentTemplate.id != row.id ) && <div className="pi-overflow-content">
                        <a className="pi-btn pi-bg-blue pi-bg-hover-blue" onClick={() => handleClick(row)}>Select</a>
                        <a className="pi-btn pi-bg-blue pi-bg-hover-blue">Full Preview</a>
                    </div>}
                </div>
            </div>
        );
    });
}

export default Single;