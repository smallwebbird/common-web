import React, { useState, useRef, useReducer, useCallback, useEffect } from 'react';

import './index.less';

const prefixCls = 'input-range';
export default function InputRange () {
    const [ isDrop, setIsDrop ] = useState(false) 
    const [ value, setValue ] = useState(0);
    const [ sliderWidth, setSliderWidth ] = useState(0);
    const sliderRef = useRef(null);
    const outerRef = useRef(null);
    const innerRef = useRef(null);
    const thisRef = useRef();
    const thatRef = useRef();
    const changeValue = useCallback((e) => {
        setValue(e.target.value)
    }, [])
    const clickOuter = useCallback( (e) => {
        let width = e.pageX - e.target.offsetLeft - sliderRef.current.offsetWidth;
        if (width < 0) {
            width = 0
        }
        setSliderWidth(width);
    }, [])
    const windowMouseUp = useCallback(() => {
        console.log('在window上松开')
        setIsDrop(false)
        removeListener()
    }, [])
    const downOuter = useCallback( (e) => {
        setIsDrop(true);
        removeListener()
        addListener()
    }, [])
    const mouseOuter = useCallback((e) => {
        // 缓存的值一直都是false，所以我们需要为useCallback添加第二个参数，当isDrop变化，自动更新缓存
        if (thisRef.current) {
            let width = e.pageX - outerRef.current.offsetLeft;
            if (thatRef.current <= width) {
                width -= sliderRef.current.offsetWidth;
            }
            if (width <= 0) {
                width = 0;
            } 
            let maxWidth = outerRef.current.offsetWidth - sliderRef.current.offsetWidth; 
            if (width >= maxWidth) {
                width = maxWidth;
            }
            setSliderWidth(width);
        }
    }, [thisRef, thatRef])
    useEffect(() => {
        thisRef.current = isDrop;
        thatRef.current = sliderWidth;
    })
    // 以下4个方法，都不存在在回调函数中改变状态值
    const sliderMove = useCallback( (e) => {
        e.stopPropagation();
    }, [])
    const removeListener = useCallback( () => {
        window.removeEventListener('mousemove', mouseOuter, false)
        window.removeEventListener('mouseup', windowMouseUp, false)
        //window.removeEventListener('mousedown', windowMouseDown, false)
    }, [])
    const addListener = useCallback (() => {
        // 监听滑动到document
        window.addEventListener('mousemove', mouseOuter, false)
        window.addEventListener('mouseup', windowMouseUp, false)
        //window.addEventListener('mousedown', windowMouseDown, false)
    }, [])
    return (
        <div className={prefixCls}>
            <form action="/" method="POST" id="checkboxForm">
                <input onInput={changeValue} id="range" type="range" list="tickmarks" value={value} min="0" max="100" />
                <label htmlFor="range"></label>
                <datalist id="tickmarks">
                    <option value="0" label="0%"></option>
                    <option value="10"></option>
                    <option value="20"></option>
                    <option value="30"></option>
                    <option value="40"></option>
                    <option value="50" label="50%"></option>
                    <option value="60"></option>
                    <option value="70"></option>
                    <option value="80"></option>
                    <option value="90"></option>
                    <option value="100" label="100%"></option>
                </datalist>
                <div>自定义滑动</div>
                <div className={`${prefixCls}-outer`} ref={outerRef} onClick={clickOuter} onMouseMove={mouseOuter} onMouseDown={downOuter}>
                    <div className={`${prefixCls}-inner`} ref={innerRef} style={{ width: sliderWidth }}></div>
                    <div className={`${prefixCls}-slider`} onMouseMove={sliderMove} onClick={sliderMove} ref={sliderRef} style={{ left: sliderWidth }}></div>
                </div>
                <div>搜索</div>
                <div>
                    <input type="search"/>
                </div>
                <div>数字键盘，最好不用number类型，可以用正则或者tel类型</div>
                <div>
                    <span>带正则数字的输入框</span>
                    <input type="number" pattern="\d" />
                    <br />
                    <span>数字类型</span>
                    <input type="number" />
                    <br />
                    <span>电话类型</span>
                    <input type="tel" />
                </div>
            </form>
        </div>
    )
}
// input range 没有被广泛使用的原因可能就是样式比较难改