//把数字格式转化为时分秒格式；
export default function(num,f){
    // console.log(typeof num,num);
    var str = '';
    if(num > 3600){//含有小时；
        str = 'h:m:s';
       str = str.replace('h',addZero(Math.floor(num/3600)));
       str = str.replace('m',addZero(Math.floor((num%3600)/60)));
       str = str.replace('s',addZero(Math.ceil(num%3600)%60));
    } else {
        str = 'm:s';
        str = str.replace('m',addZero(Math.floor(num/60)));
        str = str.replace('s',addZero(Math.ceil(num%60)));
    }

    return str;
}
function addZero(n){
    return n < 10 ? '0'+ n : ''+ n;
}
