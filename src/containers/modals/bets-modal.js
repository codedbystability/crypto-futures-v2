import OpenBets from "./open-bets";
import ClosedBets from "./closed-bets";
import {useState} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const BetsModal = () => {

    const {t} = useTranslation()
    const {myBetsCount} = useSelector(state => state.informationReducer)
    const [activeTab, setActiveTab] = useState('open')
    return (
        <div
            className="modal fade"
            id="modal-bets"
            tabIndex={-1}
            aria-labelledby="modal-bets"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal__tabs">
                        <ul
                            className="nav nav-tabs modal__tabs-nav"
                            id="tabs-modal0"
                            role="tablist"
                        >
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`green ${activeTab === 'open' ? 'active' : ''}`}
                                    onClick={e => setActiveTab('open')}
                                    type="button">
                                    {t('bottom.active-bets')}
                                    <span> {myBetsCount}</span>

                                </button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button
                                    className={`red ${activeTab === 'closed' ? 'active' : ''}`}
                                    onClick={e => setActiveTab('closed')}
                                    type="button"
                                >
                                    {t('bottom.closed-bets')}
                                </button>
                            </li>
                        </ul>

                        {
                            activeTab === 'open' ?
                                <OpenBets/>
                                :
                                <ClosedBets/>
                        }
                    </div>
                </div>
            </div>
        </div>

    )

}

export default BetsModal
