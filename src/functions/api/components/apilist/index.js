import React from 'react';
import { Switch, Link } from 'react-router-dom';

export default function ApiList () {
    return (
        <ul>
            <Link to="/api/filesystem">文件系统</Link>
            <Link to="/api/battery">电池</Link>
            <Link to="/api/history">路由</Link>
            <Link to="/api/indexDb">IndexDb数据库</Link>
            <Link to="/api/cookie">设置cookie</Link>
        </ul>
    )
}