export const isEmpty = (obj) => {
  return typeof obj === 'undefined' || obj === null || obj === '';
}

export const createTime = () => { 
  return new Date();
}