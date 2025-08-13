import React from "react"
import './index.css'

const Loading = ({small = false, button = false}) => {


    return (
        <div className="loading-container">
            <img className="loading__img" src="img/loading.svg" alt=""/>
        </div>
    )

}

export default Loading
