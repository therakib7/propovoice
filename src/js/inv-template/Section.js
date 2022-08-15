export default (props) => { 
    const groups = props.data; 
    return (
        <div className="pi-inv-sections">
            {groups.map((group_single, group_index) => {
                return (
                    <div className="pi-inv-section" key={group_index}>
                        <h4 className='pi-inv-section-title'>{group_single.label}</h4>
                        <div className="pi-inv-section-content" dangerouslySetInnerHTML={{ __html: group_single.content }}></div>
                    </div>
                );
            })}
        </div>
    )
}