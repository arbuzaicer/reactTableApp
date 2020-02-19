import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import Loader from './Components/Loader/Loader'
import Table from './Components/Table/Table'
import _ from 'lodash'
import SingleUserInfo from "./Components/SingleUserInfo/SingleUserInfo";
import styles from './App.css'
import ModeSelector from "./Components/ModeSelector/ModeSelector";
import {connection} from "./Components/DAL/DAL_connection"
import TableSearch from "./Components/Table/TableSearch/TableSerach";
import Error from "./Components/Error/Error";

class App extends Component {

    state = {
        isModeSelected: false,
        tableData: [],
        isLoaded: false,
        search: '',
        sortDirection: 'asc', // 'desc'
        sortField: 'id',
        singleUserData: null,
        currentPage: 0
    };

    onSort = (sortSelector) => {
        const cloneData = [...this.state.tableData];
        const sortType = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
        const orderedData = _.orderBy(cloneData, sortSelector, sortType); //using orderBy method Lodash library
        this.setState({
            tableData: orderedData,
            sortDirection: sortType,
            sortField: sortSelector
        })
    };

    onRowSelect = row => { //click on single user
        this.setState({
            singleUserData: row
        })
    };

    async uploadData(url) {
        this.setState({ //enable preloader and selected upload mode
            isModeSelected: true,
            isLoaded: false
        });

        const tableData = await connection.getData(url); //get request using DAL component

        this.setState({ //place data in state
            tableData: _.orderBy(tableData, this.state.sortField, this.state.sortDirection),
            isLoaded: true //disabled preloader
        })
    }

    handlePageClick(page) { //change page pagination
        this.setState({
            currentPage: page.selected
        })
    }

    onSearch(value) { //put value for search variable, and reChange pagination by default - 0 value
        this.setState({
            search: value,
            currentPage: 0 //для отображения результатов на первой странице
        })
    }

    filteredData() { //create filtered data from search input
        const {tableData, search} = this.state;
        if (!search) {
            return tableData;
        } else {
            return tableData.filter(item => {
                return item["firstName"].toLowerCase().includes(search.toLowerCase())
                    || item["lastName"].toLowerCase().includes(search.toLowerCase())
                    || item["email"].toLowerCase().includes(search.toLowerCase());
            })
        }
    }

    render() {
        if (!this.state.isModeSelected) { //displaying select mode buttons
            return (
                <>
                    <ModeSelector uploadData={this.uploadData.bind(this)}/>
                </>
            )
        }

        const searchedData = this.filteredData();
        const dataSize = 50;
        const totalPages = Math.ceil(searchedData.length / dataSize);
        const displayedData = _.chunk(searchedData, dataSize)[this.state.currentPage];

        return (
            <div className="container">
                {!this.state.isLoaded && <Loader/>}

                {
                    this.state.tableData.length >= dataSize &&
                    <ReactPaginate
                        previousLabel={'<--'}
                        nextLabel={'-->'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick.bind(this)}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        nextClassName="page-item"
                        previousLinkClassName="page-link"
                        nextLinkClassName="page-link"
                    />
                }

                {this.state.isLoaded &&
                <>
                    <TableSearch
                        onSearch={this.onSearch.bind(this)}
                    />
                    {searchedData.length > 0
                        ? <Table data={displayedData}
                                 onSort={this.onSort}
                                 sortDirection={this.state.sortDirection}
                                 sortField={this.state.sortField}
                                 onRowSelect={this.onRowSelect}
                        />
                        : <Error/>
                    }

                </>
                }

                {
                    this.state.singleUserData
                        ? <SingleUserInfo
                            data={this.state.singleUserData}
                        />
                        : null
                }
            </div>
        );
    }
}

export default App;