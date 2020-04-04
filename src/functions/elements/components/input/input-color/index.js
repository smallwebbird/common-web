import React, { useState } from 'react';
import ColorSelect from './components/color-select';
import './index.less';

const prefixCls = 'input'
export default function InputColor () {
    const [ color, setColor ] = useState('');
    const onInput = (e) => {
        console.log(e.target.value)
        setColor(e.target.value)
    }
    return (
        <div className={`${prefixCls}-color`}>
            <div>Color input</div>
            <input type="color" onInput={onInput}/>
            <div style={{ color: color }}>color 颜色变化</div>
            <div><span style={{color: 'red'}}>*</span>不用onchange事件，是因为input的onchange事件只有在input标签失去焦点时才会触发</div>
            <ColorSelect />
        </div>
    )
}