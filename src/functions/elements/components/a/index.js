import React, { useEffect, useState, useRef } from 'react';
import pic from '../video/pic.jpeg'

function ATag () {
    let canvasRef = useRef()
    const [ cRef, setCRef ] = useState(null)
    const [ blobUrl, setBlobUrl ] = useState(null)
    useEffect(() => {
        let blob = new Blob(["hello", "world"], {type: "text/plain"})
        setBlobUrl(URL.createObjectURL(blob))
    }, [])
    // 模拟出componentDidmount
    useEffect(() => {
        let canvas = canvasRef.current
        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
            setCRef(canvas);
            (function () {
                Object.getPrototypeOf(ctx).Triangle = function (x, y, r) {
                    this.save();
                    this.translate(x, y);
                    this.rotate(r);
                    this.beginPath();
                    this.moveTo(0, 0);
                    this.lineTo(10, 0);
                    this.lineTo(0, 10);
                    this.lineTo(-10, 0);
                    this.closePath();
                    this.fill();
                    this.restore();
                }
                Object.getPrototypeOf(ctx).line = function (x, y, x1, y1) {
                    this.save();
                    this.beginPath();
                    this.moveTo(x, y);
                    this.lineTo(x1, y1);
                    this.stroke();
                    this.restore();
                }
            })();
            ctx.strokeStyle = "#7C8B8C";
            ctx.line(90, 130, 320, 210);
            ctx.Triangle(320, 210, -Math.PI * .4);
        }
    }, [])
    // 模拟componentWillUnmount
    useEffect(() => {
        return function cleanUp () {

        }
    }, [])
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
                <a href="http://www.baidu.com" target="_self">_self</a>
                <a href="http://www.baidu.com" target="_blank">_blank</a>
                <div>发送电子邮件</div>
                <a href="mailto:1175543548@qq.com">发送邮件</a>
                <div>创建电话连接</div>
                <a href="tel:13238009550">电话</a>
                <div>具有相同target值的链接</div>
                <a href="http://www.baidu.com" target="hello">百度</a>
                <a href="http://cn.bing.com" target="hello">必应</a>
                <a href="http://www.soso.com" target="hello">搜搜</a>
                <div>iframe</div>
                <iframe width="100%" src="http://localhost:3000/son1.html" name="son1" title="son1"></iframe>
                <iframe width="100%" src="http://localhost:3000/son2.html" name="son2" title="son2"></iframe>
                <div>_top, _parent</div>
                <iframe width="100%" src="http://localhost:3000/father.html" height="1000px" title="main"></iframe>
                <div >将canvas转化为图片格式</div>
                <canvas ref={canvasRef} width="500" height="500">
                </canvas>
                <a href={cRef && cRef.toDataURL()} download="paint.png">下载canvas</a>
                // 参考链接  https://www.cnblogs.com/starof/p/4014691.html
                // a链接的样式顺序 爱恨 love hate   a:link a:visited a:hover a:active
            </div>
        </div>
    )
}

export default ATag;