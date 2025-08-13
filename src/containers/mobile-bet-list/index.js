import BetsModalContent from "../modals/content";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import store from "../../reducers/store";
import INFORMATION_CONSTANTS from "../../constants/information";

const MobileBetList = () => {

    const containerRef = useRef(null);
    const [open, setOpen] = useState(false);


    const {showTransactionsSheet} = useSelector(state => state.informationReducer)

    const handleClose = () =>
        store.dispatch({type: INFORMATION_CONSTANTS.SHOW_TRANSACTIONS, data: false})


    useEffect(() => {
        if (showTransactionsSheet)
            setOpen(true)
        else
            setOpen(false)
        // sheetRef.current.snapTo(({maxHeight}) => maxHeight)

    }, [showTransactionsSheet])


    return (
        <div ref={containerRef} id="mobile-bet-list">

            {/* your container content */}
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={handleClose}
                // 👇 Mount the drawer inside this container, not body
                container={containerRef.current}
                // Make it cover only the container area
                ModalProps={{keepMounted: true}}
                PaperProps={{
                    sx: {
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        backgroundColor: '#0e121d',
                        color: 'inherit',
                        // keep it within the container height
                        height: '90% !important',
                        width: '100%',
                        boxShadow: 'none',
                    },
                }}
                // Backdrop inside the container
                BackdropProps={{
                    sx: {
                        backgroundColor: 'rgba(0,0,0,0.35)',
                    },
                }}
            >
                <div className="drawer-handle"/>

                <BetsModalContent/>

            </SwipeableDrawer>
        </div>
    )


    // const handleClose = () => {
    //     const mobileBetList = document.getElementById('mobile-bet-list')
    //     if (mobileBetList)
    //         mobileBetList?.classList?.toggle('open')
    // }
    // return (
    //
    //     <div className="bottom-sheet" id="mobile-bet-list">
    //         <div className="bottom-sheet__handle" onClick={handleClose}>
    //             <span>Close</span>
    //             <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width={24}
    //                 height={24}
    //                 viewBox="0 0 24 24"
    //                 fill="none"
    //                 strokeWidth={2}
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //             >
    //                 <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    //                 <path d="M18 6l-12 12"/>
    //                 <path d="M6 6l12 12"/>
    //             </svg>
    //         </div>
    //
    //         <BetsModalContent/>
    //     </div>
    //
    // )
}
export default MobileBetList
