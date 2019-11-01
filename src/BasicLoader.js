import React from "react"
import "./BasicLoader.css"
import FormControls from "./FormControls"
function BasicLoader(props) {
  const loadingArray = [...Array(props.limit).fill(0)]
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
          {loadingArray.map((value, idx) => {
            return (
              <tr key={idx}>
                <td className=""><div className="loading-bar"></div></td>
                <td className=""><div className="loading-bar"></div></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <FormControls page={props.page} handleClick={props.onPage}/>
    </section>
  )
}

export default BasicLoader