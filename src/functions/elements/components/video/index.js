import React, { useRef, useEffect, useReducer } from 'react';
import movie from './video.mp4';
import Poster from './pic.jpeg';

// 自定义一个处理事件的reducer,其实不涉及改变状态，就是单纯的使用useReducer
function eventReducer (action, event) {
    switch (action.type) {
        case 'canPlay': {
            // 这个事件会经常触发，暂停在重新播放也会触发这个事件
            console.log('视频可以播放', event)
            break
        }
        case 'ended': {
            console.log('视频播放结束')
            break
        }
        case 'loadStart': {
            console.log('视频数据开始加载')
            break
        }
        case 'play': {
            console.log('暂停播放，恢复时触发')
            break
        }
        case 'seeking': {
            console.log('在跳跃开始时触发')
            break
        }
        case 'seeked': {
            console.log('在跳跃操作完成时触发')
            break
        }
        case 'progress': {
            console.log('已经下载了', event.currentTarget.buffered)
            break
        }
        case 'timeUpdate': {
            console.log('播放的时间是', event.currentTarget.currentTime)
            break
        }
        case 'pause': {
            console.log('视频暂停')
            break
        }
        case 'volumechange': {
            console.log('音量变化')
        }
    }
}

function Video () {
    const videoRef = useRef(null)
    useEffect(() => {
        console.log('视频时长', videoRef)
        console.log(videoRef.current)
    })
    
    return (
        <div>
            <video controls width="500" height="500" autoPlay muted ref={videoRef} poster={Poster}
                onCanPlay={(e) => {eventReducer({type: 'canPlay'}, e)}}
                onEnded={(e) => {eventReducer({type: 'ended'}, e)}}
                onLoadStart={(e) => {eventReducer({type: 'loadStart'}, e)}}
                onPlay={(e) => {eventReducer({type: 'play'}, e)}}
                onSeeked={(e) => {eventReducer({type: 'seeked'}, e)}}
                onSeeking={(e) => {eventReducer({type: 'seeking'}, e)}}
                onProgress={(e) => {eventReducer({type: 'progress'}, e)}}
                onTimeUpdate={(e) => {eventReducer({type: 'timeUpdate'}, e)}}
                onPause={(e) => {eventReducer({type: 'pause'}, e)}}
                onVolumeChange={(e) => {eventReducer({type: 'volumechange'}, e)}}
            >
                <source src={movie} type="video/mp4"/>
                浏览器不支持
            </video>
            {/* 好像现在浏览器都不支持这个标签 */}
            <embed type="video/quicktime" src={movie} width="640" height="480" />
            {/* object 也可以引用外部资源， 嵌入对象元素 */}
            <object type="video/mp4"
                data={movie}
                width="640" 
                height="480">
            </object>
        </div>
    )
}
export default Video


// audio标签和video标签都差不多，基本内容