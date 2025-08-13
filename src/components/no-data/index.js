import React from "react";
import {useTranslation} from "react-i18next";

const NoData = ({content = ''}) => {

    const {t} = useTranslation()
    return (
        <div className="note note--small">
            <i className="ti ti-box"/>
            <p>
                {content ? content : t('components.no-content')}
            </p>
        </div>
    )

}

export default NoData

