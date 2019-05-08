


export function getLogInfo() {
  const logArray=JSON.parse(localStorage.getItem("logArray"))||[];
  return logArray;
}

export function getFirstLog() {
  const logArray=getLogInfo();
  return logArray.length>=1?logArray[0]:{};
}

export function getSecondLog() {
  const logArray=getLogInfo();
  return logArray.length>=2?logArray[1]:{};
}

export function push(obj) {
  const logArray=getLogInfo();
  // console.log(obj.url,"-1-1-",logArray.findIndex(item => item.url === obj.url));
  // logArray.splice(logArray.findIndex(item => item.url === obj.url), 1);
  if(obj.url&&obj.url.indexOf("currentUser")<0){
    logArray.unshift(obj);
    if(logArray.length>10){
      logArray.splice(10,logArray.length-10)
    }
    localStorage.setItem("logArray",JSON.stringify(logArray));
  }
}
