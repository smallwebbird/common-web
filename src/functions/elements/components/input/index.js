import React, { useState, useCallback } from 'react';
import InputText from './input-text';
import InputColor from './input-color';
import InputFile from './input-file';
import InputDate from './input-date';
import InputCheckbox from './input-checkbox';

const prefixCls = 'input'
function Input () {
    return (
        <div>
            <InputText />
            <InputColor />
            <InputFile />
            <InputDate />
            <InputCheckbox />
        </div>
    )
}

export default Input;