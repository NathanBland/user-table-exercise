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
              className="page-button previous">
                &lt;
            </button>
          :
            <span className="page-button previous">
              &lt;
            </span>
        }
        <span className="current-page">{props.page}</span>
        {props.preventNext ? 
          <span className="page-button next">&gt;</span>
        :
          <button onClick={() => props.handleClick(1)} className="page-button next">&gt;</button>
        }
      </span>
  )
}

export default FormControls