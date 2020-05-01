import React, { useCallback } from 'react';
import axios from 'axios';

export default function CookieApi () {
    const getCookie = useCallback(() => {
        console.log(document.cookie);
    })
    const setCookie = useCallback(() => {
        axios.get('/web/setCookie').then(() => {
            console.log('设置成功')
        })
    })
    return (
        <div>
            <button onClick={setCookie}>设置cookie</button>
            <button onClick={getCookie}>获取cookie</button>
        </div>
    )
}