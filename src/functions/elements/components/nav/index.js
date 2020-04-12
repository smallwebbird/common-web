import React from 'react';

import './index.less';

const prefixCls = 'nav';
export default function Nav () {
    return (
        // 自定义面包屑
        <nav className={`${prefixCls}-nav`}>
            <ol>
                <li className={`${prefixCls}-li`}><a href="#">one</a></li>
                <li className={`${prefixCls}-li`}><a href="#">two</a></li>
                <li className={`${prefixCls}-li`}>three</li>
            </ol>
        </nav>
    )
}