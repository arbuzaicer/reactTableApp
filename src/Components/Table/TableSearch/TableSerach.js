import React, {useState} from "react";

const TableSearch = (props) => {
    const [value, setValue] = useState('');
    const onValueChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => props.onSearch(value)}
                >Button
                </button>
            </div>
            <input type="text"
                   className="form-control"
                   placeholder=""
                   aria-label=""
                   aria-describedby="basic-addon1"
                   value={value}
                   onChange={onValueChange}
            />
        </div>
    )
}

export default TableSearch;