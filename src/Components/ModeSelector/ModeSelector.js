import React from "react";

const ModeSelector = (props) => {
    const smallUrl = `https://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
    const bigUrl = `https://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`

    return (
        <div className="container">
            <div className="btn-section">
                <button onClick={() => props.uploadData(smallUrl)} type="button" className="btn btn-success">Small
                    size data
                </button>
                <button onClick={() => {
                    props.uploadData(bigUrl)
                }} type="button" className="btn btn-warning">Big size data
                </button>
            </div>
        </div>
    )
};

export default ModeSelector;