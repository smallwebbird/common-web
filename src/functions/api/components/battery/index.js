import React, { useEffect } from 'react';


export default function Battery () {
    useEffect(() => {
        navigator.getBattery().then(function(battery) {
            // 我用谷歌浏览器是支持的
            console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
            console.log("Battery level: " + battery.level * 100 + "%");
            console.log("Battery charging time: " + battery.chargingTime + " seconds");
            console.log("Battery discharging time: " + battery.dischargingTime + " seconds");
          
            battery.addEventListener('chargingchange', function() {
              console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
            });
          
            battery.addEventListener('levelchange', function() {
              console.log("Battery level: " + battery.level * 100 + "%");
            });
          
            battery.addEventListener('chargingtimechange', function() {
              console.log("Battery charging time: " + battery.chargingTime + " seconds");
            });
          
            battery.addEventListener('dischargingtimechange', function() {
              console.log("Battery discharging time: " + battery.dischargingTime + " seconds");
            });
          
          });
          
    }, [])
    return (
        <div>电池api</div>
    )
}