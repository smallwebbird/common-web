import React from 'react';
import './index.css'

const prefixCls = 'input-class';
export default function InputClass () {
    return (
        <div className={prefixCls}>
            <div className={`${prefixCls}-placeholder-shown`}>
                placeholder-shown伪类的使用，就是有placehold这个属性才生效，没有的话就不生效<br />
                <input className={`${prefixCls}-placeholder-shown-input`} type="text" placeholder="请输入姓名" />
                <label className={`${prefixCls}-placeholder-shown-label`}>姓名</label>
            </div>
        </div>
    )
}