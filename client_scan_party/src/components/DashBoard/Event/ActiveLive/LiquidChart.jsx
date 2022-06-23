import React, { useState, useEffect } from 'react';
import { Liquid, measureTextWidth } from '@ant-design/charts';
import io from "socket.io-client";
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
const socket = io.connect(process.env.REACT_APP_API_URL);

function LiquidChart() {
    const {t} = useTranslation();
    const [percent, setPercent] = useState(0.01);
    const [userJoin, setUserJoin] = useState(0);
    const eventId = useParams();
    let ref;
    let config = {
        percent,
        statistic: {
            title: {
                formatter: function formatter() {
                    return t('joined');
                },
                style: function style(_ref) {
                    let percent = _ref.percent;
                    return { fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)' };
                },
            },
            content: {
                style: function style(_ref2) {
                    let percent = _ref2.percent;
                    return {
                        fontSize: 60,
                        lineHeight: 1,
                        fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
                    };
                },
                customHtml: (container, view, { percent }) => {
                    const { width, height } = container.getBoundingClientRect();
                    const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                    const text = `${userJoin}`;
                    const textWidth = measureTextWidth(text, { fontSize: 60 });
                    const scale = Math.min(d / textWidth, 1);
                    return `<div style="width:${d}px;display:flex;align-items:center;justify-content:center;font-size:${scale}em;line-height:${scale <= 1 ? 1 : 'inherit'
                        }">${text}</div>`;
                },
            },
        },
        liquidStyle: function liquidStyle(_ref4) {
            let percent = _ref4.percent;
            return {
                fill: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
                stroke: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
            };
        },
        color: function color() {
            return '#5B8FF9';
        },
        wave: { length: 128 },
    };

    function countPer(data) {
        const {countTicket, countTicketUsed} = data;
        const per = countTicketUsed / countTicket
        setPercent(per)
        setUserJoin(countTicketUsed)
    }

    socket.on("userJoin", (newData) => {
        countPer(newData);
    })

    useEffect(() => {
        eventId && socket.emit("userJoin", eventId)
    },[eventId])
    
    return <Liquid {...config} chartRef={(chartRef) => (ref = chartRef)} />;
};

export default LiquidChart;