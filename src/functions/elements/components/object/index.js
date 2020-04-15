import React from 'react';

export default function ObjectElement() {
    return (
        <div>
            {/*已经支持嵌入视频*/}
            {/*doc不支持*/}
            <object width="200" height="200" type="application/msword" data="http://localhost:3000/test.doc"></object>
            <object width="500" height="500" type="application/pdf" data="http://localhost:3000/testPdf.pdf"></object>
            {/*docx不支持*/}
            <object width="500" height="500" type="	application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" data="http://localhost:3000/testDocx.docx"></object>
        </div>
    )
}