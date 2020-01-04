const JSPM = {
  init : () => {
    return new Promise((resolve,reject) => {
    let rp;
    try {
    rp = fetch('https://raw.githubusercontent.com/comcloudway/jspm/master/repos/repos-list.json',{mode:'cors'})
    rp.then(t=>t.json())
    rp.then(t=>{
      let repos = {
        local: t.local,
        ext: t.ext
      }
      console.log(JSON.stringify(t))
      for (let i in repos.local) {
        console.log(i)
      }
    })
    } catch (e) {
      reject("Repository List couldn't be fetched")
    }
      
    })
    
  }
}

export {JSPM}