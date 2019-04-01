import { allEnumList } from '../services/enumService';
// clear Cache
export const clearCache = () => {
  localStorage.clear();
};

export function setAllEnumData() {
  // localStorage.removeItem("allEnum")
  const promise = allEnumList();
  promise.then(
    response => {
      console.log('allEnumList response:', response);
      const allEnum = response && response.data ? response.data : [];
      // console.log("allEnum:", allEnum);
      localStorage.setItem('allEnum', JSON.stringify(allEnum));
    },
    error => {
      console.error('出错了', error);
    }
  );
}

export function getAllEnumData() {
  const rows = localStorage.getItem('allEnum');
  return JSON.parse(rows);
}

export function getItems(javaCode, javaKey) {
  const allEnum = getAllEnumData();
  return allEnum.filter(obj => obj.javaCode === javaCode && obj.javaKey === javaKey);
}

export function getItem(javaCode, javaKey, itemCode) {
  const rows = getItems(javaCode, javaKey);
  // console.log("masterdata items:",rows);
  // console.log("masterdata item:",row)
  return rows.find(data => data.itemCode === itemCode);
}

export function getItemValue(javaCode, javaKey, itemCode) {
  const item=getItem(javaCode, javaKey, itemCode);
  return item?item.itemValue:'';
}

export function getItem2(rows, itemCode) {
  // console.log("masterdata items:",rows);
  // console.log("masterdata item:",row)
  return rows.find(data => data.itemCode === itemCode);
}

export function getItemValue2(items, itemCode) {
  const item=getItem2(items, itemCode);
  return item?item.itemValue:"";
}

export function getName(list, val, keyName, titleName) {
  const data = list ? list.find(obj => obj[keyName] === val) : undefined;
  return data ? data[titleName] : val;
}

export function getGroupName(list, val) {
  return getName(list, val, 'groupId', 'groupName');
}
