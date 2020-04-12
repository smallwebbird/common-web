import React, { useState, useCallback } from 'react';
import InputText from './input-text';
import InputColor from './input-color';
import InputFile from './input-file';
import InputDate from './input-date';
import InputCheckbox from './input-checkbox';
import InputRange from './input-range';

import './index.less';

const prefixCls = 'input'
function Input () {
    return (
        <div>
            <InputText />
            <InputColor />
            <InputFile />
            <InputDate />
            <InputCheckbox />
            <InputRange />
            <div>笔记</div>
            <div>
                数字键盘在客户端的表现：android下不管是input 中的type是number还是tel都会弹出相应的九宫格数字，但是在ios下，type为number时弹出的不是
                9宫格的数字，而type是tel会弹出九宫格，在说一下input中的pattern，只有在type是number下才能调动起数字键盘，也就是说当type是text，但是pattern
                是数字格式，也调动不起数字键盘， 当pattern为[0-9]*或者\d, android中是9宫格的数字键盘，ios也是数字键盘但是不是9宫格
            </div>
            <div className={`${prefixCls}-submit`}>提交</div>
        </div>
    )
}

export default Input;