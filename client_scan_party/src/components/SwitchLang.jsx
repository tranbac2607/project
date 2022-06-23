import React, { useEffect } from 'react';
import "../assets/scss/index.scss"
import Toggle from 'react-toggle'
import { EnglishIcon, VietNamIcon } from '../assets/icons';
import i18n from '../../i18n';

export default function SwitchLang() {
    return (
        <div style={{ padding: '10px 20px', margin: '0px 5px', border: '1px solid #c0c0c0', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
            <label>language</label>
            <label style={{ height: '24px' }}>
                <Toggle
                    defaultChecked={isVi}
                    icons={{
                        checked: <span className="toggle_BsTx"><VietNamIcon /></span>,
                        unchecked: <span className="toggle_BsTx"><EnglishIcon /></span>,
                    }}
                    onChange={() => setVi(!isVi)} />
            </label>
        </div>
    )
}