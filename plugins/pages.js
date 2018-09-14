class PM{
  constructor(){
    this.$$cache = {};
  }

  add(page){
    let pagePath = this._getPagePath(page);
    this.$$cache[pagePath] = page;
  }

  get(pagePath){
    return this.$$cache[pagePath];
  }

  delete(page){
    try {
      delete this.$$cache[this._getPagePath(page)];
    } catch(e){

    }
  }

  _getPagePath(page){
    return page.__route__;
  }
}

module.exports = new PM();