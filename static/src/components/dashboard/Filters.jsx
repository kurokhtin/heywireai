import React, { useState, useEffect } from 'react'
import Select, { components } from 'react-select'
import Chevroncon from 'components/icons/Chevroncon'
import api from 'components/utils/api'
import SuccessIcon from 'components/icons/SuccessIcon'
import ErrorIcon from 'components/icons/ErrorIcon'
import ModalClose from 'components/parts/ModalClose'
import { Modal } from 'react-responsive-modal';

export default function Filters(props){
    const [openSmall, setOpenSmall] = useState(false)
    const [showMessage, setShowMessage] = useState({
        warn: null,
        failLoad: false,
        sending: false,
        successIcon: false,
        errorIcon: false
    });
    const [inputFormData , setFormData] = useState({
        cats: [],
        word_count: 500,
        datetime: '',
        location: '',
        writing_style: '',
        total: 0,
        token: '344a7e67c939a28e3a250d57e3b63cf7'
    })

    const datetime_options = [
        {
            value: 'NOW-1DAYS/DAY',
            label: 'Today'
        },
        {
            value: 'NOW-2DAYS/DAY',
            label: 'Last 2 days'
        }
    ]

    const total_options = [
        {
            value: 1,
            label: '1'
        },
        {
            value: 5,
            label: '5'
        },
        {
            value: 10,
            label: '10'
        }
    ]

    const location_options = [
        {
            value: 'Q65',
            label: 'Los Angeles'
        },
        {
            value: 'Q30',
            label: 'United States'
        }
    ]

    const writing_style_options = [
        {
            value: 'funny',
            label: 'Funny'
        },
        {
            value: 'serious',
            label: 'Serious'
        }
    ]

    const [items, setItems] = useState([
        {
            value: "ay.sports",
            label: "Sports",
            spread: false,
            children: [
                {
                    value: "ay.sports.nba",
                    label: "NBA"
                },
                {
                    value: "ay.sports.nfl",
                    label: "NFL"
                }
            ]
        },
        {
            value: "ay.lifesoc.crime",
            label: "Crime",
            spread: false,
            children: [
                {
                    value: "ay.biz.crime",
                    label: "Business Crime"
                },
                {
                    value: "ay.lifesoc.hatecrim",
                    label: "Hate Crime"
                },
                {
                    value: "ay.lifesoc.homicide",
                    label: "Homicide"
                }
            ]
        },
    ]);

    const handleSelectChange = (selected, select) => {
        if(selected){
            setFormData((inputFormData) => ({...inputFormData, [select.name]: selected.value }))
        }
        else{
            setFormData((inputFormData) => ({...inputFormData, [select.name]: '' }))
        }
    };


    const [selected, setSelected] = useState(null);

    const handleSpreadClick = (item) => {
        setSelected(item);
        if (item.children && item.children.length > 0) {
            toggleChildren(item.value);
        }
    };

    const toggleChildren = (value) => {
        const itemsCopy = JSON.parse(JSON.stringify(items));
        const parent = itemsCopy.find((obj) => obj.value === value);
        const pidx = itemsCopy.indexOf(parent);

        if (parent.children && parent.children.length > 0) {
            if (!parent.hasOwnProperty('spread')) {
                parent.spread = false;
            }

            if (!parent.spread) {
                itemsCopy.splice(pidx + 1, 0, ...parent.children); // insert children
            } else {
                itemsCopy.splice(pidx + 1, parent.children.length); // remove children
            }

            itemsCopy[pidx].spread = !itemsCopy[pidx].spread;
            setItems(itemsCopy);
        }
    };

    const getParent = (value) => {
        return items.find((obj) => obj.children && obj.children.find((child) => child.value === value));
    };

    const isParentSpread = (value) => {
        const item = items.find((obj) => obj.value === value);
        if (item.children && item.children.length > 0) {
            if (!selected) {
                return false;
            }
            if (value === selected.value) {
                return true;
            }
            let parent = getParent(selected.value);
            while (parent) {
                if (parent.value === item.value) {
                    return true;
                }
                parent = getParent(parent.value);
            }
        }
        return true;
    };

    const CustomOption = ({ data }) => {
        const className = [
            "treeOption",
            selected && selected.value === data.value ? "treeOptionActive" : "",
            !isParentSpread(data.value) ? "treeOptionHidden" : "",
            data.hasOwnProperty('children') && Array.isArray(data.children) ? "parent" : ""
        ].join(" ");
        const arrow = data.children && data.children.length > 0 && (
            <div
                className={["arrow", data.spread ? "spreadArrow" : ""].join(" ")}
            />
        );
        return (
            <div
                className={className}
                onClick={() => handleSpreadClick(data)}
            >
                {arrow}
                <p>{data.label}</p>
            </div>
        );
    };

    const NestedOption = (props) => {
        const className = [
            props.data.hasOwnProperty('children') && Array.isArray(props.data.children) ? "parent" : ""
        ].join(" ");
        const arrow = props.data.children && props.data.children.length > 0 && (
            <div className={["arrow", props.data.spread ? "spreadArrow" : ""].join(" ")}>
                <Chevroncon />
            </div>
        );
        return (
            <div className={'nested_wrapped ' + className}>
                <div className="spread_arrow" onClick={() => handleSpreadClick(props)}>
                    {arrow}
                </div>
                <components.Option {...props}>
                    <div className="checkbox_input">
                        <input type="checkbox" checked={props.isSelected} onChange={() => null} /><i />
                        <label><span />{props.label}</label>
                    </div>
                </components.Option>
            </div>
        );
    };

    const handleMultiSelectChange = (selectedOptions, select) => {
        const onlyValues = selectedOptions.map(index => {
            return index.value
        })
        setFormData((inputFormData) => ({
            ...inputFormData,
            [select.name]: onlyValues.join(', ')
        }));
    }

    const inputsHandler = (e) => {
        setFormData((inputFormData) => ({
          ...inputFormData,
          [e.target.name]: (e.target.type === "number") ? e.target.value.replace(/[^0-9]/g, '') : e.target.value,
        }));
    };

    const handleKeyPress = (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }

    const [data , setData] = useState({
        response: null,
        loading: false,
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        setData((data) => ({
          ...data,
          loading: true
        }));
        props.onLoading(true, inputFormData, false)

        let formData = new FormData();
        Object.entries(inputFormData).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value)
        });
        const headers = {'Content-Type': 'application/json', 'Accept': 'text/plain'};


        api.post('/api/get_stories',formData,{ headers })
            .then((response) => {
                // console.log(response)
                props.onResult(response)
                props.onLoading(false, inputFormData, false)
            })
            .catch( (error) => {
                console.log(error);
                props.onResult(error)
                props.onLoading(false, inputFormData, true)
                if(error){
                    setShowMessage((showMessage) => ({
                        ...showMessage,
                        warn: error.hasOwnProperty('response') ? error.response.data.message : error,
                        sending: false,
                        failLoad: true,
                        successIcon: false,
                        errorIcon: true
                    }));
                    setOpenSmall(true)
                }
            });
    }


	return(
		<>
            <form className="login form auth" id="add_assignment_form" onSubmit={e => {handleSubmit(e)}}>
                <fieldset className="one_input_wrapper width_100">
                    <Select
                        isMulti
                        id="cats" 
                        name="cats"
                        options={items}
                        className="basic-multi-select select_margin_bottom"
                        classNamePrefix="select"
                        placeholder="Categories"
                        onChange={handleMultiSelectChange}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ Option: NestedOption }}
                      />
                      <input type="text" required className="select_required_input" onChange={handleMultiSelectChange} value={inputFormData.cats}/>
                </fieldset>
                <fieldset className="one_input_wrapper width_50">
                    <input 
                        type="number" 
                        id="word_count" 
                        name="word_count" 
                        autoComplete="off" 
                        required
                        onChange={inputsHandler} 
                        onKeyPress={handleKeyPress}
                        defaultValue={inputFormData.word_count}
                    />
                    <label htmlFor="word_count">Word count</label>
                </fieldset>
                <fieldset className="one_input_wrapper width_50">
                    <Select
                        id="writing_style" 
                        name="writing_style"
                        options={writing_style_options}
                        className="basic-multi-select select_margin_bottom"
                        classNamePrefix="select"
                        placeholder="Writing style"
                        onChange={handleSelectChange}
                        hideSelectedOptions={false}
                      />
                      <input type="text" required className="select_required_input" onChange={handleSelectChange} value={inputFormData.writing_style}/>
                      {inputFormData.writing_style !== '' ? <label htmlFor="writing_style">Writing style</label> : null}
                </fieldset>
                <fieldset className="one_input_wrapper width_50">
                    <Select
                        id="location" 
                        name="location"
                        options={location_options}
                        className="basic-multi-select select_margin_bottom"
                        classNamePrefix="select"
                        placeholder="Location"
                        onChange={handleSelectChange}
                        hideSelectedOptions={false}
                      />
                      <input type="text" required className="select_required_input" onChange={handleSelectChange} value={inputFormData.location}/>
                      {inputFormData.location !== '' ? <label htmlFor="location">Location</label> : null}
                </fieldset>
                <fieldset className="one_input_wrapper width_50">
                    <Select
                        id="datetime" 
                        name="datetime"
                        options={datetime_options}
                        className="basic-multi-select select_margin_bottom"
                        classNamePrefix="select"
                        placeholder="Date range"
                        onChange={handleSelectChange}
                        hideSelectedOptions={false}
                      />
                      <input type="text" required className="select_required_input" onChange={handleSelectChange} value={inputFormData.datetime}/>
                      {inputFormData.datetime !== '' ? <label htmlFor="datetime">Date range</label> : null}
                </fieldset>
                <fieldset className="one_input_wrapper width_50">          
                    <Select
                        id="total" 
                        name="total"
                        options={total_options}
                        className="basic-multi-select select_margin_bottom"
                        classNamePrefix="select"
                        placeholder="Total articles"
                        onChange={handleSelectChange}
                        hideSelectedOptions={false}
                      />
                      <input type="text" required className="select_required_input" onChange={handleSelectChange} value={inputFormData.total}/>
                      {inputFormData.total !== 0 ? <label htmlFor="total">Total articles</label> : null}
                </fieldset>
                <fieldset className="one_input_wrapper width_50">
                    <input 
                        type="text" 
                        id="token" 
                        name="token" 
                        autoComplete="off" 
                        required
                        onChange={inputsHandler} 
                        defaultValue={inputFormData.token}
                    />
                    <label htmlFor="token">Secret token</label>
                </fieldset>
                <button form="add_assignment_form" className="button add_new_btn" type="submit" > 
                {/*disabled={!props.finished}*/}
                    <span>Get Articles</span>
                </button>
            </form>

            <Modal 
                open={openSmall} 
                onClose={() => setOpenSmall(false)} 
                center={true} 
                classNames={{
                    overlayAnimationOut: 'modal-overlay-out',
                    root: 'auth',
                    modalAnimationOut: 'modal-popup-out'
                }}
                showCloseIcon={false} 
                closeOnOverlayClick={true} 
                closeOnEsc={true}
            >
                <h2 className="modal_title">Error</h2>
                <ModalClose onChange={() => setOpenSmall(false)}/>
                <div className="modal_icon">{showMessage.successIcon ? <SuccessIcon /> : <ErrorIcon />}</div>
                <div className="modal_content with_icon" dangerouslySetInnerHTML={{__html: showMessage.warn}}></div>
            </Modal>
		</>
	)
}