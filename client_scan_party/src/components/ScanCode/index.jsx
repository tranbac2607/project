import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { toast } from 'react-toastify';

function ScanCode({ height, width, scanTicket }) {
    const [result, setResult] = useState('');
    function handleScan(data) {
        // data && setResult(data.text);
        data && scanTicket(data)
        // data && toast(data.text)
    }
    const delay = 500;
    function handleError(err) {
        console.log(err.message)
    }
    const previewStyle = {
        height: height || 240,
        width: width || 320,
    }

    return (
        <>
            <QrReader
                delay={delay}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />
            <p>{result}</p>
        </>
    )
}

export default ScanCode;