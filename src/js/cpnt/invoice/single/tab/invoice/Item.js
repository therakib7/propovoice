import { useEffect, useRef, useState } from "react";
import api from 'api';
import { toast } from "react-toastify";

export default (props) => {
    const calcItemTotal = (qty, price) => {
        return (qty * price);
    }

    const { index, title, desc, qty, qty_type, qtyTypeList, item_tax, tax, tax_type, price } = props
    const i18n = ndpv.i18n;
    const [savedItems, setSavedItems] = useState([]);



    useEffect(() => {
        api.get('savefornext').then(data => {
            setSavedItems(data.data)
        }).catch(e => console.log(e));
    }, [])

    const saveForNext = () => {
        let data = {
            index: Math.random().toString(36).substring(2, 7),
            title: title,
            desc: desc,
            qty: qty,
            qty_type: qty_type,
            price: price,
            tax: tax,
            tax_type: tax_type
        }

        api.add('savefornext', data).then(res => {
            console.log(res)
            api.get('savefornext', '').then(r => {
                toast.success('Item saved!')
            })
        }).catch(err => {
            toast.error('Unable to save');
        })

    }
    const [visiblity, setVisiblity] = useState(false);
    const [suggestionVisiblity, setSuggestionVisiblity] = useState(false);
    const [isFocused, setFocused] = useState(false);

    const handleTitleFocus = (e) => {
        setFocused(true)
    }

    const handleTitleBlur = (e) => {
        setFocused(false)
    }

    useEffect(() => {
        if (title.length < 1 && isFocused) {
            setSuggestionVisiblity(true)
        } else {
            setSuggestionVisiblity(false)
        }

    }, [title, isFocused]);




    const changeItemsValue = (e, item) => {
        e.preventDefault();
        setSuggestionVisiblity(false)
        props.handleItemsValue(index, {
            title: item.title,
            desc: item.desc,
            qty: item.qty,
            price: item.price
        });


    }

    return (
        <>
            <td
                onMouseEnter={() => setVisiblity(true)}
                onMouseLeave={() => setVisiblity(false)}
                style={{ position: 'relative' }}
            >
                <input
                    onFocus={handleTitleFocus}
                    onBlur={handleTitleBlur}
                    name="title"
                    type="text"
                    placeholder={i18n.title}
                    value={title}
                    onChange={props.changeHandler(index)} />

                {suggestionVisiblity &&
                    <div style={{ left: '16px', top: '53px', width: '295px' }} className="pv-dropdown-content pv-show">

                        {savedItems.map((item, i) => {
                            return <a onClick={(e) => changeItemsValue(e, item, index)} key={i} href="#">
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: '500', fontSize: '12px' }}>{item.title}</div>
                                        <div style={{ fontSize: '8px', color: '#718096' }}>{item.desc}</div>
                                    </div>

                                    <div style={{ fontSize: '10px', color: '#718096' }}>${item.price}</div>
                                </div>
                            </a>
                        })}

                    </div>}


                <br />

                <textarea
                    name="desc"
                    type="text"
                    placeholder={i18n.desc}
                    value={desc}
                    onChange={props.changeHandler(index)} />
            </td>
            <td
                onMouseEnter={() => setVisiblity(true)}
                onMouseLeave={() => setVisiblity(false)}
            >
                <div className='pv-field-checkbox pv-field-checkbox-input'>
                    <input
                        name="qty"
                        type="number"
                        min="0.00"
                        step="1"
                        max="9999999.99"
                        value={qty}
                        onChange={props.changeHandler(index)}
                        style={{ width: '60px' }}
                        onFocus={props.focusHandler}
                    />
                    <select
                        name="qty_type"
                        value={qty_type}
                        onChange={props.changeHandler(index)}
                    >
                        <option value=''>{i18n.select}</option>
                        {qtyTypeList && qtyTypeList.map((item, itemIndex) => {
                            const slug = item.label.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                            return (
                                <option key={itemIndex} value={slug}>{item.label}</option>
                            )
                        })}
                    </select>
                </div>
            </td>
            <td
                onMouseEnter={() => setVisiblity(true)}
                onMouseLeave={() => setVisiblity(false)}
            >
                <input
                    name="price"
                    type="number"
                    style={{ width: '88px' }}
                    step="0.01"
                    min="0.00"
                    max="9999999.99"
                    value={price}
                    onChange={props.changeHandler(index)}
                    onFocus={props.focusHandler}
                />
            </td>

            <td
                onMouseEnter={() => setVisiblity(true)}
                onMouseLeave={() => setVisiblity(false)}
            >
                {props.currencyFormatter(calcItemTotal(qty, price))}
            </td>

            {item_tax && <td
                onMouseEnter={() => setVisiblity(true)}
                onMouseLeave={() => setVisiblity(false)}
            >
                <div className='pv-field-checkbox pv-field-checkbox-input'>
                    <input
                        name="tax"
                        type="number"
                        min="0.00"
                        step="1"
                        max="9999999.99"
                        value={tax}
                        onChange={props.changeHandler(index)}
                        onFocus={props.focusHandler} />

                    <select name="tax_type"
                        value={tax_type}
                        onChange={props.changeHandler(index)}
                        ref={(n) => {
                            if (n) {
                                n.style.setProperty("width", "37px", "important");
                            }
                        }}
                    >
                        <option value="percent">%</option>
                        <option value="fixed">$</option>
                    </select>
                </div>
            </td>}
            <td
                onMouseEnter={() => setVisiblity(true)}
                onMouseLeave={() => setVisiblity(false)}
                style={{ 'position': 'relative' }}
            >
                {visiblity && !wage.length && <button onClick={saveForNext} className="pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow" style={{ 'position': 'absolute', 'top': '11px', 'left': '-69px', 'width': 'auto' }}>Save for next</button>}
                <span
                    onClick={props.deleteHandler(index)}
                >
                    <svg
                        width={15}
                        height={15}
                        viewBox="0 0 10 10"
                        fill="none"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.195 1.204a.666.666 0 01.942 0l2.859 2.862 2.859-2.862a.666.666 0 11.942.942l-2.86 2.862 2.86 2.862a.667.667 0 01-.942.943L4.995 5.95 2.138 8.813a.666.666 0 01-.942-.943l2.86-2.862-2.86-2.862a.667.667 0 010-.942z"
                            fill="#4A5568"
                            stroke="#A0AEC0"
                            strokeWidth={0.5}
                        />
                    </svg>
                </span>
            </td>
        </>
    )
}