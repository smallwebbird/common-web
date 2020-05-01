import React, { useEffect } from 'react';

export default function FileSys () {
    useEffect(() => {
        let reFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        reFileSystem(window.TEMPORARY, 5*1024*1024, function success(fs) {
            fs.root.getFile('log.txt', {create: true}, function(fileEntry) {
                // Create a FileWriter object for our FileEntry (log.txt).
                fileEntry.createWriter(function(fileWriter) {
                    console.log(111)
                  fileWriter.onwriteend = function(e) {
                    console.log('Write completed.');
                  };
            
                  fileWriter.onerror = function(e) {
                    console.log('Write failed: ' + e.toString());
                  };
            
                  // Create a new Blob and write it to log.txt.
                  let b = new Blob(["hello", "world"], {type: "text/plain"})
                  fileWriter.write(b);
              }, function error() {} );
              fileEntry.file(function(file) {
                var reader = new FileReader();
         
                reader.onloadend = function(e) {
                  var txtArea = document.createElement('textarea');
                  txtArea.value = this.result;
                  document.body.appendChild(txtArea);
                };
         
                reader.readAsText(file);
             }, function error (){});
            })
        }, function error(e) {
            var msg = '';
            let FileError = window.FileError;
            switch (e.code) {
                case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                break;
                case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
                break;
                case FileError.SECURITY_ERR:
                msg = 'SECURITY_ERR';
                break;
                case FileError.INVALID_MODIFICATION_ERR:
                msg = 'INVALID_MODIFICATION_ERR';
                break;
                case FileError.INVALID_STATE_ERR:
                msg = 'INVALID_STATE_ERR';
                break;
                default:
                msg = 'Unknown Error';
                break;
            };
            console.log(msg)
        })
    }, [])
    return (
        <div>
            FileSystem 这个api兼容性太差了，，如果想了解可以参考以下俩个链接<br />
            <a href="https://blog.csdn.net/salonzhou/article/details/28275713">参考链接</a>
            <a href="https://www.html5rocks.com/zh/tutorials/file/filesystem/">参考链接</a>
        </div>
    )
}