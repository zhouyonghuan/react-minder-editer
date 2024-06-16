import React, { Component } from 'react'
import KityMinder from "./react-Xminder-editer/KityMinder"; // 引入组件
export default class App extends Component {
  render() {
    return (
      <div>
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
    /></div>
    )
  }
}
