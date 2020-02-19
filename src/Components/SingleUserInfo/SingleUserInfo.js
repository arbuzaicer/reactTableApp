import React from "react";

const SingleUserInfo = (props) => {
    const emailTo = `mailto: ${props.data.email}`;
    const phoneTo = `tel: ${props.data.phone}`;

    return (
        <section className='single-user'>
            <h2>Current User is <strong>{props.data.firstName}</strong></h2>
            <p>Additional info:</p>
            <p>LastName: {props.data.lastName}</p>
            <p>Email: <a href={emailTo}>{props.data.email}</a></p>
            <p>Phone: <a href={phoneTo}>{props.data.phone}</a></p>
            <ul>Address
                <li>City: {props.data.address.city}</li>
                <li>Street: {props.data.address.streetAddress}</li>
                <li>State: {props.data.address.state}</li>
                <li>Zip-code: {props.data.address.zip}</li>
            </ul>
            <p>{props.data.description}</p>
        </section>
    )
};

export default SingleUserInfo;