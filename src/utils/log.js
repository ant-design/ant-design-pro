const logArray=[];

export function push(obj) {
  // console.log(obj.url,"-1-1-",logArray.findIndex(item => item.url === obj.url));
  // logArray.splice(logArray.findIndex(item => item.url === obj.url), 1);
  logArray.unshift(obj);
  if(logArray.length>5){
    logArray.splice(5,logArray.length-5)
  }
}

export function getLogInfo() {
  return logArray;
}

export function firstLog() {
  return logArray.length>=1?logArray[0]:{};
}

export function secondLog() {
  return logArray.length>=2?logArray[1]:{};
}
