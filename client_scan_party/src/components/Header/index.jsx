import React from 'react';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

function Header() {
    const { t } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }
    return (
        <div>
            <p>{t('welcome_to_scan_party')}</p>
            <button onClick={() => changeLanguage('vi')}>vi</button>
            <button onClick={() => changeLanguage('en')}>en</button>
        </div>
    )
}

export default Header; 