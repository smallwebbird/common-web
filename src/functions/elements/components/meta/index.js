import React from 'react';

export default function Meta () {
    return (
        <div>
            meta标签的使用  
            <ul>
                <li>
                    http-equiv
                    <ul>
                        <li>content-security-policy: 这个属性也就是我们常说的csp，这个和web安全有关，通过这个属性，我可以告诉客户端哪些资源可以加载执行，
                        相当于给web设置了白名单，开发人员只需要提供配置的东西，具体的实现和执行由浏览器控制, 有俩种方法可以启用CSP，第一种是通过HTTP头部信息，
                        第二种是通过meta标签 <br />例如以下的meta标签 
                        {/*<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:"></meta> */}
                        script-src: 只运行当前域名下的脚本
                        object-src: 不信任任何URL
                        style-src: 只信任 cdn.example.org, third-party.org
                        child-src: frame 必须使用Https协议加速
                        其他资源：没有限制
                        启用后， 不符合CSP的外部资源被组织加载， 还有其他控制项
                        script-src: 外部脚本
                        style-src: 样式脚本
                        img-src: 图像
                        media-src: 媒体文件
                        font-src: 字体文件
                        object-src: 插件 objec 标签
                        child-src: iframe框架
                        frame-ancestors: iframe， embed标签， frame标签
                        connect-src: Http连接， websocket
                        worker-src: worker脚本
                        manifest-src: manifest 文件
                        default-src 用来设置以上选项的默认值
                        block-all-mixed-content：https 网页不得加载http资源
                        upgrade-insecure-request 自动将网页上的所有加载外部资源的http连接换成https 的协议
                        sandbox 浏览器行为控制
                        也可以在发生xss时通过report-uri来告诉浏览器，将xss攻击行为发送到一个网址
                        {/*Content-Security-Policy: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;*/}
                        以上指定的那些src可以有一下的限制值
                        主机名： www.baidu.com
                        路径名：www.baidu.com/path
                        通配符： *.a.com
                        协议名： https, data
                        关键字：self 当前域名
                                none 进制加载任何外部资源
                        如果要指定多个值，用空格隔开
                        script-src 的特殊值
                        unsafe-inline: 允许页面内嵌&ltscript&gt 标签， 一般不要设置这个属性因为会发生xss注入
                        {/*<img src="x" onerror="evil()"><script src="data:text/javascript,evil()"></script>*/}
                        nonce值： 每次http回应给出一个授权的token，页面内嵌脚本必须有这个token，才会执行
                        hash值： 同nonce值
                        Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'
                        {/*<script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
                            // some code
                        </script> */}
                        </li>
                        <li>
                            refresh属性
                            <ul>
                                <li>content包含一个正整数，重新载入页面的时间</li>
                                <li>content 后面跟随一个正整数并且跟着一个字符串‘;url=’和一个url，那么是重定向到指定连接的时间</li>
                            </ul>
                        </li>
                        <li>
                            Progma属性
                            <ul>
                                <li>属性值：no-cache  禁止浏览器读取本地的缓存文件，必须向源服务器发送请求</li>
                                <li>属性值：public 浏览器和缓存服务器都可以缓存页面信息</li>
                                <li>属性值: no-store </li>
                                <li>属性值：must-revalidate 客户端的每次请求，代理服务器都必须向源服务器去人缓存是否过期</li>
                                只有ie浏览器能识别这个meta，其他浏览器仅能识别cache-control，这个属性时http1.0的属性，为了兼容，最好和cache-control一起使用
                            </ul>
                        </li>
                        <li>
                            cache-control 属性
                            <li>属性值 cache-control 先发送请求，与服务器判断资源是否改变，如果没有改变使用缓存</li>
                            <li>属性值 no-store 禁止缓存，每次都从源服务器上重新获取资源</li>
                            <li>属性值 no-siteapp 禁止百度，神马，搜狗等搜索引擎对网页进行转码</li>
                            <li>属性值 no-transform 不得对网页的资源进行转变或转换，以便节省网络传输的流量</li>
                            <li>属性值 only-if-cached 如果缓存存在，只使用缓存，不需要向服务器请求资源</li>
                            <li>属性值 private 只能被单个用户缓存，也就是浏览器，不能被中间的代理服务器缓存</li>
                            <li>属性值 public 可以被任何客户端缓存，浏览器，代理服务器，但是不能设置缓存时间</li>
                            <li>属性值 max-age 资源可以被任意客户端缓存，但是可以设置缓存时间，在缓存时间内，不需要在向服务器上请求资源</li>
                        </li>
                        <li>
                            Expires 属性, 用于设定网页的到期时间，使用content=0实时的向源服务器请求页面
                            <li></li>
                        </li>
                        <li>
                            X-UA-Compatible
                            对于IE浏览器，如果安装Google Chrome Frame 插件，使用这个属性插件强制为Chromium 内核，否则强制使用本机支持的最高版本的IE内核
                            content="IE=Edge, chrome=1"
                        </li>
                    </ul>   
                </li>
                <li>
                    name属性：
                    <ul>
                        <li>theme-color: 就是可以配置谷歌浏览器头部，或者地址栏的颜色</li>
                        <li>referer 控制所有从该文档发出的http请求的http referer</li>
                        content属性可取的值是
                        <li>description 网站的描述</li>
                        <li>keyword 关键字 </li>
                        <li>robots 这个是写给搜索引擎看的
                            <ul>
                                <li>index: 当前页面可以抓取</li>
                                <li>follow: 当前页面内所链接的页面可以抓取</li>
                                <li>noindex: 当前页面不可以被抓取</li>
                                <li>nofollow: 当前页面内所链接的页面不可抓取</li>
                            </ul>
                        </li>
                        <li>
                            <ul>
                                color-scheme mac 支持俩种主题颜色，一种是暗黑，一种是明亮，可以通过这个属性判断，本地测试只有在safari下有效
                                <li>dark 暗黑</li>
                                <li>light 明亮</li>
                            </ul>
                        </li>
                        <li>
                            renderer 属性, 作用于360浏览器，qq浏览器等国产双核浏览器
                            <ul>
                                <li>属性值 webkit  使用webkit内核</li>
                                <li>属性值 ie-comp 使用ie兼容内核</li>
                                <li>属性值 ie-stand 使用ie标准内核</li>
                            </ul>
                        </li>
                        <li>
                            force-rendering 属性，作用于其他双核浏览器
                            属性和renderer一样
                        </li>
                    </ul>
                </li>
                <li>
                    viewport属性
                    <ul>
                        <li>width 一个正整数，或者字符串device-width</li>
                        <li>height 一个正整数， 或者字符串device-height</li>
                        <li>initial-scale 定义设备宽度与视口大小之间的缩放比例</li>
                        <li>maximun-scale 缩放的最大值</li>
                        <li>minimum-scale 缩放的最小值</li>
                        <li>user-scalable  用户是否能放大或者缩小网页</li>
                    </ul>
                </li>
                <li>
                    各浏览器平台
                    <ul>
                        谷歌浏览器
                        <li>http-equiv="X-UA-Compatible" content="chrome=1" 优先使用最新的谷歌版本</li>
                        <li>name="google" value="notranslate" 禁止自动翻译</li>
                        <li>name="google-site-verification" content=""内容是google网站的认证代码，也就是证明这个网站的所有者是你</li>
                        <li>name="baidu-site-verification" 这个和上面一样，只不过是百度的</li>
                        <li>name="360-site-verification" 360</li>
                        <li>name="sogou_site_verification" 搜狗</li>
                    </ul>
                    <ul>
                        Apple IOS 浏览器
                        <ul>
                        属性format-dection 
                            <li>
                            属性值：telephone=no 禁止iphone把数字转为拨号
                            </li>
                            <li>
                                属性值：email=no 让iphone不识别邮箱
                            </li>
                            <li>
                                address=noe 禁止跳转至地图
                            </li>
                        </ul>
                        <ul>
                            <li>name="apple-mobile-web-app-capable" content="yes", ios现在添加到主页签默认就是全屏模式</li>
                            <li>name="apple-mobile-web-app-status-bar-style" 这个是用来定义ios将网址添加为主页签时如果开启全屏模式，那么可以用这个
                                字段来定义导航栏颜色，默认是content="default" 白色导航栏黑色文字  content="black" 黑色背景白色文字 
                                content="black-translcuent" 白色透明导航栏，白色文字
                            </li>
                        </ul>
                        <li>apple-touch-icon-precomposed 禁止系统自动添加效果， 直接显示设计原图</li>
                        <li>apple-itunes-app 这个属性时用来告诉safari浏览器这个网站对应的app</li>
                    </ul>
                </li>
                <li>
                    property="og:image" property="og:title" property="og:type" 这个meta标签的属性，有利于网站在sns平台上的传播
                    具体可以看<a href="https://juejin.im/post/5c497d20f265da613572e69d">参考链接</a>
                </li>
            </ul>
        </div>
    )
}