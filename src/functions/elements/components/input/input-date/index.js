import React, { useState } from 'react';
import './index.less';

const prefixCls = 'input'
const WEEKTABLE = [{
    cn: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    cns: ['日', '一', '二', '三', '四', '五', '六'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
},{
    cn: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    cns: ['一', '二', '三', '四', '五', '六', '日'],
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
}]

export default function InputColor () {
    // 获取一个月的天数
    const calendar = useGetMonthDays(2020, 1, 2, 0)
    return (
        <div className={`${prefixCls}-date`}>
            <div>input Date</div>
            <input type='date' />
            <div>自定义日历</div>
            <div className={`${prefixCls}-calendar`}>
                <div className={`${prefixCls}-calendar-week`}>
                    {
                        WEEKTABLE[0].cn.map((item, index) => (
                            <div key={index} className={`${prefixCls}-week-item`}>{item}</div>
                        ))
                    }
                </div>
                <div className={`${prefixCls}-calendar-days`}>
                {
                    calendar.map((item, index) => (
                        <div key={index} className={`${prefixCls}-days-item 
                            ${item.isThisMonth ? `${prefixCls}-days-item-thisMonth` : ''} ${item.selected ? `${prefixCls}-days-item-selected` : ''}`}>{item.currentDay}</div>
                    ))
                }
            </div>
            </div>
        </div>
    )
}

// 获取当月的天数
function useMonthDays (year, month) {
    return new Date(year, month, 0).getDate()
}
// 获取当前日是星期几
function useGetWeek (year, month, day) {
    return new Date(year, month -1, day).getDay()
}
function useGetMonthDays(year, month, day, type) {
    let dayArray = [];
    let currentMonthDays = useMonthDays(year, month);
    let preMonthDays = useMonthDays(year, month - 1);
    let firstDayInWeek = useGetWeek(year, month, 1)
    let lastDayInWeek = useGetWeek(year, month, currentMonthDays);
    console.log(preMonthDays, firstDayInWeek, lastDayInWeek) //31 3 5
    for (let i = 0; i < firstDayInWeek; i++) {
        dayArray.push({
            currentDay: preMonthDays - firstDayInWeek + i + 1,
            week: WEEKTABLE[type].cn[i]
        })
    }
    for (let i = 1; i <= currentMonthDays; i++) {
        let weekFlag = (firstDayInWeek + i - 1) % 7
        dayArray.push({
            currentDay: i,
            week: WEEKTABLE[type].cn[weekFlag],
            selected: i === day,
            isThisMonth: true
        })
    }
    for (let i = 1; i <= (6 - lastDayInWeek); i++) {
        let weekFlag = (firstDayInWeek + currentMonthDays +i - 1) % 7
        dayArray.push({
            currentDay: i,
            week: WEEKTABLE[type].cn[weekFlag]
        })
    }
    return dayArray;
}