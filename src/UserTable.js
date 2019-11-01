import React from "react";

import "./UserTable.css";
import BasicLoader from "./BasicLoader"
import FormControls from "./FormControls"
import ErrorTable from "./ErrorTable"

import API from "./utils/API";

class UserTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoading: false,
      hasError: false,
      page: 1,
      limit: 5,
      error: {},
      searchText: '',
      queuedRequests: 0,
      typingTimeout: 0
    };
  }
  
  buildQueryString = () => {
    const baseAPI = `/users?_page=${this.state.page}&_limit=${this.state.limit}`
    return this.state.searchText.length > 0 ? `${baseAPI}&name_like=${this.state.searchText}` : baseAPI  
  }

  fetchTableData = async () => {
    const currentText = this.state.searchText
    this.setState({
      isLoading: true,
      hasError: false,
      queuedRequests: this.state.queuedRequests + 1,
      error: {}
    })
    try {
      const usersData = await API.get(this.buildQueryString());
      // Because of the "finally" block we must await the state change
      await this.setState({
        users: usersData.data,
        queuedRequests: this.state.queuedRequests - 1
      });
    } catch (error) {
      // Because of the "finally" block we must await the state change
      await this.setState({
        hasError: true,
        queuedRequests: this.state.queuedRequests - 1,
        error
      })
    } finally {
      // In the event that our search query has changed before our request resolved
      // Do not set loading to be complete.
      if (this.state.searchText === currentText && this.state.queuedRequests < 1) {
        this.setState({
          isLoading: false
        })
      }
    }
  }

  async componentDidMount() {
    this.fetchTableData()
  }

  handleSearch = (ev) => {
    // Create a debounce function to remove some network stack.
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout)
    }
    this.setState({
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
        <input type="text" onChange={this.handleSearch} value={this.state.searchText}/>
        {
          this.state.isLoading 
          ? 
            <BasicLoader 
              page={this.state.page} 
              limit={this.state.limit} 
              onPage={this.handlePageChange}
            />
          :
            this.state.hasError 
            ? 
              <ErrorTable 
                page={this.state.page} 
                limit={this.state.limit}
                onRetry={this.fetchTableData}
                onPage={this.handlePageChange}
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
                  {this.state.users.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td className="table-row--full-name">{user.name}</td>
                        <td className="table-row--email">{user.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <FormControls 
                page={this.state.page} 
                handleClick={this.handlePageChange}
              />
            </section>
        }
      </div>
    );
  }
}

export default UserTable;
