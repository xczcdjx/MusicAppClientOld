const Cur_version='1.7.0'

function UpdateFun(c) {
    let cur=c.split('.')
    cur.splice(1,1,Number(cur[1])+1)
    // let cur=(Number(c.split('.')[1])+1)
    return cur.join('.')
}
const Up_version=UpdateFun(Cur_version)

export {
    Cur_version,Up_version
}