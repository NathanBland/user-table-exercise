import React from "react"
import "./BasicLoader.css"
// import 
import FormControls from "./FormControls"
function BasicLoader(props) {
  const loadingArray = [...Array(props.limit - 2).fill(0)]
  return (
    <section className="UserTable--with-controls">
      <table border="0">
        <thead>
          <tr>
            <th className="table-row--full-name">Full Name</th>
            <th className="table-row--email">Email Address</th>
          </tr>
        </thead>
        <tbody>
          <tr className="error">
            <td colSpan="2" className="error-message">Uh oh, an error occurred. Click below to try again.</td>
          </tr>
          <tr className="error">
            <td>
              <button className="button--error" onClick={props.onRetry}>Retry</button>
            </td>
          </tr>
          {loadingArray.map((value, idx) => {
            return (
              <tr key={idx} className="error">
                <td><div className="error-bar"></div></td>
                <td><div className="error-bar"></div></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <FormControls 
        page={props.page} 
        handleClick={props.onPage}
        preventNext={props.preventNext}/>
    </section>
  )
}

export default BasicLoader