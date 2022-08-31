export default (props) => { 

    const handleChange = (e) => {
        const target = e.target; 
        let label = { ...props.item_label }
        label[target.name] = target.value;  
        props.labelChange(label);
    }; 

    const { title, desc, qty, price, tax, amount } = props.item_label;
    const item_tax = props.item_tax;
    const i18n = ndpv.i18n;
    return (
        <div className="pv-overlay pv-show">
            <div className="pv-modal-content pv-modal-style-two pv-modal-small">

                <div className="pv-modal-header">
                    <span className="pv-close" onClick={() => props.close()}>
                        <svg
                            width={25}
                            height={25}
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
                    </span>
                    <h2 className="pv-modal-title">{i18n.label + ' ' + i18n.edit}</h2>
                </div>

                <div className="pv-content">
                    <div className="pv-form-style-one">
                        <div className="row">
                            <div className="col-md">
                                <label htmlFor="field-title">
                                    {i18n.name}
                                </label>

                                <input
                                    id="field-title"
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md">
                                <label htmlFor="field-desc">
                                    {i18n.desc}
                                </label>

                                <input
                                    id="field-desc"
                                    type="text"
                                    name="desc"
                                    value={desc}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md">
                                <label htmlFor="field-qty">
                                    {i18n.qty}
                                </label>

                                <input
                                    id="field-qty"
                                    type="text"
                                    name="qty"
                                    value={qty}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md">
                                <label htmlFor="field-price">
                                    {i18n.rate}
                                </label>

                                <input
                                    id="field-price"
                                    type="text"
                                    name="price"
                                    value={price}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>

                        {item_tax && <div className="row">
                            <div className="col-md">
                                <label htmlFor="field-tax">
                                    {i18n.tax}
                                </label>

                                <input
                                    id="field-tax"
                                    type="text"
                                    name="tax"
                                    value={tax}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>}

                        <div className="row">
                            <div className="col-md">
                                <label htmlFor="field-amount">
                                    {i18n.amt}
                                </label>

                                <input
                                    id="field-amount"
                                    type="text"
                                    name="amount"
                                    value={amount}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="pv-modal-footer pv-mt-10">
                    <div className="row">
                        <div className="col"> 
                        </div>
                        <div className="col">
                            <button onClick={() => props.close()} className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-medium pv-float-right pv-color-white">
                                {i18n.save}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 