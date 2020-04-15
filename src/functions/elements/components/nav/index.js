import React from 'react';

import './index.less';

const prefixCls = 'nav';
export default function Nav () {
    return (
        <div>
            {/*进度条样式*/}
            <progress value="50" max="100"></progress>
            <nav className={`${prefixCls}-nav`}>
                <ol>
                    <li className={`${prefixCls}-li`}><a href="#">one</a></li>
                    <li className={`${prefixCls}-li`}><a href="#">two</a></li>
                    <li className={`${prefixCls}-li`}>three</li>
                </ol>
            </nav>
        </div>
    )
}