
export default function(num){
    let str = num+'';
    if(str.includes('.')){
        return str;
    } else {
        return str+'.0';
    }
}
