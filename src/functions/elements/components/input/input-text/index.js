import React, {useState, useCallback} from 'react';
import './index.less';


const prefixCls = 'input'
function InputText () {
    const [ value, setValue ] = useState(0);
    const memoizedCallback = useCallback(
        // value值发生变化就会被调用
        () => {
            console.log('值发生变化')
        },
        [value]
    )
    memoizedCallback()
    return (
        <div className={`${prefixCls}-text`}>
                <form id="text">
                    <div>文本input</div>
                    <div>
                        autocomplete, autofocus属性
                        // TODO: 为什么会有这样的写法
                        <input type="text" autoFocus={true} autoComplete="true"/>
                    </div>
                    <div>
                        disabled
                        <input type="text" disabled/>
                    </div>
                    <div>
                        datalist
                        <input className={`${prefixCls}-text-datalist`} type="text" list="datalist" />
                        <datalist id="datalist" className={`${prefixCls}-text-list`}>
                            <option value="hello" />
                            <option value="world"/>
                        </datalist>
                    </div>
                    <div>
                        pattern
                        { /* 要加上title属性用于提示 */}
                        <input pattern="[A-Za-z]{3}" title="和请求的格式保持一致"/>
                    </div>
                    <div>
                        minlength & maxlength
                        <input maxLength="10" minLength="5" />
                    </div>
                    <div>
                        required
                        <input required={true}/>
                    </div>
                    <div>
                        readonly
                        <input readOnly={true} />
                    </div>
                    <div>
                        name & value
                        <input name="name"  value={value} onChange={(e) => {setValue(e.target.value)}}/>
                    </div>
                    <div>
                        <input type="submit" form="text" />
                    </div>
                </form>
            </div>
    )
}
export default InputText;