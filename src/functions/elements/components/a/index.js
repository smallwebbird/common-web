import React, { useEffect, useState } from 'react';
import pic from '../video/pic.jpeg'

function ATag () {
    let blobUrl = ""
    useEffect(() => {
        let blob = new Blob(["hello", "world"], {type: "text/plain"})
        blobUrl = URL.createObjectURL(blob)
        console.log(blobUrl)
    })
    return (
        <div>
            <div>
                <div>download属性</div>
                <div>download属性不带/</div>
                <a download="文件名" href={pic}>下载文件</a>
                <div>download带/,文件名会被转化为_</div>
                <a download="/文件名" href={pic}>下载文件</a>
                <div>下载blob</div>
                <a download="blob文件" href={blobUrl}>下载文件</a>
                <div>a标签的target属性</div>
                <a href="www.baidu.com"></a>
            </div>
        </div>
    )
}

export default ATag;