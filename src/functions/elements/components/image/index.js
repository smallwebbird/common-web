import React, { useRef, useCallback, useEffect, useState, useReducer } from 'react';
import Logo from './logo192.png';
import Default from './default.jpeg';
import './index.less';

const prefixCls = 'image'
export default function ImageElement () {
    const lazy1Ref = useRef();
    const lazy2Ref = useRef()
    const [ lazy1Imgs, setLazy1Imgs ] = useState([])
    const lazyLoad1 = useCallback(() => {
        let imgs = document.getElementsByClassName("image-lazy1-img");
        Array.prototype.slice.call(imgs).forEach((item) => {
            if ((item.offsetTop - lazy1Ref.current.scrollTop < (lazy1Ref.current.offsetHeight -2)) && (item.getAttribute('src') === Default)) {
                console.log('满足条件')
                item.src = item.getAttribute('data-src');
            }
        })
    })
    useEffect(() => {
        lazyLoad1()
        lazy1Ref.current.addEventListener('scroll', lazyLoad1)
        window.addEventListener('resize', lazyLoad1)
        // 第二种这个方法比较简单一些
        let imgs = document.getElementsByClassName("image-lazy2-img");
        let opts = {
            root: lazy2Ref.current
        }
        var observer = new IntersectionObserver((entries) => {
            entries.forEach((item) => {
                if (item.isIntersecting) {
                    item.target.src = item.target.dataset.src
                    observer.unobserve(item.target)
                }
            })
        }, opts)
        Array.from(imgs).forEach(item => {
            observer.observe(item)
        })
    }, [])
    return (
        <div>
            <div className={`${prefixCls}-loading`}>
                <div>为img标签增加loading属性就可以实现图片懒加载，但是现在这个属性浏览器兼容性不太好, 还有另一个属性值，eager 立即加载图像</div>
                {
                    [1,2,3,4,5].map((item) => {
                        return <div key={item} className={`${prefixCls}-loading-item`}>{item}</div>
                    })
                }
                <div>可以使用referrerPolicy属性来实现从网上盗图</div>
                <img referrerPolicy="no-referrer" loading="lazy" src="https://pic3.zhimg.com/v2-78bfec2b6f52903dfe09f0c20ac21089_1200x500.jpg" />
            </div>
            <div>
                <p>根据分辨率不同加载不同的图片, src 中指定的图片默认为1x, 也就是devicePixelRatio 为1时，自动加载的src中图片
                同理， devicePixelRatio 为 2 和 3，时会加载srcSet中指定的 </p>
                <img src="https://developer.mozilla.org/static/img/favicon72.png" 
                alt="MDN logo" 
                srcSet="https://developer.mozilla.org/static/img/favicon144.png 2x, 
                    https://developer.mozilla.org/static/img/favicon216.png 3x" />
                <img src="https://developer.mozilla.org/files/16864/clock-demo-200px.png" 
                    alt="Clock" 
                    srcSet="https://developer.mozilla.org/files/16864/clock-demo-200px.png 200w,
                    https://developer.mozilla.org/files/16797/clock-demo-400px.png 400w"
                    sizes="(max-width: 600px) 200px, 50vw" />
            </div>
            <p>固定比例增大缩小的图片： 第一种写法</p>
            <div className={`${prefixCls}-auto`}>
                {/*<p>img标签的intrinsicsize属性：</p> */}
                <img src="https://gw.alipayobjects.com/zos/rmsportal/UQZeVGqLueWZnNRBUENI.png"/>
            </div>
            <p>固定比例增大缩小的图片： 第一种写法</p>
            <div className={`${prefixCls}-auto2`}>
                {/*<p>img标签的intrinsicsize属性：</p> */}
                <img src="https://gw.alipayobjects.com/zos/rmsportal/UQZeVGqLueWZnNRBUENI.png" intrinsicsize="16x9" />
            </div>
            <p>图片懒加载: 第一种方法</p>
            <div className={`${prefixCls}-lazy1`} ref={lazy1Ref}>
                {
                    [1,2,3,4,5,6,7,1,1,1,1,11,1,1,1,1,1,1].map(() => {
                        return <img data-src={Logo} src={Default} className={`${prefixCls}-lazy1-img`}/>
                    })
                }
            </div>
            <p>图片懒加载：第二种方法</p>
            <div className={`${prefixCls}-lazy1`} ref={lazy2Ref}>
                {
                    [1,2,3,4,5,6,7,1,1,1,1,11,1,1,1,1,1,1].map(() => {
                        return <img data-src={Logo} src={Default} className={`${prefixCls}-lazy2-img`}/>
                    })
                }
            </div>
            <div>
                img标签属性记录
                <ul>
                    <li>referrerPolicy属性：
                        <ul>
                            <li>no-referrer: referer 头部不会被发送</li>
                            <li>no-referrer-when-downgrade: 这个是浏览器的默认行为，就是从https网址链接到http，不发送，其他情况发送</li>
                            <li>origin: 字段一律只发送源信息， 协议+域名+端口</li>
                            <li>origin-when-cross-origin: 同源时，发送完整的Referer字段，跨域是发送源信息</li>
                            <li>unsafe-url： 字段包含源信息，路径和查询字符串， 不包含锚点，用户名和密码</li>
                        </ul>
                    </li>
                    <li> decoding属性：
                        <ul>
                            <li>sync: 同步解析图像</li>
                            <li>async: 异步解析图像，减少其他内容的显示延迟</li>
                            <li>auto: </li>
                        </ul>
                    </li>
                    <li> crossorigin属性：这个属性的作用就是为了解决图片跨域问题，如果这个图片的域名不是当前域名，那么就涉及到跨域问题，
                        但是当使用canvas读取这个图片时，就会报错，但是如果在img标签上设置crossorigin，canvas就不会读取错误
                        <ul>
                            <li>anonymous: 如果使用这个值的话就会在请求中的header中的带上Origin属性，但请求不会带上cookie和其他的一些认证信息。</li>
                            <li>use-credentials: 这个就同时会在跨域请求中带上cookie和其他的一些认证信息。
                            在使用这两个值时都需要server端在response的header中带上Access-Control-Allow-Credentials属性。</li>
                            <li>参考链接：<a href="http://ilucas.me/2017/04/19/crossorign-attribute-img-tag/">参考链接</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>       
    )
}