import React from "react"
import "./FormControls.css"
function FormControls(props) {
  return (
      <span className="controls">
        {
          props.page > 1 
          ?
            <button 
              onClick={() => props.handleClick(-1)} 
              className="page-button">
                &lt;
            </button>
          :
            <span className="page-button">
              &lt;
            </span>
        }
        <span className="current-page">{props.page}</span>
        <button onClick={() => props.handleClick(1)} className="page-button">&gt;</button>
      </span>
  )
}

export default FormControls