const HowToPlay = () => {


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="htp">
                        <span className="htp__tag">Crypto Futures, Binary, Forex Futures</span>
                        <h1 className="htp__title">NASIL OYNANIR?</h1>
                    </div>
                </div>
                <div className="col-12">
                    <div className="sidebar sidebar--htp">
                        <div className="sidebar__tabs sidebar__tabs--htp">
                            <ul
                                className="nav nav-tabs sidebar__tabs-nav sidebar__tabs-nav--htp"
                                id="tabs-nav0"
                                role="tablist"
                            >
                                <li className="nav-item" role="presentation">
                                    <button
                                        id="1-tab"
                                        className="active"
                                        data-bs-toggle="tab"
                                        data-bs-target="#tab-1"
                                        type="button"
                                        role="tab"
                                        aria-controls="tab-1"
                                        aria-selected="true"
                                    >
                                        <span>Crypto Futures</span>
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        id="2-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#tab-2"
                                        type="button"
                                        role="tab"
                                        aria-controls="tab-2"
                                        aria-selected="false"
                                    >
                                        <span>Up or Down</span>
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        id="3-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#tab-3"
                                        type="button"
                                        role="tab"
                                        aria-controls="tab-3"
                                        aria-selected="false"
                                    >
                                        <span>Forex Futures</span>
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div
                                    className="tab-pane fade active show"
                                    id="tab-1"
                                    role="tabpanel"
                                    aria-labelledby="1-tab"
                                    tabIndex={0}
                                >
                                    <div className="htp__content">
                                        <div className="htp__img">
                                            <img className="active" src="img/htp/1.png" alt=""/>
                                            <img src="img/htp/2.png" alt=""/>
                                            <img src="img/htp/3.png" alt=""/>
                                        </div>
                                        <div className="htp__tabs">
                                            {/* .green. .blue .orange */}
                                            <div className="htp__tab green active">
                                                <span>1</span>
                                                <p>
                                                    Sol üst tarafta bulunan sembol listesinden{" "}
                                                    <b>işlem yapacağınız sembolü seçiniz.</b>
                                                </p>
                                            </div>
                                            {/* .green. .blue .orange */}
                                            <div className="htp__tab green">
                                                <span>2</span>
                                                <p>
                                                    İşleme girmek istediğiniz sembolün <b>çarpan değeri</b> ve{" "}
                                                    <b>işlem miktarını seçiniz.</b>
                                                </p>
                                            </div>
                                            {/* .green. .blue .orange */}
                                            <div className="htp__tab green">
                                                <span>3</span>
                                                <p>
                                                    Seçtiğiniz sürede ürün fiyatının düşeceğini düşünüyorsanız{" "}
                                                    <strong>Düşer</strong>'e yükseleceğini düşünüyorsanız{" "}
                                                    <b>Yükselir</b>'e tıklayınız.Tahmininiz doğru sonuçlanırsa
                                                    kazanç elde edersiniz.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="tab-2"
                                    role="tabpanel"
                                    aria-labelledby="2-tab"
                                    tabIndex={0}
                                >
                                    <div className="htp__content">
                                        <div className="htp__img">
                                            <img src="img/htp/1.png" alt=""/>
                                            <img src="img/htp/2.png" alt=""/>
                                            <img src="img/htp/3.png" alt=""/>
                                        </div>
                                        <div className="htp__tabs">
                                            {/* .green. .blue .orange */}
                                            <div className="htp__tab blue active">
                                                <span>1</span>
                                                <p>
                                                    Sol üst tarafta bulunan sembol listesinden{" "}
                                                    <b>işlem yapacağınız sembolü seçiniz.</b>
                                                </p>
                                            </div>
                                            {/* .green. .blue .orange */}
                                            <div className="htp__tab blue">
                                                <span>2</span>
                                                <p>
                                                    İşleme girmek istediğiniz sembolün <b>çarpan değeri</b> ve{" "}
                                                    <b>işlem miktarını seçiniz.</b>
                                                </p>
                                            </div>
                                            {/* .green. .blue .orange */}
                                            <div className="htp__tab blue">
                                                <span>3</span>
                                                <p>
                                                    Seçtiğiniz sürede ürün fiyatının düşeceğini düşünüyorsanız{" "}
                                                    <strong>Düşer</strong>'e yükseleceğini düşünüyorsanız{" "}
                                                    <b>Yükselir</b>'e tıklayınız.Tahmininiz doğru sonuçlanırsa
                                                    kazanç elde edersiniz.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="tab-3"
                                    role="tabpanel"
                                    aria-labelledby="3-tab"
                                    tabIndex={0}
                                >
                                    <div className="htp__content">
                                        <div className="htp__img">
                                            <img src="img/htp/1.png" alt=""/>
                                            <img src="img/htp/2.png" alt=""/>
                                            <img src="img/htp/3.png" alt=""/>
                                        </div>
                                        <div className="htp__tabs">
                                            {/* .green. .blue .orange */}
                                            <div className="htp__tab orange active">
                                                <span>1</span>
                                                <p>
                                                    Sol üst tarafta bulunan sembol listesinden{" "}
                                                    <b>işlem yapacağınız sembolü seçiniz.</b>
                                                </p>
                                            </div>
                                            {/* .green. .blue .orange */}
                                            <div className="htp__tab orange">
                                                <span>2</span>
                                                <p>
                                                    İşleme girmek istediğiniz sembolün <b>çarpan değeri</b> ve{" "}
                                                    <b>işlem miktarını seçiniz.</b>
                                                </p>
                                            </div>
                                            {/* .green. .blue .orange */}
                                            <div className="htp__tab orange">
                                                <span>3</span>
                                                <p>
                                                    Seçtiğiniz sürede ürün fiyatının düşeceğini düşünüyorsanız{" "}
                                                    <strong>Düşer</strong>'e yükseleceğini düşünüyorsanız{" "}
                                                    <b>Yükselir</b>'e tıklayınız.Tahmininiz doğru sonuçlanırsa
                                                    kazanç elde edersiniz.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default HowToPlay
