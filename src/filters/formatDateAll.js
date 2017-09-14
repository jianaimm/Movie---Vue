
//转为年月日，时分秒格式；
export default function (value,f) {
    let str = f ? f : 'y-m-d h:i:s';
    let date = new Date(value);
// console.log(value)
    str = str.replace('y',date.getFullYear());
    str = str.replace('m',addZero(date.getMonth()));
    str = str.replace('d',addZero(date.getDate()));
    str = str.replace('h',addZero(date.getHours()));
    str = str.replace('i',addZero(date.getMinutes()));
    str = str.replace('s',addZero(date.getSeconds()));
    // console.log(str)
    return str;
}

function addZero(n){
    return n < 10 ? '0'+ n : ''+ n;
}

/*console.log(getDate(4))
function getDate(val) {
    var v = [1,3,5,7,10,12,8]
    var s = [4,6,11,9]
    // v.forEach(item=>{
    //     if(item==val){
    //         return 31
    //     }
    // })
    if(s.includes(val)){
        return 30
    }
    // if(val==2){
    //     return 29
    // }

    // return data.getDate();

}*/
