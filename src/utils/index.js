
export * from './constants'

export const setItemInLocalStorage=(key,value)=>{
  if(!key || !value){
    return console.error('cannot store key value');
  }else{
    const valueToStore=typeof value !== 'string'?JSON.stringify(value):value;
    localStorage.setItem(key,valueToStore);
  }
}

export const getItemInLocalStorage=(key)=>{
  if(!key){
    return console.error('cannot get key from local storage');
  }else{
    return localStorage.getItem(key);
  }
}

export const removeItemInLocalStorage=(key)=>{
  if(!key){
    return console.error('cannot get key from local storage');
  }else{
    localStorage.removeItem(key);
  }
}

export const getFormBody = (params) => {
    let formBody = [];
  
    for (let property in params) {
      let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
      let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123
  
      formBody.push(encodedKey + '=' + encodedValue);
    }
  
    return formBody.join('&'); // 'username=aakash&password=123213'
  };