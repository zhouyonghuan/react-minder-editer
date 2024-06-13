import xmind from '../parse/xmind'
import {
  imgToDataUrl,
  downloadFile,
  readBlob,
  removeHTMLEntities,
  resizeImgSize,
  handleSelfCloseTags
} from '../utils/index'

//  导出XMind插件，需要通过Export插件使用
class ExportXMind {
  //  构造函数
  constructor(opt) {
    // this.mindMap = opt.mindMap
  }
  // 导出xmind
  async xmind(data, name='思维导图',type='xmind') {
    console.log('test')
    const blob = await xmind.transformToXmind(data)
    const zipData = await readBlob(blob)
    downloadFile(zipData, name + '.' + type)
    return zipData
  }

  // 获取解析器
  getXmind() {
    return xmind
  }
}

ExportXMind.instanceName = 'doExportXMind'

export default new ExportXMind()
