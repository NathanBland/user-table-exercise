import React from "react";

import "./UserTable.css";
import BasicLoader from "./BasicLoader"
import FormControls from "./FormControls"
import ErrorTable from "./ErrorTable"

import API from "./utils/API";
// Since Api is axios, leverage cancel tokens
// https://github.com/axios/axios#cancellation
import axios from "axios"
const CancelToken = axios.CancelToken;

class UserTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoading: false,
      hasError: false,
      page: 1,
      limit: 5,
      searchText: '',
      cancelToken: null,
      typingTimeout: 0,
    };
  }
  
  buildQueryString = () => {
    const baseAPI = `/users?_page=${this.state.page}&_limit=${this.state.limit}`
    return this.state.searchText.length > 0 ? `${baseAPI}&name_like=${this.state.searchText}` : baseAPI  
  }

  fetchTableData = async () => {
    // check for a cancel token, if we have one, cancel.
    if (this.state.cancelToken) {
      this.state.cancelToken('new request')
    }
    // build our newer request
    const source = CancelToken.source();
    this.setState({
      cancelToken: source.cancel
    })
    const currentRequest = API.get(this.buildQueryString(), {
      cancelToken: source.token 
    })

    this.setState({
      isLoading: true,
      hasError: false,
      users: [],
    })
    try {
      const usersData = await currentRequest;
      this.setState({
        users: usersData.data,
        isLoading: false
      });
    } catch (err) {
      if (err.message === 'new request') {
      } else {
        this.setState({
          hasError: true,
          isLoading: false
        })
      }
    }
  }

  async componentDidMount() {
    this.fetchTableData()
  }

  handleSearch = async (ev) => {
    // Create a debounce function to remove some network stack.
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout)
    }
    await this.setState({
      isLoading: true,
      page: 1,
      searchText: ev.target.value
    })
    const requestTimeout = setTimeout(() => {
      this.fetchTableData()
    }, 200) 
    this.setState({
      typingTimeout: requestTimeout
    })
  }
  shouldPreventNext = () => {
    return this.state.isLoading || (this.state.users.length < this.state.limit)
  }

  handlePageChange = async (modifier) => {
    const page = this.state.page + modifier
    await this.setState({
      page: page > 0 ? page : 1
    })
    this.fetchTableData()
  }

  render() {
    return (
      <div className="UserTable">
        <div className="user-search">
          <label className="user-search--label">Search By Name:</label>
          <input className="user-search--input" type="text" onChange={this.handleSearch} value={this.state.searchText} placeholder="Tony Stark"/>
        </div>
        {
          this.state.isLoading 
          ? 
            <BasicLoader 
              page={this.state.page} 
              limit={this.state.limit} 
              onPage={this.handlePageChange}
              preventNext={this.shouldPreventNext()}
            />
          :
            this.state.hasError 
            ? 
              <ErrorTable 
                page={this.state.page} 
                limit={this.state.limit}
                onRetry={this.fetchTableData}
                onPage={this.handlePageChange}
                preventNext={this.shouldPreventNext()}
              />
            :
            <section className="UserTable--with-headers">
              <table border="0">
                <thead>
                  <tr>
                    <th className="table-row--full-name">Full Name</th>
                    <th className="table-row--email">Email Address</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.length < 1 
                  ?
                    <tr>
                      <td colSpan="2">No Results. Try a searching for a different name.</td>
                    </tr>
                  :
                    this.state.users.map((user) => {
                      return (
                        <tr key={user.id}>
                        <td className="table-row--full-name">{user.name}</td>
                        <td className="table-row--email">{user.email}</td>
                        </tr>
                        );
                      })
                  }
                </tbody>
              </table>
              <FormControls 
                page={this.state.page} 
                handleClick={this.handlePageChange}
                preventNext={this.shouldPreventNext()}
              />
            </section>
        }
      </div>
    );
  }
}

export default UserTable;
