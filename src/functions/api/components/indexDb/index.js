import React, { useCallback, useState, useEffect, useRef } from 'react';

export default function IndexDb () {
    const [ db, setDb ] = useState(null);
    const [ users, setUsers ] = useState([]);
    const inputRef = useRef();
    useEffect(() => {
        initIndexDB('db')
            .then((res) => {
                setDb(res);
                listUsers(res);
            })
            .catch((err) => {
                alert(err);
            })
    }, [])
    const listUsers = useCallback((db) => {
        // 使用游标获取数据库中的user表中的数据
        let listTransaction = db.transaction(['users'], 'readwrite');
        let objectStore = listTransaction.objectStore('users');
        let arr = [];
        objectStore.openCursor().onsuccess = function (e) {
            let cursor = e.target.result;
            if (cursor) {
                console.log(cursor)
                arr.push(cursor.value);
                cursor.continue();
            } else {
                setUsers(arr);
                console.log('没有数据')
            }
        }
    }, [users])
    const onerror = useCallback(() => {

    }, [])
    const onsuccess = useCallback(() => {

    }, [])
    const insertData = useCallback(() => {
        // 创建一个事物
        let addTransaction = db.transaction(["users"], "readwrite");
        addTransaction.onerror = onerror;
        addTransaction.onsuccess = onsuccess;
        let objectStore = addTransaction.objectStore('users');
        let request = objectStore.add({id: Math.floor(Math.random(1)*100), name: 'lzh', sex: 'boy'});
        request.onerror = onerror;
        request.onsuccess = function () {
            console.log('插入成功')
            listUsers(db);
        };
    })
    const deleteData = useCallback((id) => {
        let request = db.transaction(['users'], 'readwrite').objectStore('users').delete(id);
        request.onerror = onerror;
        request.onsuccess = function () {
            console.log('删除成功');
            listUsers(db);
        }
    })
    const searchResult = useCallback(() => {
        let keyword = inputRef.current.value;
        let objectStore = db.transaction(['users'], 'readwrite').objectStore('users');
        let singleKeyRange = IDBKeyRange.only(keyword);
        let index = objectStore.index('name');
        index.openCursor(singleKeyRange).onsuccess = function (e) {
            let cursor = e.target.result;
            if (cursor) {
                console.log(cursor.value);
            }
        }
    })
    const editData = useCallback((u) => {
        let name = window.prompt('请输入更新后的名字', u.name);
        if (name !== null && name !== '') {
            let objectStore = db.transaction(['users'], 'readwrite').objectStore('users');
            let request = objectStore.get(u.id);
            request.onerror = onerror;
            request.onsuccess = function (e) {
                let data = e.target.result;
                data.name = name;
                let requestUpdate = objectStore.put(data);
                requestUpdate.onerror = onerror;
                requestUpdate.onsuccess = function () {
                    console.log('更新成功');
                    listUsers(db);
                }
            }
        }
    })
    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-eventy'}}>
                <div onClick={insertData}>插入数据</div>
                <div></div>
                <div></div>
            </div>
            <div>
                <p>数据库中的数据</p>
                <ul>
                    {
                        users.map((u) => {
                            return <li key={u.id || '1'}>
                                {`id: ${u.id} 姓名：${u.name}, 性别: ${u.sex}`} 
                            <button onClick={deleteData.bind(null, u.id)}>删除</button>
                            <button onClick={editData.bind(null, u)}>编辑</button>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div>
                <div>
                    <input placeholder="请输入要搜索的名字" ref={inputRef}/>
                    <button onClick={searchResult}>搜索</button>
                </div>
            </div>
        </div>
    )
}

function initIndexDB (dbName) {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            return '当前浏览器不支持indexedDB数据库,请升级浏览器之后再尝试';
        }
        if (typeof dbName !== 'string') {
            return '数据库的名字必须是字符串';
        }
        let exist = true; // 数据库存在
        let request = window.indexedDB.open(dbName);
        request.onerror = function () {
            reject('新建数据库失败')
        }
        request.onsuccess = function (e) {
            // 如果数据库存在
            resolve(e.target.result)
            console.log('创建数据库成功');
        }
        request.onupgradeneeded = function (event) {
            exist = false;
            let db = event.target.result;
            // 创建一个对象索引
            let objectStore = db.createObjectStore('users', { keyPath: 'id' });
            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("sex", "sex", { unique: false });
            // 使用事物的 oncomplete 事物确保插入数据前对象仓库已经创建完毕
            objectStore.transaction.oncomplete = function (event) { 
                resolve(db);
            }
        }
    });
}
// 向indexDb中插入数据
function doIndexDb (objectStore, data = [], method, db) {
    console.log(222);
    objectStore.transaction.oncomplete = function (event) {
        let transaction = db.transaction('users', "readwrite");
        objectStore = transaction.objectStore('users');
        transaction.oncomplete = function (event) {
            // 在所有数据添加完毕后的处理
            console.log('成功');
        }
        transaction.onerror = function (event) {
            // 不要忘记错误处理
            console.log('失败')
        }
        switch (method) {
            case 'add':
                console.log(111)
                insertToIndexDb(objectStore, data)
                break;
        
            default:
                break;
        }
    }
}
function insertToIndexDb (objectStore, data = []) {
    if (!Array.isArray(data)) {
        console.log('请传递数据');
        return;
    }
    data.forEach(t => {
        let request = objectStore.add(t);
        request.onsuccess = function () {}
    });
}
function deleteFromDb (objectStore, key = '') {
    if (typeof(key) !== 'string') {
        console.log('请传递字符串key,暂不支持其他');
        return;
    }
    let request = objectStore.delete(key);
    request.onsuccess = function () {}
    request.onerror = function () {}
}
function getFromDb (objectStore, key) {
    if (typeof(key) !== 'string') {
        console.log('请传递字符串key,暂不支持其他');
        return;
    }
    let request = objectStore.get(key);
    request.onsuccess = function () {}
    request.onerror = function () {}
    return request;
}
// 更新indexedDb中的值
function updateDb (objectStore, key) {
    let request = getFromDb(objectStore, key);
    request.onsuccess = function (event) {
        let data = event.target.result;
        data.name = 'update' + data.name;
        let requestUpdate = objectStore.put(data);
        requestUpdate.onsuccess = function () {}
        requestUpdate.onerror = function () {}
    }
}
// 使用游标获取所有值
function cursorIndexDb(objectStore) {
    objectStore.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;
        if (cursor) {
            console.log(`--${cursor.key}--${cursor.value.name}`);
            cursor.continue();
        } else {
            console.log('遍历完成');
        }
    }
}
// 使用游标来查找值
function getValueByCursor (objectStore, key, indexValue) {
    let index = objectStore.index(indexValue);
    index.get(key).onsuccess = function (event) {

    }
}
// index.openCursor().onsuccess = function(event) {
//     var cursor = event.target.result;
//     if (cursor) {
//       // cursor.key 是一个 name, 就像 "Bill", 然后 cursor.value 是整个对象。
//       alert("Name: " + cursor.key + ", SSN: " + cursor.value.ssn + ", email: " + cursor.value.email);
//       cursor.continue();
//     }
//   };
  
//   index.openKeyCursor().onsuccess = function(event) {
//     var cursor = event.target.result;
//     if (cursor) {
//       // cursor.key 是一个 name, 就像 "Bill", 然后 cursor.value 是那个 SSN。
//       // 没有办法可以得到存储对象的其余部分。
//       alert("Name: " + cursor.key + ", SSN: " + cursor.value);
//       cursor.continue();
//     }
//   };
// 为游标指定范围
// 仅匹配 "Donna"
// var singleKeyRange = IDBKeyRange.only("Donna");

// // 匹配所有超过“Bill”的，包括“Bill”
// var lowerBoundKeyRange = IDBKeyRange.lowerBound("Bill");

// // 匹配所有超过“Bill”的，但不包括“Bill”
// var lowerBoundOpenKeyRange = IDBKeyRange.lowerBound("Bill", true);

// // 匹配所有不超过“Donna”的，但不包括“Donna”
// var upperBoundOpenKeyRange = IDBKeyRange.upperBound("Donna", true);

// // 匹配所有在“Bill”和“Donna”之间的，但不包括“Donna”
// var boundKeyRange = IDBKeyRange.bound("Bill", "Donna", false, true);

// // 使用其中的一个键范围，把它作为 openCursor()/openKeyCursor 的第一个参数
// index.openCursor(boundKeyRange).onsuccess = function(event) {
//   var cursor = event.target.result;
//   if (cursor) {
//     // 当匹配时进行一些操作
//     cursor.continue();
//   }
// };
// 切换遍历方向
// objectStore.openCursor(boundKeyRange, "prev").onsuccess = function(event) {
//     var cursor = event.target.result;
//     if (cursor) {
//       // 进行一些操作
//       cursor.continue();
//     }
//   };
// 切换遍历方向，但是不筛选结果
// objectStore.openCursor(null, "prev").onsuccess = function(event) {
//     var cursor = event.target.result;
//     if (cursor) {
//       // Do something with the entries.
//       cursor.continue();
//     }
//   };