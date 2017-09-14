//转为年月日格式
export default function(val,f){
// console.log(val)
    var str = f ? f : 'y-m-d';
    var date = new Date(val);
    str = str.replace('y',date.getFullYear());
    str = str.replace('m',date.getMonth());
    str = str.replace('d',date.getDate());

    return str;

}
