<template>
  <div class="viewProcessDialog">
    <div class="toolbar">
      <div class="handletool right">
        <button type="button" class="btn" @click="handletool('zoomOut')">放大</button>
        <button type="button" class="btn" @click="handletool('zoomIn')">缩小</button>
        <button type="button" class="btn" @click="handletool('centerAndZoom')">居中显示</button>
        <el-checkbox class="wheelZoom" v-model="wheelZoom" @change="handletool('wheelZoom')">鼠标缩放</el-checkbox>
      </div>
    </div>
    <div class="canvas-content-wrap">
      <div id="canvas-content">
        <canvas v-if="va" id="canvas">sorry,你的浏览器版本过期，无法展示流程信息，推荐使用最新版谷歌、火狐、360浏览器！</canvas>
      </div>
      <div
        :class="['workflow-info animated', isLeaf ? 'fadeInRight' :'fadeInLeft']"
        :style="{'right':isLeaf? '0px': '-560px' }"
      >
        <div class="title">
          <i
            :class="[isLeaf ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']"
            :title="[isLeaf ? '收起' :'展开']"
            @click="isLeaf=!isLeaf"
          ></i>
          <span class="name">节点审批人信息</span>
        </div>
        <ul class="content" v-if="isLeaf">
          <li class="tr titles">
            <div class="names">节点名称</div>
            <div class="nodeInfo">节点审批人</div>
          </li>
          <el-scrollbar class="height" style="height:calc(100% - 40px)">
            <li class="tr" v-for="item in nodeApprovers" :key="item.key">
              <div class="names" :title="item.key">{{item.key}}</div>
              <div class="nodeInfo" :title="item.value.join(',')">{{item.value.join(',')}}</div>
            </li>
          </el-scrollbar>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import '@/static/jtopo-0.4.8-min.js'
let stage, scene
export default {
  props: {
    configId: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      isLeaf: true,
      va: false,
      wheelZoom: false,
      // 返回节点信息
      nodeData: [],
      // 返回节点连线
      nodeLine: [],
      nodes: [],
      // 审批人信息
      nodeApprovers: []
    }
  },
  created () {
    if (this.configId != '0') {
      this.va = true
      this.getNode().then(async (res) => {
        await this.initCanvas()
        if (stage !== undefined) {
          this.handletool('centerAndZoom')
        }
      })
    }
  },

  methods: {
    /*
     *jtopo   cavans画图
     */
    // 右边stage按钮工具
    handletool (type) {
      switch (type) {
        case 'zoomOut':
          stage.centerAndZoom()
          stage.zoomOut()
          break
        case 'zoomIn':
          stage.zoomIn()
          break
        case 'centerAndZoom':
          stage.centerAndZoom()
          break
        case 'wheelZoom':
          this.wheelZoom ? (stage.wheelZoom = 0.85) : (stage.wheelZoom = null)
          break
        default:
          null
      }
      // console.log(stage);
    },
    // 获取节点
    getNode () {
      let _this = this
      return new Promise((resolve, reject) => {
        sendAjaxRequest({
          url: 'workflow/rest/provider/base/getWorkflowNodeResponseByConfigId',
          type: 'post',
          data: {
            configId: _this.configId
          },
          success: (msg) => {
            if (msg.code == 200) {
              _this.nodeData = []
              _this.nodeApprovers = []
              _this.nodeLine = msg.data.nodeRelations
              _this.nodeData = msg.data.nodes
              // Object.assign(_this.nodeApprovers,msg.data.nodeApprovers);
              // _this.nodeApprovers = (msg.data.nodeApprovers || [])
              _this.nodeApprovers = (msg.data.nodeApprovers || []).map(
                (item) => {
                  let key = Object.keys(item)[0]
                  return {
                    key,
                    value: item[key]
                  }
                }
              )
              console.log('打印', _this.nodeApprovers)
              resolve(msg.data)
            } else {
              _this.$message.error('节点获取失败')
              reject()
            }
          },
          error: (XMLHttpRequest, textStatus, errorThrown) => {
            _this.$message.error('节点获取失败')
            reject()
          }
        })
      })
    },
    // 节点信息
    AddNode (x, y, str, nodeId, nodeTypeId) {
      let _this = this
      // let node = new JTopo.Node(str)
      let node = new JTopo.Node()
      node.text = str
      node.serializedProperties.push('id')
      node.serializedProperties.push('level')
      node.setLocation(x, y)
      node.fontColor = '0,0,0'
      node.nodeId = nodeId
      node.id = nodeId
      node.nodeTypeId = nodeTypeId
      node.textPosition = 'Bottom_Center'
      // node.textPosition = 'Center_Center'
      if (nodeTypeId == 1) {
        node.fillColor = '64,187,69'
      }
      if (nodeTypeId == 2) {
        node.fillColor = '220,20,60'
      }
      if (nodeTypeId == 4 || nodeTypeId == 5) {
        node.fillColor = '95,158,160'
      }
      node.setSize(60, 40)
      scene.add(node)
      return node
    },
    // 循环连线
    forEachLink () {
      let _this = this
      if (_this.nodeLine.length <= 0) return
      _this.nodeLine.map((res) => {
        let nodeA
        let nodeZ
        let nodeAId = res.sourceNodeId
        let nodeZId = res.targetNodeId
        for (var i = 0; i < _this.nodes.length; i++) {
          if (nodeAId == _this.nodes[i].nodeId) {
            nodeA = _this.nodes[i]
            break
          }
        }
        for (var i = 0; i < _this.nodes.length; i++) {
          if (nodeZId == _this.nodes[i].nodeId) {
            nodeZ = _this.nodes[i]
            break
          }
        }
        _this.Addlink(nodeA, nodeZ, res.id)
      })
    },
    // 连线信息
    Addlink (nodeA, nodeZ, LineId) {
      let _this = this
      let link = new JTopo.Link(nodeA, nodeZ, '')
      link.lineWidth = 2 // 线宽
      link.bundleOffset = 60
      link.arrowsRadius = 12
      link.bundleGap = 20
      link.LineId = LineId
      link.textOffsetY = 3
      link.fontColor = '0,200,255'
      link.strokeColor = '0,200,255'
      scene.add(link)
    },
    initCanvas () {
      let _this = this
      let $width = $('#canvas-content').width()
      let $height = $('#canvas-content').height()
      let canvas = document.getElementById('canvas')
      canvas.width = $width
      canvas.height = $height
      scene = new JTopo.Scene()
      stage = new JTopo.Stage(canvas)
      scene.clear()
      stage.clear()

      // 加载节点
      const desArr = []
      _this.nodeData.map(function (a) {
        desArr.push({
          x: a.nodeXPosition,
          y: a.nodeYPosition,
          name: '描述信息'
        })
        let node = _this.AddNode(
          a.nodeXPosition,
          a.nodeYPosition,
          a.nodeName,
          a.nodeId,
          a.nodeTypeId
        )
        _this.nodes.push(node)
      })

      console.log('desArr', desArr)

      desArr.map((curr) => {
        let node = new JTopo.Node()
        node.text = curr.name
        node.setLocation(curr.x + 30, curr.y + 60)
        node.fillColor = '0,0,0'
        node.fontColor = '0,0,0'
        node.setSize(0, 0)
        scene.add(node)
      })

      // 加载连线
      _this.forEachLink()

      // 取消选中节点  清除右键菜单
      stage.addEventListener('click', (event) => {
        _this.selectNode = null
        _this.lineNodeA = null
        $('#contextmenu').hide()
      })
      // var jsonstr = tJson(scene)
      stage.add(scene)

      // function tJson (a) {
      //   var d = '['
      //   for (var e = 0; e < a.childs.length; e++) {
      //     var f = a.childs[e]
      //     d += '{'
      //     if (f.elementType == 'node') {
      //       d += '"elementType":' + '"' + f.elementType + '"'
      //       d += ',"x":' + f.x
      //       d += ',"y":' + f.y
      //       d += ',"id":' + f.id
      //       d += ',"Image":' + '"' + f.Image + '"'
      //       d += ',"text":' + '"' + f.text + '"'
      //       d += ',"textPosition":' + '"' + f.textPosition + '"'
      //     } else if (f.elementType == 'link') {
      //       d += '"elementType":' + '"' + f.elementType + '"'
      //       d += ',"nodeAid":' + f.nodeA.id
      //       d += ',"nodeZid":' + f.nodeZ.id
      //       d += ',"text":' + '"' + f.text + '"'
      //       d += ',"fontColor":' + '"' + f.fontColor + '"'
      //     }
      //     d += '},'
      //   }
      //   d = d.substring(0, d.length - 1)
      //   return (d += ']')
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.viewProcessDialog {
  height: 100%;
  .canvas-content-wrap {
    width: 100%;
    height: calc(100% - 80px);
    position: relative;
    overflow: hidden;
    .workflow-info {
      height: 100%;
      width: 600px;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 999;
      background: white;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 5px;
      box-shadow: 0px 0px 8px 0px #efe9e9;
      .title {
        height: 45px;
        line-height: 45px;
        background: #e6e9ec;
        box-sizing: border-box;
        padding: 0 15px;
        color: #403f3f;
        font-size: 16px;
        i {
          cursor: pointer;
        }
        .name {
          margin-left: 15px;
        }
      }
      .content {
        height: calc(100% - 45px);
        box-sizing: border-box;
        .tr {
          height: 40px;
          line-height: 40px;
          display: flex;
          color: #494949;
          font-size: 14px;
          &:nth-child(even) {
            background: #f5f7fa;
          }
          &:nth-child(odd) {
            background: white;
          }
          .names {
            width: 25%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
            padding: 0 10px;
          }
          .nodeInfo {
            width: 75%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
            padding: 0 10px;
          }
          &:hover {
            background: #d4e8ff;
          }
          &:last-child {
            border-bottom: 1px solid #f1f1f1;
          }
        }
        .tr.titles {
          font-size: 15px;
          font-weight: bold;
          background: #f5f7fa;
        }
      }
    }
  }
  #canvas-content {
    width: 100%;
    height: 100%;
    border-radius: 5px;

    #canvas {
      background: rgb(247, 249, 251);
    }
  }
  .toolbar {
    height: 50px;
    line-height: 50px;
    .handletool {
      .btn {
        // padding: 5px 10px;
        border-radius: 18px;
        background: rgb(232, 236, 245);
        color: #494949;
        cursor: pointer;
        margin-right: 10px;
        height: 28px;
        line-height: 28px;
        padding: 0 10px;
        &:hover {
          background: #123d9f;
          color: white;
        }
      }
    }
  }
}
</style>
