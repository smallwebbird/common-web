import React, { useState } from 'react';
import colors from './colors';
import './index.less'

const prefixCls = 'color-select'
export default function ColorSelect () {
    const [color, setColor] = useState('')
    const [ visible, setVisible ] = useState(true)
    const onClick = () => {
        setVisible(!visible)
    }
    const itemClick = (color) => {
        setColor(color)
        setVisible(!visible)
    }
    return (
        <div className={prefixCls}>
            <div className={`${prefixCls}-preview`} onClick={onClick} style={{background: color}}>&nbsp;</div>
            <div className={`${prefixCls}-selects`} style={ visible ? {display: 'none'} : {} }>
                {
                    colors.map(item => (
                        <div className={ (color === item) ? `${prefixCls}-selects-item ${prefixCls}-selects-item-active ` 
                            : `${prefixCls}-selects-item`} key={item} style={{background: item}} onClick={itemClick.bind(this, item)}></div>
                    ))
                }
            </div>
        </div>
    )
}