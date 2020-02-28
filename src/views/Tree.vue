<template>
  <div class="block-posts">
      <div class="navigation">
        <div class="navigation-filter">
          <input type="text" v-model="treeFilter" placeholder="Type to filter...">
        </div>
        <div class="navigation-tree">
          <tree :data="treeData" :options="treeOptions" :filter="treeFilter" v-model="selectedNode">
            <div class="tree-scope" slot-scope="{ node }">
              <template v-if="node.data.isRoot">
                <!-- you can add an icon here, but it is too long for the demo... sorry  -->

                <span class="text">
                  {{ node.text }}
                </span>

                <span class="release" v-if="!node.hasChildren()">
                  {{ node.data.release }}
                </span>
              </template>
              <template v-else>

                <!-- here we can leave a vue-router for example... -->

                <span class="text">
                    {{ node.text }}
                  </span>

                  <span class="release">
                    {{ node.data.release }}
                  </span>
              </template>
            </div>
          </tree>
        </div>
      </div>
      <div class="content">
        <div v-if="!selectedNode || selectedNode.hasChildren()">Welcome!</div>
        <ul v-else>
          <li>Name: <b>{{ selectedNode.data.name }}</b></li>
          <li>Type: <b>{{ selectedNode.data.type }}</b></li>
          <li>Slug: <b>{{ selectedNode.data.slug }}</b></li>
          <li>Release: <b>{{ selectedNode.data.release }}</b></li>
        </ul>
      </div>
  </div>
</template>

<script>
/*eslint-disable */
import LiquorTree from 'liquor-tree'
import treeData from '../components/api/dataTree.json'
export default {
  components: {
    [LiquorTree.name]: LiquorTree
  },
  data() {
    return {
    //   treeData: treeData,
      selectedNode: null,
      treeFilter: '',
      treeOptions: {
            multiple: false,
            filter: {
                plainList: true
            }
        },
            treeData: new Promise(resolve => {
              	const items = {}

                treeData.forEach(item => {
                  const { name } = item;

                  if (false === (name in items)) {
                    items[name] = []
                  }

                  let treeItem = {
                    text: item.version ? `${item.name} ${item.version}` : item.name,
                    data: item
                  }

                  items[name].push(treeItem)
                })

                let o = Object.keys(items).reduce((a, b) => {
                  let children = items[b]
                  let item

                  if (children.length > 1) {
                    item = {
                      text: children[0].data.name,
                      data: Object.assign({}, children[0].data),
                      children
                    }
                  } else {
                    item = children[0]
                    item.data
                  }

                  if (!item.data) {
                    item.data = {
                      type: children[0].data.type,
                      isRoot: true
                    }
                  } else {
                    item.data.isRoot = true
                  }

                  a.push(item)

                  return a
                }, [])

                resolve(o)
              })
    };
  }
};
</script>>

<style scoped lang="scss">
body {
        margin: 0;
      }

      .hello {
        font-size: 1em;
        padding: 0;
        height: 80px;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }

      #app {
        position: absolute;
        top: 0;
        width: 100%;
        bottom: 0;
        right: 0;
      }

      .navigation {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 280px;
        overflow-y: scroll;
        background-color: #f9f9f9;
      }

      .navigation-filter {
        padding: 5px 10px;
      }

      .navigation-filter input {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        font-size: .875rem;
        background: #fff;
        border: 1px solid;
        border-color: #d2d2d2;
        border-radius: 3px;
        padding: 6px;
        box-sizing: border-box;
      }

      .content {
        overflow: auto;
        position: absolute;
        left: 280px;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .tree-arrow.has-child:after {
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBBQOCQ0YTpzfAAAAjklEQVQoz2NmYGBgYGAIdAw/LPHu6kUGDMAEoXjt+WXM5kck4VTAwMDAwMhoOgdTCRMyB5sSJlQuphImdCPRlTBhOgtVCRYFECWBjngUMDAwMDAy4VVwJnvdXjwKTmcvn47HDadzlk/D44szecun4gmHM/nLJuMJyTMFyyahm8gCoT4f+fz8ZtuyKZguAgDLtyS94NiAKwAAAABJRU5ErkJggg==')
;
        border: 0;
        width: 16px;
        height: 16px;
        background-repeat: no-repeat;
        transform: rotate(0deg) translateY(-50%) translateX(-2px);
      }

      .tree-arrow.expanded.has-child:after {
        transform: rotate(90deg) translateY(0%) translateX(-8px);
      }

      .tree-node.selected > .tree-content {
        background: #398df0;
      }

      .tree-node.selected > .tree-content > .tree-anchor {
        color: #fff;
      }

      .tree-content {
        padding: 2px 0;
      }

      .tree-scope {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .release {
        color: #a9a9a9;
      }
</style>
