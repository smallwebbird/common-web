import React, { useState } from 'react';
import './index.less';

const prefixCls = 'input'
export default function InputColor () {
    const [ imgSrc, setImgSrc ] = useState('')
    const onInput = function (e) {
        // e.target.value 获取的是文件的路径名
        let file = e.target.files[0]
        if (file) {
            var reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = function () {
                console.log(reader.result)
                setImgSrc(reader.result)
                // var iframe = "<iframe width='100%' height='100%' src='" + reader.result + "'></iframe>"
                // var x = window.open();
                // x.document.open();
                // x.document.write(iframe);
                // x.document.close();

            }
        }
        if (file) {
            var reader = new FileReader();
            reader.readAsBinaryString(file)
            reader.onloadend = function () {
                console.log(reader.result)
            }
        }
        if (file) {
            var reader = new FileReader()
            reader.readAsText(file, 'utf8')
            reader.onloadend = function () {

            }
        }
    }
    return (
        <div className={`${prefixCls}-file`}>
            <input type="file" onInput={onInput}/>
            <a href={imgSrc}>文件</a>
            <iframe width="500" height="500" src={imgSrc}></iframe>
        </div>
    )
}