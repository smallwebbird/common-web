import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';

import './index.less';

const prefixCls = 'api-history';
export default function HistoryApi () {
    const [ content, setContent ] = useState('');
    useEffect(() => {
        if (!window.BroadcastChannel) {
            console.log('不支持频道')
        }
        let bc = new BroadcastChannel('test');
        bc.postMessage("hello");
        bc.onmessage = function (msg) {
            console.log(msg)
        }
    }, [])
    useEffect(() => {
        // 只有在浏览器触发前进后退按钮，或者调用location.push
        window.addEventListener('popstate', (e) => {
            if (e.state.msg) {
                setContent(e.state.msg);
            } else {
                setContent('');
            }
        })
    })
    const clickRediret = useCallback(() => {
        window.location.replace(`/web/a?redirect_url=${window.location.href}`)
    })
    const clickRediret1 = useCallback(() => {
        window.location.href = `/web/b?redirect_url=${window.location.href}`;
    })
    const pushRoute = useCallback((msg) => {
        setContent(msg)
        window.history.pushState({msg}, null, `?${msg}`);
    })
    return (
        <div>
            <div onClick={clickRediret}>重定向测试301</div>
            <div onClick={clickRediret1}>重定向测试302</div>
            <div className={prefixCls}>
                history Api <br />
                <div className={`${prefixCls}-wrap`}>
                    <span onClick={() => {pushRoute('one')}}>one</span>
                    <span onClick={() => {pushRoute('two')}}>two</span>
                    <span onClick={() => {pushRoute('three')}}>three</span>
                    <span onClick={() => {pushRoute('four')}}>four</span>
                </div>
                <div className={`${prefixCls}-content`}>
                    {content}
                </div>
            </div>
            <div>
                <h2>注意点</h2>
                history.pushState和replaceState必须得是同源的
            </div>
        </div>
    )
}