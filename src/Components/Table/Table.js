import React from "react";

const Table = (props) => {
    const usersData = props.data.map((item) => {
            return (
                <tr onClick={props.onRowSelect.bind(null, item)} key={item.id + item.phone}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>
            )
        });


    return (
        <table className="table">
            <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>
                    ID
                    {props.sortField === 'id' ? <sub>{props.sortDirection}</sub> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'firstName')}>
                    firstName
                    {props.sortField === 'firstName' ? <sub>{props.sortDirection}</sub> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'lastName')}>
                    lastName
                    {props.sortField === 'lastName' ? <sub>{props.sortDirection}</sub> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'email')}>
                    email
                    {props.sortField === 'email' ? <sub>{props.sortDirection}</sub> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'phone')}>
                    phone
                    {props.sortField === 'phone' ? <sub>{props.sortDirection}</sub> : null}
                </th>
            </tr>
            </thead>
            <tbody>
            {usersData}
            </tbody>
        </table>
    )
};

export default Table;