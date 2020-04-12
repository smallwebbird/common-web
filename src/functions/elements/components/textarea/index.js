import React, { useRef, useEffect, useState } from 'react';

import './index.less'

const prefixCls = 'input-textarea';
export default function Textarea () {
    const [ value, setValue ] = useState('')
    return (
        <div>
            <div>多行输入框</div>
            <div>属性： rows: 30 cols: 100, 最大字数：1000, 最小长度： 10</div>
            <textarea className={prefixCls} rows="3" cols="100"></textarea>
            <div>实现高度自适应的输入框</div>
            <div className={`${prefixCls}-autoHeight`}>
                <div className={`${prefixCls}-pre`}>{value}</div>
                <textarea onChange={e => { setValue(e.target.value) }}  className={`${prefixCls}-text`}></textarea>
            </div>
        </div>
    )
}