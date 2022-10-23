class builder{
  constructor(name,target){
    this.name=name
    this.target=target
  }
  *[Symbol.iterator](){
    yield* this.target
  }
}
const o=new builder('year',[18,28,38])
const oo=o[Symbol.iterator]()
console.log(oo.next());
console.log(oo.next());

for(let item of o){
  console.log(item);
}

