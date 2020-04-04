import React from 'react';
import './index.less';

const prefixCls = 'button';
function Button () {
    return (
        <div>
            <div>disabled样式</div>
            <button className={`${prefixCls}-disabled`} disabled>disabled</button>
            <div>button在form中的使用</div>
            <form id="form" method="post" action="">
                <label htmlFor="name">姓名：</label>
                <input id="name" name="name" type="input" />
                <label htmlFor="age">年龄：</label>
                <input id="age" name="age" type="input" />
            </form>
            // 提交的时候默认的数据格式是application/x-www-form-urlencoded
            <button form="form">提交</button>
            <button form="form" formAction="/formaction">formaction提交</button>
            <button formEncType="multipart/form-data" form="form">multipart提交</button>
            <button formMethod="get">formMethod提交</button>
            <div>设置button的样式</div>
            <button className={`${prefixCls}-btn`}>样式</button>
        </div>
    )
}

export default Button;