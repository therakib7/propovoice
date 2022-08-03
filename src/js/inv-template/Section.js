const Section = (props) => { 
    const groups = props.data; 
    return (
        <div className="pi-inv-setions">
            {groups.map((group_single, group_index) => {
                return (
                    <div className="pi-inv-setion" key={group_index}>
                        <h4 className='pi-inv-setion-title'>{group_single.label}</h4>
                        <div className="pi-inv-setion-content" dangerouslySetInnerHTML={{ __html: group_single.content }}></div>
                    </div>
                );
            })}
        </div>
    )
}
export default Section
