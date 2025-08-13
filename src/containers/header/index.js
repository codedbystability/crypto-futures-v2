import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {SET_LOADING_MANUALLY, SET_NOTIFICATIONS} from "../../reducers/constants";
import store from "../../reducers/store";
import associateServices from "../../services";
import AUTH_CONSTANTS from "../../constants/authentication";
import {decrypt, toggleFullScreen} from "../../helpers/encryption";
import AUTH_ACTIONS from "../../actions/authentication";
import DATA_ACTIONS from "../../actions/data";
import INFORMATION_ACTIONS from "../../actions/information";
import Big from "big.js";
import {useLocation, useNavigate} from "react-router-dom";
import APPEARANCE_CONSTANTS from "../../constants/appearance";

const Header = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const {user} = useSelector(state => state.authenticationReducer)
    const {activeLanguage, languages} = useSelector(state => state.appearanceReducer)

    const [username, setUsername] = useState('')

    const handleMenu = () => {
        const menu = document.getElementById('menu')
        if (menu)
            menu?.classList?.toggle('menu--active')
    }

    const handleHowToPlay = () => {
        const menu = document.getElementById('menu')
        menu?.classList?.remove('menu--active')

        const params = new URLSearchParams(location.search);
        const directAuth = params.get("direct_auth");

        if (directAuth) {
            navigate(`/how-to-play?direct_auth=${encodeURIComponent(directAuth)}`);
        } else {
            navigate("/how-to-play");
        }
    }

    useEffect(() => {
        setUsername(user?.username || '')
    }, [user?.username])

    const {t} = useTranslation()


    const handleAccountChange = (accountType) => {
        if (user?.account_type === accountType)
            return console.error(t(`notifications.already-${accountType}`));


        const balanceDrop = document.getElementById('dropdownBalance')
        const itm = document.getElementById('balance-drop-content')
        itm.classList.remove('show')
        balanceDrop.classList.remove('show')

        store.dispatch({type: SET_LOADING_MANUALLY, data: true})

        associateServices.switchAccount({
            fromAccount: user?.login
        }).then(res => {
            if (res?.status === 200) {
                console.error(t(`notifications.${accountType}-success`));

                store.dispatch({type: AUTH_CONSTANTS.USER_LOGOUT, data: null})


                if (res?.data?.login?.toString()?.length >= 7)
                    associateServices.setPrefix('demo/')
                else
                    associateServices.setPrefix('')

                setTimeout(() => {

                    const decrypted = decrypt(res?.data?.acc)
                    store.dispatch(AUTH_ACTIONS.setAuthentication({
                        ...res?.data?.user,
                        ...decrypted,
                        token: res?.data?.token
                    }))

                    associateServices.getConfs().then(res => {
                        store.dispatch(DATA_ACTIONS.setInstrumentList(res?.data || []))
                        store.dispatch(DATA_ACTIONS.setMarketTimes(res?.market || {}))

                        let lastParity = localStorage.getItem('lastParity')

                        if (lastParity) {
                            lastParity = JSON.parse(lastParity)
                        }
                        const found = res?.data.find(i => i.code === lastParity?.code)
                        if (found) {
                            store.dispatch(INFORMATION_ACTIONS.setParity({
                                ...found,
                                value: found.code,
                                label: found.code,
                            }))
                        } else {
                            let eth = res?.data.find(i => i.code === 'ETHUSD')
                            if (!eth)
                                eth = res?.data[0]
                            store.dispatch(INFORMATION_ACTIONS.setParity({
                                ...eth,
                                value: eth.code,
                                label: eth.code,
                            }))
                        }

                        // setShow(true)
                    })


                }, 500)

            } else {
                // store.dispatch({type: SET_LOADING_MANUALLY, data: false})
                console.error(t('notifications.switch-error'));

                store.dispatch({
                    type: SET_NOTIFICATIONS, data: {
                        type: 'notification',
                        message: t('notifications.switch-error')
                    }
                });
            }
        })
    }
    const handleDepositDemo = e => {
        e.stopPropagation()

        const balanceDrop = document.getElementById('dropdownBalance')
        const itm = document.getElementById('balance-drop-content')
        balanceDrop.classList.remove('show')
        itm.classList.remove('show')


        itm.style.position = 'absolute';
        itm.style.inset = ' 0px auto auto 0px';
        itm.style.margin = '0';
        itm.style.transform = 'translate(0px, 48px)';


        associateServices.depositDemo({}).then(res => {
            if (res?.status === 200) {
                window?.tcpSocketServer?.emit('user:check', '1');
                console.error(t('notifications.demo-balance-deposited'))
                store.dispatch({
                    type: SET_NOTIFICATIONS, data: {
                        type: 'notification',
                        message: t('notifications.demo-balance-deposited')
                    }
                });
            }
        })
    }


    function gup(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        let regexS = "[\\?&]" + name + "=([^&#]*)";
        let regex = new RegExp(regexS);
        let results = regex.exec(url);
        return results == null ? null : results[1];
    }


    const handleHome = () => {
        const menu = document.getElementById('menu')
        menu?.classList?.remove('menu--active')

        const params = new URLSearchParams(location.search);
        const directAuth = params.get("direct_auth");

        if (directAuth) {
            navigate(`/?direct_auth=${encodeURIComponent(directAuth)}`);
        } else {
            navigate("/");
        }
    }

    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="header__content">
                            <a onClick={handleHome} className="header__logo">
                                <img src="img/cryptofutures.svg" alt=""/>
                            </a>
                            {/*<div className="header__drop dropdown">*/}
                            {/*<div className="header__drop">*/}
                            {/*    /!*<img src="img/1.jpg" alt=""/>*!/*/}
                            {/*    <p>{user?.username}</p>*/}
                            {/*    <button*/}
                            {/*        className="header__drop-btn"*/}
                            {/*        type="button"*/}
                            {/*        id="drop01"*/}
                            {/*        // data-bs-toggle="dropdown"*/}
                            {/*        aria-expanded="false"*/}
                            {/*    >*/}
                            {/*        Guest Demo*/}
                            {/*        <svg*/}
                            {/*            width={9}*/}
                            {/*            height={9}*/}
                            {/*            viewBox="0 0 9 9"*/}
                            {/*            fill="none"*/}
                            {/*            xmlns="http://www.w3.org/2000/svg"*/}
                            {/*        >*/}
                            {/*            <path*/}
                            {/*                d="M0.176605 3.38166L3.67655 6.88161C3.77542 6.98058 3.89259 7.03003 4.02809 7.03003C4.16359 7.03003 4.28074 6.98058 4.37971 6.88161L7.87966 3.38166C7.97863 3.28269 8.02808 3.16552 8.02808 3.03012C8.02808 2.89473 7.97863 2.77748 7.87966 2.67859C7.78058 2.57961 7.66343 2.53014 7.52804 2.53014L0.528167 2.53014C0.392747 2.53014 0.275523 2.57961 0.176605 2.67859C0.077741 2.77745 0.0281042 2.8947 0.0281042 3.03012C0.0281042 3.16555 0.077741 3.28269 0.176605 3.38166Z"/>*/}
                            {/*        </svg>*/}
                            {/*    </button>*/}
                            {/*    <div className="dropdown-menu" aria-labelledby="drop01">*/}
                            {/*        <div className="header__drop-menu">*/}
                            {/*            <div className="form__group">*/}
                            {/*                <label htmlFor="username" className="form__label">*/}
                            {/*                    Username*/}
                            {/*                </label>*/}
                            {/*                <input*/}
                            {/*                    id="username"*/}
                            {/*                    type="text"*/}
                            {/*                    className="form__input"*/}
                            {/*                    value={username}*/}
                            {/*                    onChange={e => setUsername(e.target.value)}*/}
                            {/*                />*/}
                            {/*            </div>*/}
                            {/*            <div className="form__switch">*/}
                            {/*                <input*/}
                            {/*                    type="checkbox"*/}
                            {/*                    className="form__switch-input"*/}
                            {/*                    name="switch0"*/}
                            {/*                    id="switch0"*/}
                            {/*                />*/}
                            {/*                <label htmlFor="switch0">Notification Sound</label>*/}
                            {/*            </div>*/}
                            {/*            <div className="form__switch">*/}
                            {/*                <input*/}
                            {/*                    type="checkbox"*/}
                            {/*                    className="form__switch-input"*/}
                            {/*                    name="switch1"*/}
                            {/*                    id="switch1"*/}
                            {/*                />*/}
                            {/*                <label htmlFor="switch1">Signal Sound</label>*/}
                            {/*            </div>*/}
                            {/*            <div className="form__switch">*/}
                            {/*                <input*/}
                            {/*                    type="checkbox"*/}
                            {/*                    className="form__switch-input"*/}
                            {/*                    name="switch2"*/}
                            {/*                    id="switch2"*/}
                            {/*                />*/}
                            {/*                <label htmlFor="switch2">User Sound</label>*/}
                            {/*            </div>*/}
                            {/*            <div className="form__switch">*/}
                            {/*                <input*/}
                            {/*                    type="checkbox"*/}
                            {/*                    className="form__switch-input"*/}
                            {/*                    name="switch3"*/}
                            {/*                    id="switch3"*/}
                            {/*                />*/}
                            {/*                <label htmlFor="switch3">Bets Sound</label>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="header__drop dropdown">
                                <img src="img/wallet.svg" alt=""/>
                                <p>{t('general.balance')}</p>
                                <button
                                    className="header__drop-btn"
                                    type="button"
                                    id="drop02"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {Big(user?.balance || 0).toFixed(2)}
                                    <svg
                                        width={9}
                                        height={9}
                                        viewBox="0 0 9 9"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0.176605 3.38166L3.67655 6.88161C3.77542 6.98058 3.89259 7.03003 4.02809 7.03003C4.16359 7.03003 4.28074 6.98058 4.37971 6.88161L7.87966 3.38166C7.97863 3.28269 8.02808 3.16552 8.02808 3.03012C8.02808 2.89473 7.97863 2.77748 7.87966 2.67859C7.78058 2.57961 7.66343 2.53014 7.52804 2.53014L0.528167 2.53014C0.392747 2.53014 0.275523 2.57961 0.176605 2.67859C0.077741 2.77745 0.0281042 2.8947 0.0281042 3.03012C0.0281042 3.16555 0.077741 3.28269 0.176605 3.38166Z"/>
                                    </svg>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="drop02">
                                    <div className="header__drop-menu">
                                        <ul className="form__radio">
                                            <li>
                                                <input id="acc1" type="radio" name="acc"/>
                                                <label htmlFor="acc1">
                                                    <span>Real Account</span>
                                                    <span>{Big(user?.balance || 0).toFixed(2)}</span>
                                                </label>
                                            </li>
                                            <li>
                                                <input id="acc2" type="radio" name="acc"/>
                                                <label htmlFor="acc2">
                                                    <span>Demo Account</span>
                                                    <span>$25,000</span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <button className="header__btn"
                                    onClick={handleMenu}
                                    type="button">
                                <svg
                                    width={24}
                                    height={21}
                                    viewBox="0 0 24 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M22.4 4.10002H1.6C0.7164 4.10002 0 3.38362 0 2.50002C0 1.61642 0.7164 0.900024 1.6 0.900024H22.4C23.2836 0.900024 24 1.61642 24 2.50002C24 3.38362 23.2836 4.10002 22.4 4.10002Z"/>
                                    <path
                                        d="M22.4 20.1H1.6C0.7164 20.1 0 19.3836 0 18.5C0 17.6164 0.7164 16.9 1.6 16.9H22.4C23.2836 16.9 24 17.6164 24 18.5C24 19.3836 23.2836 20.1 22.4 20.1Z"/>
                                    <path
                                        d="M22.4 12.1H1.6C0.7164 12.1 0 11.3836 0 10.5C0 9.61642 0.7164 8.90002 1.6 8.90002H22.4C23.2836 8.90002 24 9.61642 24 10.5C24 11.3836 23.2836 12.1 22.4 12.1Z"/>
                                </svg>
                            </button>


                            <div className="header__actions">
                                <a onClick={handleHome} className="header__action">
                                    <svg
                                        width={32}
                                        height={32}
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M31.4629 14.5669L26.6131 9.71717V4.11489C26.6131 3.10191 25.7922 2.28098 24.7778 2.28098C23.7657 2.28098 22.9448 3.10191 22.9448 4.11489V6.04891L19.3338 2.43775C17.5484 0.653395 14.4443 0.65656 12.6631 2.44098L0.536877 14.5669C-0.178959 15.2842 -0.178959 16.4448 0.536877 17.1609C1.25304 17.878 2.41587 17.878 3.13177 17.1609L15.2568 5.03465C15.6518 4.64172 16.348 4.64172 16.7409 5.03349L28.868 17.1609C29.2276 17.5195 29.6965 17.6978 30.1652 17.6978C30.6348 17.6978 31.1044 17.5193 31.4629 17.1609C32.179 16.4448 32.179 15.2842 31.4629 14.5669Z"/>
                                        <path
                                            d="M16.637 8.51579C16.2847 8.16368 15.7142 8.16368 15.363 8.51579L4.69673 19.1789C4.52833 19.3472 4.43286 19.577 4.43286 19.8169V27.5941C4.43286 29.4191 5.91259 30.8988 7.73752 30.8988H13.0184V22.7204H18.9804V30.8988H24.2613C26.0862 30.8988 27.5659 29.4191 27.5659 27.5942V19.8169C27.5659 19.577 27.4713 19.3472 27.302 19.1789L16.637 8.51579Z"/>
                                    </svg>
                                </a>
                                <div className="header__lang">
                                    <button
                                        className="header__lang-btn"
                                        type="button"
                                        id="drop03"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img src={activeLanguage?.flag} alt=""/>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="drop03">
                                        <div className="header__lang-menu">
                                            {
                                                languages?.map(language => (
                                                    <a

                                                        key={language?.key}
                                                        onClick={e =>
                                                            store.dispatch({
                                                                type: APPEARANCE_CONSTANTS.SET_ACTIVE_LANGUAGE,
                                                                data: language?.key
                                                            })
                                                        }
                                                        className={activeLanguage?.key === language?.key ? 'active' : ''}>
                                                        <img src={language?.flag} alt=""/>
                                                        {language?.title}
                                                    </a>
                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>
                                {/*<a onClick={handleHowToPlay} className="header__action">*/}
                                {/*    <svg*/}
                                {/*        width={32}*/}
                                {/*        height={32}*/}
                                {/*        viewBox="0 0 32 32"*/}
                                {/*        fill="none"*/}
                                {/*        xmlns="http://www.w3.org/2000/svg"*/}
                                {/*    >*/}
                                {/*        <path*/}
                                {/*            d="M18.6509 23.9994H12.6508C12.3844 23.9994 12.151 24.1 11.951 24.2996C11.7508 24.4998 11.6509 24.7329 11.6509 24.9996V31.0001C11.6509 31.2668 11.7511 31.5002 11.951 31.7C12.151 31.8996 12.3842 32 12.6508 32H18.6509C18.9173 32 19.1514 31.8999 19.3506 31.7C19.5511 31.5002 19.6512 31.2668 19.6512 31.0001V24.9996C19.6512 24.7329 19.5514 24.4998 19.3506 24.2996C19.1514 24.0995 18.9173 23.9994 18.6509 23.9994Z"/>*/}
                                {/*        <path*/}
                                {/*            d="M26.5267 6.03771C25.8431 4.7787 24.96 3.7167 23.8764 2.84981C22.7935 1.98326 21.576 1.29124 20.2263 0.774777C18.8763 0.258492 17.5347 0 16.2011 0C11.1346 0 7.268 2.21671 4.60112 6.65023C4.46793 6.86678 4.42196 7.10005 4.46355 7.35014C4.50541 7.59987 4.63457 7.80828 4.8512 7.97491L8.95136 11.1002C9.16799 11.2333 9.3764 11.2999 9.57648 11.2999C9.87657 11.2999 10.1347 11.1664 10.3516 10.8998C11.5514 9.39995 12.4433 8.44164 13.0266 8.02474C13.7434 7.54155 14.6431 7.30005 15.7265 7.30005C16.7431 7.30005 17.6387 7.56677 18.414 8.09969C19.189 8.63314 19.5761 9.24986 19.5761 9.94986C19.5761 10.7329 19.3681 11.3665 18.9513 11.8498C18.5348 12.333 17.8345 12.7995 16.851 13.2497C15.5513 13.8329 14.3591 14.7372 13.2763 15.9623C12.1927 17.1874 11.6513 18.4916 11.6513 19.8748V20.9998C11.6513 21.3168 11.7383 21.6291 11.9136 21.9374C12.0887 22.246 12.3011 22.4001 12.5513 22.4001H18.5513C18.818 22.4001 19.0511 22.2712 19.2513 22.012C19.4509 21.7543 19.5513 21.4834 19.5513 21.2005C19.5513 20.7839 19.7805 20.225 20.2384 19.5254C20.6968 18.8254 21.2675 18.2832 21.9514 17.8997C22.601 17.5332 23.1089 17.2377 23.476 17.0124C23.8434 16.7877 24.3222 16.4244 24.9141 15.9248C25.5056 15.4246 25.9641 14.9287 26.2887 14.4372C26.6138 13.9456 26.9056 13.308 27.164 12.5245C27.4228 11.7412 27.5517 10.8994 27.5517 9.99951C27.5515 8.61615 27.2096 7.29541 26.5267 6.03771Z"/>*/}
                                {/*    </svg>*/}
                                {/*</a>*/}
                                <button className="header__action" type="button"
                                        onClick={e => toggleFullScreen(document.body)}
                                >
                                    <svg
                                        width={32}
                                        height={32}
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M11.325 2C11.325 2.53043 11.1143 3.03914 10.7392 3.41421C10.3641 3.78929 9.85543 4 9.325 4H4V9.325C4 9.85543 3.78929 10.3641 3.41421 10.7392C3.03914 11.1143 2.53043 11.325 2 11.325C1.46957 11.325 0.960859 11.1143 0.585786 10.7392C0.210714 10.3641 0 9.85543 0 9.325V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0L9.325 0C9.85543 0 10.3641 0.210714 10.7392 0.585786C11.1143 0.960859 11.325 1.46957 11.325 2ZM9.325 28H4V22.675C4 22.1446 3.78929 21.6359 3.41421 21.2608C3.03914 20.8857 2.53043 20.675 2 20.675C1.46957 20.675 0.960859 20.8857 0.585786 21.2608C0.210714 21.6359 0 22.1446 0 22.675L0 30C0 30.5304 0.210714 31.0391 0.585786 31.4142C0.960859 31.7893 1.46957 32 2 32H9.325C9.85543 32 10.3641 31.7893 10.7392 31.4142C11.1143 31.0391 11.325 30.5304 11.325 30C11.325 29.4696 11.1143 28.9609 10.7392 28.5858C10.3641 28.2107 9.85543 28 9.325 28ZM30 20.675C29.4696 20.675 28.9609 20.8857 28.5858 21.2608C28.2107 21.6359 28 22.1446 28 22.675V28H22.675C22.1446 28 21.6359 28.2107 21.2608 28.5858C20.8857 28.9609 20.675 29.4696 20.675 30C20.675 30.5304 20.8857 31.0391 21.2608 31.4142C21.6359 31.7893 22.1446 32 22.675 32H30C30.5304 32 31.0391 31.7893 31.4142 31.4142C31.7893 31.0391 32 30.5304 32 30V22.675C32 22.1446 31.7893 21.6359 31.4142 21.2608C31.0391 20.8857 30.5304 20.675 30 20.675ZM30 0H22.675C22.1446 0 21.6359 0.210714 21.2608 0.585786C20.8857 0.960859 20.675 1.46957 20.675 2C20.675 2.53043 20.8857 3.03914 21.2608 3.41421C21.6359 3.78929 22.1446 4 22.675 4H28V9.325C28 9.85543 28.2107 10.3641 28.5858 10.7392C28.9609 11.1143 29.4696 11.325 30 11.325C30.5304 11.325 31.0391 11.1143 31.4142 10.7392C31.7893 10.3641 32 9.85543 32 9.325V2C32 1.46957 31.7893 0.960859 31.4142 0.585786C31.0391 0.210714 30.5304 0 30 0Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )

}


export default Header
