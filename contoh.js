let obj = {
    nama : 'romy',
    nested : {
        nest : true
    }
}

let { nested } = obj
let { nest } = nested

console.log(nest)