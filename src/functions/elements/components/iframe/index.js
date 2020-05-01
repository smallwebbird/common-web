import React, { useRef, useCallback, useEffect } from 'react';

import './index.less';

const prefixCls = 'iframe';
export default function IframeStudy () {
    const iframeRef = useRef()
    useEffect(() => {
        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {
                console.log('进入全屏')
            } else {
                console.log('离开全屏')
            }
        }, false)
    }, [])
    const fullIframe = useCallback(() => {
        let con = window.confirm('确定打开全屏吗？')
        if (con) {
            iframeRef.current.requestFullscreen().then((result) => {
                
            }).catch((err) => {
                
            });
        }
    })
    const getSonValue = function () {
        // 获取子元素的window对象, 必须是同源的才能访问window和document对象，否则无法访问
        console.log(window.frames)
        let sonWindow = iframeRef.current.contentWindow
        let sonDocument = iframeRef.current.contentDocument
        console.log(sonWindow.sonValue)
    }
    return (
        <div>
            <div>
                <button onClick={fullIframe}>全屏</button>
                <button onClick={getSonValue}>获取子元素值</button>
            </div>
            {/* sandbox中可以指定一些iframe中允许的操作， 如果没有指定sandbox属性，那么默认在iframe中都允许 */}
            <iframe sandbox="" ref={iframeRef} id={`${prefixCls}-iframe`} className={`${prefixCls}-full`}  src="http://localhost:3000/iframe.html" width="300" height="300"></iframe>

        </div>
    )
}