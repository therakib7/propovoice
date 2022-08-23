export default (props) => { 
    const groups = props.data; 
    return (
        <div className="pi-inv-sections" style={ { marginTop: ( props.top ? '15px' : '') }}>
            {groups.map((group_single, group_index) => {
                return (
                    <div className="pi-inv-section" key={group_index}>
                        {group_single.label && <h4 className='pi-inv-section-title'>{group_single.label}</h4>}
                        <div className="pi-inv-section-content" dangerouslySetInnerHTML={{ __html: group_single.content }}></div>
                    </div>
                );
            })}
        </div>
    )
}