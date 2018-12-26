import { getMasterData } from '../services/conf';

// clear Cache
export const clearCache = () => {
  localStorage.clear();
};

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getEnumData(keyName) {
  // console.log("getEnumData----------:",localStorage.getItem(keyName));
  const str = localStorage.getItem(keyName) || '[]';
  // console.log("getEnumData----------:",str);
  const rows = JSON.parse(str);
  // console.log("getEnumData3----------:",rows);
  return rows;
}

export function setEnumData(keyName, rows) {
  // console.log("setEnumData----------:",JSON.stringify(rows));
  localStorage.setItem(keyName, JSON.stringify(rows));
  // const test=getEnumData(keyName);
  // console.log("setEnumData----------:",test);
}
// function* call(keyName) {
//   const payload = { key: keyName };
//   const rows = yield getMasterData(payload);
//   console.log('rows:', rows);
//   return rows;
// }
const g = function*(keyName) {
  try {
    const payload = { key: keyName };
    const rows = yield getMasterData(payload);
    console.log('rows in masterData:', rows);
    return rows;
  } catch (e) {
    console.log(e);
  }
  return [];
};
function run(generator, keyName) {
  const it = generator(keyName);

  function go(result) {
    console.log('go in masterData:', result);
    if (result.done) return result.value;
    return result.value.then(value => go(it.next(value)), error => go(it.throw(error)));
  }

  const result = go(it.next());
  console.log('result in masterData:', result);
  return result;
}

export function fetchEnumData7(keyName) {
  return run(g, keyName);
  // const call=fetchEnumData0(keyName);
  // const promise=call.next();
  // let rows=[];
  // promise.then( (response)=> {
  //   console.log("getEnumData response:", response);
  //   rows = response && response.data ? response.data.rows : [];
  //   // setEnumData(keyName,rows);
  //   call.next(rows);
  // },  (error) => {
  //   console.error('出错了', error);
  // });
}
// export function* fetchEnumData5(keyName) {
//   // localStorage.removeItem(keyName);
//   let localRows = getEnumData(keyName);
//   // console.log("fetchEnumData----------:",localRows);
//   console.debug('getEnumData localRows:', localRows);
//   if (localRows.length === 0) {
//     const payload = { key: keyName };
//     console.log('getEnumData payload:', payload);
//     const promise = yield getMasterData(payload);
//     console.log('getEnumData promise:', promise);
//     // let rows = [];
//     // promise.then( (response)=> {
//     //   console.log("getEnumData response:", response);
//     //   rows = response && response.data ? response.data.rows : [];
//     //   // setEnumData(keyName,rows);
//     //   localRows= rows;
//     // },  (error) => {
//     //   console.error('出错了', error);
//     // });
//     // console.log("getEnumData rows:", rows);
//     return promise;
//   }
// }

export function fetchEnumData(component, keyName) {
  // localStorage.removeItem(keyName);
  clearCache();
  const localRows = getEnumData(keyName);
  // console.log("fetchEnumData----------:",localRows);
  const obj = {};
  obj[`${keyName}Rows`] = localRows;
  console.debug('getEnumData localRows:', localRows);
  if (localRows.length === 0) {
    const payload = { key: keyName };
    // console.log("getEnumData payload:", payload);
    const promise = getMasterData(payload);
    // console.log("getEnumData promise:", promise);
    promise.then(
      response => {
        // console.log("getEnumData response:", response);
        const rows = response && response.data ? response.data.rows : [];
        setEnumData(keyName, rows);
        obj[`${keyName}Rows`] = rows;
        component.setState(obj);
      },
      error => {
        console.error('出错了', error);
      }
    );
    console.debug('getEnumData rows:');
  } else {
    component.setState(obj);
  }
}
export function getItem(rows, val) {
  let row = rows.find(data => data.itemCode === val);
  if (!row) {
    row = { itemCode: val, itemValue: val };
  }
  return row;
}

export function getItemValue(rows, val) {
  return getItem(rows, val).itemValue;
}
