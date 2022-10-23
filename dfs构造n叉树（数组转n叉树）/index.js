 class treeNode{
  constructor(id,name){
    this.id=id,
    this.name=name
  }
  addChildren(node){
    if(!this.children) this.children=[]
    this.children.push(node)
  }
}
 function changeArray(data){
  const nodePrent=new treeNode(0,'parent')
  const addNode=(parent)=>{
    data.forEach(item => {
      if(item.pid===parent.id){
        const node=new treeNode(item.id,item.name)
        parent.addChildren(node)
        addNode(node)//每个节点都跑一次数组看看有没有这个节点的子节点
      }
    });
  }
  addNode(nodePrent)
  return nodePrent
}

const data = [
  { id: 1, name: "a", pid: 0 },
  { id: 2, name: "b", pid: 1 },
  { id: 3, name: "c", pid: 2 },
  { id: 4, name: "d", pid: 1 },
  { id: 5, name: "e", pid: 6 },
  { id: 6, name: "f", pid: 5 },
  { id: 7, name: "g", pid: 0 },
];
let res= changeArray(data)
console.log(res);
function tree2Obj(root) {
  const res = {
    id: root.id,
    name: root.name,
  };
  if (root.children) {
    res.children = [];
    for (const child of root.children) {
      res.children.push(tree2Obj(child));
    }
  }
  return res;
}
const res2 = tree2Obj(res);
console.log(res2.children);
