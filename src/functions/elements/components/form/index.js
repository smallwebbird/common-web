import React, { useEffect, useRef, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

const prefixCls = "form"
export default function Form () {
    const [ visible, setVisible] = useState(false)
    const dialogRef = useRef()
    const inputInvalid = function (e) {
        e.preventDefault();
        if (!e.target.validity.valid) {
            let brotherNode = e.target.nextElementSibling;
            brotherNode.innerHTML = '验证失败'
            brotherNode.style.display = 'block'
        }
    }
    // 也可以添加自定义规则
    const onInput = useCallback((e) => {
        let brotherNode = e.target.nextElementSibling;
        brotherNode.style.display = 'none'
    })
    const clickDialog = useCallback(() => {
        dialogRef.current.showModal()
    })
    const clickOk = useCallback(() => {
        dialogRef.current.close()
    })
    const clickCancel = useCallback(() => {
        dialogRef.current.close()
    })
    const showModal = () => {
        setVisible(!visible)
    }
    const onClick = useCallback(() => {
        setVisible(false)
    })
    return (
        <div className={prefixCls}>
            <form> 
                <div>
                    <label>姓名：</label>
                    <input onInvalid={inputInvalid} onInput={onInput} type="text" placeholder="请输入姓名" pattern="[\u4e00-\u9fa5]{1,5}" name="name"/>
                    <div className={`${prefixCls}-error`}></div>
                </div>
                <div>
                    <label>手机号：</label>
                    <input onInvalid={inputInvalid} onInput={onInput}  type="text" placeholder="请输入手机号" pattern="^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$"/>
                    <div className={`${prefixCls}-error`}></div>
                </div>
                <div>
                    <label>身份证号：</label>
                    <input onInvalid={inputInvalid} onInput={onInput}  type="text" placeholder="请输入身份证号" pattern="^([0-9]){7,18}(x|X)?$" />
                    <div className={`${prefixCls}-error`}></div>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
            <dialog ref={dialogRef} className={`${prefixCls}-dialog`}>
                <div>some data</div>
                <div>
                    <button onClick={clickOk}>确认</button>
                    <button onClick={clickCancel}>取消</button>
                </div>
            </dialog>
            <div onClick={clickDialog}>弹出弹出框</div>
            <div onClick={showModal}>显示modal</div>
            <CustomerDialog visible={visible} className={`${prefixCls}-back`} onClick={onClick}>
                <div onClick={(e) => {e.nativeEvent.stopPropagation()}}>
                    <div className={`${prefixCls}-back-wrap`}>
                    
                    </div>
                </div>
            </CustomerDialog>
        </div>
    )
}


function CustomerDialog (props) {
    const [ isFirst, setIsFirst ] = useState(true) 
    const dialogRef = useRef()
    const propsRef = useRef()
    const domRef = useRef();
    useEffect(() => {
        propsRef.current = props
        domRef.current = document.createElement('div')
    }, [])
    useEffect(() => {
        dialogRef.current = isFirst
    })
    useEffect(() => {
        // 对依赖项的比较是一个深层比较
        domRef.current.className = props.className;
        if (props.visible && dialogRef.current) {
            console.log(props.onClick)
            domRef.current.addEventListener('click', (e) => {
                if (e.target !== domRef.current) {
                    return
                }
                props.onClick()
            }, false)
            ReactDOM.render(props.children, domRef.current)
            document.body.appendChild(domRef.current)
            setIsFirst(false)
        }
        if (!props.visible) {
            domRef.current.classList.add(`${props.className}-visible`)
        } else {
            domRef.current.classList.remove(`${props.className}-visible`)
        }
        propsRef.current = props
    }, [props])
    return ( 
        null
    )
}