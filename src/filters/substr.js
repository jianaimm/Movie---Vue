/**
 * Created by yingyingguo on 17/9/4.
 */

export default function(str){
    var newStr = str;
    if(str && str.length > 36){
        newStr = str.substring(0,36) + '...';
    }
    return newStr;

}
