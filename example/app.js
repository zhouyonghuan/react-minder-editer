import React from "react";
import { render } from "react-dom";
import KityMinder from "../src/react-Xminder-editer/KityMinder"; // 引入组件
const dataJson = { 
  'data': { 
    'id': 2,
    'text': '中心主题',
  },
}
const Example = () => (
  <KityMinder
    uploadUrl="/api/file/uploadAttachment"
    wsUrl={`ws://xwcase.gz.cvte.cn/api/case/2244/undefined/0/zsx`}
    onResultChange={() => {
      console.log("o1nResultChange callback");
    }}
    editorStyle={{ height: "calc(100vh - 100px)" }}
    readOnly={false}
    editorRef={(editorNode) => {
      console.log(editorNode);
    }}
    onSave={() => {
      console.log("sss");
    }}
    type="record"
  />
);
render(<Example />, document.getElementById("root"));
