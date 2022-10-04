export const loadJs = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    document.body.appendChild(script)
    script.onload = () => {
      resolve()
    }
  }) 
}

export const loadCss = (url) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
    link.onload = () => {
      resolve()
    }
  })
}

export const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
}

export const generateModle = (genList) => {
    for (let i = 0; i < genList.length; i++) {
      if (genList[i].type === 'grid') {
        genList[i].columns.forEach(item => {
          this.generateModle(item.list)
        })
      } else {
        if (this.value && Object.keys(this.value).indexOf(genList[i].model) >= 0) {
          this.models[genList[i].model] = this.value[genList[i].model]
        } else {
          if (genList[i].type === 'blank') {
            this.$set(this.models, genList[i].model, genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : []))
          } else {
            this.models[genList[i].model] = genList[i].options.defaultValue
          }      
        }
        
        if (this.rules[genList[i].model]) {
          
          this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules.map(item => {
            if (item.pattern) {
              return {...item, pattern: new RegExp(item.pattern)}
            } else {
              return {...item}
            }
          })]
        } else {
          
          this.rules[genList[i].model] = [...genList[i].rules.map(item => {
            if (item.pattern) {
              return {...item, pattern: new RegExp(item.pattern)}
            } else {
              return {...item}
            }
          })]
        }      
      }
    }
};