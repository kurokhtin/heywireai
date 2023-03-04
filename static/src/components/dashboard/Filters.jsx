import React, { useState, useEffect } from 'react'
import Select, { components } from 'react-select'
import Chevroncon from 'components/icons/Chevroncon'

export default function Filters(){

    const [items, setItems] = useState([
        {
            value: "parent1",
            label: "parent 1",
            spread: false,
            children: [
                {
                    value: "child1",
                    label: "child1"
                },
                {
                    value: "child2",
                    label: "child2"
                }
            ]
        },
        {
            value: "parent2",
            label: "parent 2",
            spread: false,
            children: []
        }
    ]);
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
        // console.log(selectedOptions, select)
    }

    const [inputFormData , setFormData] = useState({
        categoties: []
    })


	return(
		<>
            <form className="login form auth" id="add_assignment_form" onSubmit={e => console.log('submit')}>
                <fieldset className="one_input_wrapper width_100">
                    <Select
                        isMulti
                        id="categoties" 
                        name="categoties"
                        options={items}
                        className="basic-multi-select select_margin_bottom"
                        classNamePrefix="select"
                        placeholder="Categories"
                        onChange={handleMultiSelectChange}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{ Option: NestedOption }}
                      />
                      <input type="text" required className="select_required_input" onChange={handleMultiSelectChange} value={inputFormData.categoties}/>
                </fieldset>
                <button form="add_assignment_form" className="button add_new_btn" type="submit">
                    <span>Generate articles</span>
                </button>
            </form>
		</>
	)
}