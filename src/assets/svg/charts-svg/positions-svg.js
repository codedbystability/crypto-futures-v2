import React from "react";


const PositionsSvg = () => {


    return (
        <svg width={24} height={24} viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg"
             fill='#bdbdbd'>
            <path d="M15 7H7v2h8V7ZM7 15h5v2H7v-2ZM17 11H7v2h10v-2Z"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-1 2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12Z"/>
        </svg>
    )

}

export default React.memo(PositionsSvg)
