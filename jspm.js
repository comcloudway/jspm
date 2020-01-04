const JSPM = {
  init : () => {
    return new Promise((resolve,reject) => {
    
    try {
    fetch('https://raw.githubusercontent.com/comcloudway/jspm/master/repos/repos-list.json',{mode:'cors'})
    .then(t=>t.json())
    .then(r=>{
      
      
      for (let i in r.repos) {
        console.log(i)
        
        try {
          fetch (repo, {mode:'cors'})
          .then(t=>t.json())
          .then(json=>{
            
            //repo X
            
            
            
          })
        } catch (e) {
          reject("ERROR: One or more Repo's couldn't be fetched")
        }
      }
      
    })
    } catch (e) {
      reject("Repository List couldn't be fetched")
    }
      
    })
    
  },
  fetch: (pkgname) => {
    
  }
}

export {JSPM}