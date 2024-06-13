import JSZip from 'jszip'
import { getTextFromHtml,createUid } from '../utils/index'
import {

  handleNodeImageToXmind,
  getXmindContentXmlData,
  parseNodeGeneralizationToXmind
} from '../utils/xmind'

// 数据转换为xmind文件
// 直接转换为最新版本的xmind文件 2023.09.11172
const transformToXmind = async (data, name='光宇脑图') => {
  console.log('====================================');
  console.log(`转换前contentData`,data);
  window.data= data
  console.log('====================================');
  const id = 'simpleMindMap_' + Date.now()
  const imageList = []
  // 转换核心数据
  let newTree = {}
  // 保存处理图片的信息
  let waitLoadImageList = []
  // 递归处理树节点
  let walk = async (node, newNode, isRoot) => {
    let newData = {
      id: createUid(),
      structureClass: 'org.xmind.ui.logic.right',
      title: node.data.text, // 节点文本
      children: {
        attached: []
      }
    }
    // // 备注
    // if (node.data.note !== undefined) {
    //   newData.notes = {
    //     realHTML: {
    //       content: node.data.note
    //     },
    //     plain: {
    //       content: node.data.note
    //     }
    //   }
    // }
    // // 超链接
    // if (node.data.hyperlink !== undefined) {
    //   newData.href = node.data.hyperlink
    // }
    // // 标签
    // if (node.data.tag !== undefined) {
    //   newData.labels = node.data.tag || []
    // }
    // 图片
    // handleNodeImageToXmind(node, newNode, waitLoadImageList, imageList)
    // 概要
      // const { summary, summaries } = parseNodeGeneralizationToXmind(node)
      // if (isRoot) {
      //   if (summaries.length > 0) {
      //      newNode.rootTopic.children.summary = summary
      //     newNode.rootTopic.summaries = summaries
      //   }
      // } else {
      //    if (summaries.length > 0) {
      //      newNode.children.summary = summary
      //      newNode.summaries = summaries
      //    }
      // }
    // 样式
    // 暂时不考虑样式
    if (isRoot) {
     console.log('====================================');
     console.log(node.children,'node');
     console.log('====================================');
      newData.class = 'topic'
      newNode.id = id
      newNode.class = 'sheet'
      newNode.title = name
      newNode.extensions = []
      newNode.topicPositioning = 'fixed'
      newNode.topicOverlapping = 'overlap'
      newNode.coreVersion = '2.100.0'
      newNode.rootTopic = newData
    } else {
      Object.keys(newData).forEach(key => {
        newNode[key] = newData[key]
      })
    }
    // 子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        let newChild = {}
        walk(child, newChild)
        newData.children.attached.push(newChild)
      })
    }
  }
  walk(data, newTree, true)
  await Promise.all(waitLoadImageList)
  const contentData = [newTree]
  console.log('====================================');
  console.log('转换后data',contentData);
  console.log('====================================');
  console.log(JSON.stringify(contentData,null,'\t'));
  console.log('====================================');
  console.log('====================================');
  // 创建压缩包
  const zip = new JSZip()
  zip.file('content.json', JSON.stringify(contentData))
  zip.file(
    'metadata.json',
    `{"modifier":"","dataStructureVersion":"2","creator":{"name":"mind-map"},"layoutEngineVersion":"3","activeSheetId":"${id}"}`
  )
  zip.file('content.xml', getXmindContentXmlData())
  const manifestData = {
    'file-entries': {
      'content.json': {},
      'metadata.json': {},
      'Thumbnails/thumbnail.png': {}
    }
  }
  // 图片
  if (imageList.length > 0) {
    imageList.forEach(item => {
      manifestData['file-entries']['resources/' + item.name] = {}
      const img = zip.folder('resources')
      img.file(item.name, item.data, { base64: true })
    })
  }
  zip.file('manifest.json', JSON.stringify(manifestData))
  const zipData = await zip.generateAsync({ type: 'blob' })
  return zipData
}

export default {
  transformToXmind
}
