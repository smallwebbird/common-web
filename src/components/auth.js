import React, { useEffect, useState } from 'react';


function Auth (props) {
    const [ showPage, setShowPage ] = useState(false);
    // 模拟授权操作
    useEffect(() => {
        // 模拟授权操作
        let timer = null;
        (new Promise((resolve, reject) => {
            timer = setTimeout(() => {
                resolve('ok')
            }, 500)
        }))
        .then((res) => {
            setShowPage(true);
        })
        .catch((err) => {
            setShowPage(false);
        })
        return function removeTimer () {
            clearTimeout(timer);
        }
    });
    return (
        <div>
            {
                showPage ? props.children : <div>加载中.....</div>
            }
        </div>
    )
}
export default Auth;