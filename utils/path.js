// 获取绝对路径
let absolutePath = (path = '') => {
  try {
    const length = getCurrentPages().length;
    const currentRoute = getCurrentPages()[length - 1].route;
    const pathIndex = currentRoute.split('/').length;
    let str = "";
    for (let i = 0; i < pathIndex - 1; i++) {
      str += "../";
    }
    return str + path;
  } catch(e) {
    console.error(`error in path: ${e}`);
  }
}

module.exports = {
  absolutePath
}