import React, { useState } from 'react';

const prefixCls = 'input-checkbox';
export default function InputCheckBox () {
    const [ form, setForm ] = useState({radio: '', checkbox: []})
    const changeRadio = function (e) {
        setForm({
            ...form,
            radio: e.target.value
        })
    }
    const changeCheckbox = function(e) {
        let value = e.target.value;
        let checked = e.target.checked;
        if (form.checkbox.includes(value)) {
            let index = form.checkbox.indexOf(value);
            form.checkbox.splice(index, 1);
        } else {
            form.checkbox.push(value)
        }
        console.log(form.checkbox)
    }
    return (
        <div className={prefixCls}>
            <form action="/" method="POST" id="checkboxForm">
            <div>单选框</div>
                <div><input onInput={changeRadio} type="radio" name="sport1" value="篮球"/> 篮球</div>
                <div><input onInput={changeRadio} type="radio" name="sport1" value="足球"/> 足球</div>
                <div><input onInput={changeRadio} type="radio" name="sport1" value="羽毛球"/> 羽毛球</div>
                <div>多选框</div>
                <div><input onInput={changeCheckbox} type="checkbox" name="sport" value="篮球"/> 篮球</div>
                <div><input onInput={changeCheckbox} type="checkbox" name="sport" value="足球"/> 足球</div>
                <div><input onInput={changeCheckbox} type="checkbox" name="sport" value="羽毛球"/> 羽毛球</div>
                <button form="checkboxForm">提交</button>
            </form>
        </div>
    )
}