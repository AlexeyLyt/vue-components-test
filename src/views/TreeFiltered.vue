<template>
  <div class="block-posts">
      <div class="examples">
        <div class="example">
          <div class="example-description">
            <input type="text" placeholder="Type to filter..." v-model="filter" class="filter-field">
          </div>
          <div class="example-tree">
            <tree :data="data" :options="opts" :filter="filter" ref="tree">
              <div slot-scope="{ node }" class="node-container">
                <div class="node-text">{{ node.text }}</div>
                <div class="node-controls">
                  <a href="#" @mouseup.stop="editNode(node)">Edit</a>
                  <a href="#" @mouseup.stop="removeNode(node)">Remove</a>
                  <a href="#" @mouseup.stop="addChildNode(node)">Add child</a>
                </div>
              </div>
            </tree>
          </div>
        </div>

        <div class="example">
          <div class="example-description">
            List of tree events. Open console to details.
          </div>

          <div class="events-table">
            <div class="events-table-header">
              <span>Event Name</span>
              <span>Event Args</span>
              <span>Node Name</span>
              <span>Timestamp</span>
            </div>

            <transition-group name="fade" tag="div" class="events-table-body">
              <div :key="e.id" v-for="e in eventsList" class="event">
                <span><b>{{ e.name }}</b></span>
                <span>{{ e.args }}</span>
                <span>{{ e.nodeText }}</span>
                <span>{{ e.time | time }}</span>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
/*eslint-disable */
import LiquorTree from 'liquor-tree'
import data from '../components/api/dataTree2.json'
const eventsList = [
    { name: 'tree:mounted', args: ['Tree Component'] },
    { name: 'tree:filtered', args: ['Matches', 'Filter String'] },
    { name: 'tree:data:fetch', args: ['Parent Node'] },
    { name: 'tree:data:received', args: ['Parent Node'] },

    { name: 'node:clicked', args: ['Node']},
    { name: 'node:disabled', args: ['Node']},
    { name: 'node:enabled', args: ['Node']},
    { name: 'node:shown', args: ['Node'] },
    { name: 'node:hidden', args: ['Node'] },
    { name: 'node:dblclick', args: ['Node'] },
    { name: 'node:selected', args: ['Node'] },
    { name: 'node:unselected', args: ['Node'] },
    { name: 'node:checked', args: ['Node'] },
    { name: 'node:unchecked', args: ['Node'] },
    { name: 'node:expanded', args: ['Node'] },
    { name: 'node:collapsed',  args: ['Node'] },
    { name: 'node:added',  args: ['Node', 'New Node'] },
    { name: 'node:removed',  args: ['Node'] },
    { name: 'node:text:changed', args: ['Node', 'New Text', 'Old Text']},

    { name: 'node:editing:start',  args: ['Node'] },
    { name: 'node:editing:stop',  args: ['Node', 'isTextChanged'] },
    ]

let key = 0
export default {
  components: {
    [LiquorTree.name]: LiquorTree
  },
  data() {
    return {
        events: [],
        data: getData(),
        filter: null,
        opts: {
            fetchData: (node) => {
            	return Promise.resolve(data[node.id - 1])
            },
            checkbox: true
        }
    };
  },
  filters: {
        time(time) {
            return +time
        }
  },
  computed: {
          eventsList() {
            return this.events.concat().reverse()
          }
        },

        mounted() {
          eventsList.forEach(e => {
            this.$refs.tree.$on(e.name, this.initEventViewer(e))
          })
        },

        methods: {
          editNode(node, e) {
            node.startEditing()
          },

          removeNode(node) {
            if (confirm('Are you sure?')) {
              node.remove()
            }
          },

          addChildNode(node) {
            if (node.enabled()) {
            	node.append('New Node')
            }
          },

          initEventViewer(event) {
            const events = this.events

            return function (node, newNode) {
              let nodeText = '-'
              let targetNode = newNode && newNode.text ? newNode : node

              if (targetNode && targetNode.text) {
                nodeText = targetNode.text
              }

              events.push(
                Object.assign(
                  {},
                  event,
                  { time: new Date, nodeText, id: key++ }
                )
              )

              console.log(event, arguments)
            }
          }
        }
};

function getData() {
        return new Promise(resolve => {
          setTimeout(_ => {
            resolve([
              {
                "text": "Introduction",
                "isBatch": true,
                "id": 1
              },
              {
                "text": "Part I: Fundamentals",
                "isBatch": true,
                "id": 2
              },
              {
                "text": "Data Types and Variables",
                "isBatch": true,
                "id": 3
              }
            ])
          }, 100)
        })
      }
</script>>

<style scoped lang="scss">
.demo-tree {
  width: 50%;
}

.filter-field {
  display: block;
  width: 100%;
  padding: 3px;
}

.events-table {
  width: 100%;
  margin-top: 15px;
}

.events-table-header {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  background-color: #fff;
  text-align: left;
  display: flex;
  justify-content: space-between;

}

.events-table .event:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.events-table .event {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
  display: flex;
}

.events-table .event > span,
.events-table-header > span {
  flex-basis: 25%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.node-controls a {
  color: #ff14ce;
  margin-right: 10px;
}
.node-controls {
    text-align: left;
}
.node-text {
    text-align: left;
}
</style>
