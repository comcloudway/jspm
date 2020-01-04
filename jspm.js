const JSPM = {
  init: () => {

    return new Promise((resolve, reject) => {

      try {
        //Fetch Repo list
        fetch('https://raw.githubusercontent.com/comcloudway/jspm/master/repos/repos-list.json', { mode: 'cors' })
          .then(t => t.json())
          .then(r => {

            JSPM.repos = {};
            let code = 0;
            let l = 0;
            //Calculate Repo length
            for (let i in r.repos) {
              l++;
            }

            //Loop Repos
            for (let i in r.repos) {

              console.log(`Fetching Repo: ${i}`);


              try {
                //Fetch Repo Content
                fetch(r.repos[i], { mode: 'cors' })
                  .then(t => t.json())
                  .then(json => {

                    //repo X
                    code++;

                    //Add Repo to list
                    JSPM.repos[i] = json;

                    if (code == l) {
                      console.log("Initialised");
                      resolve("true");
                    }

                  });
              } catch (e) {
                reject("ERROR: One or more Repo's couldn't be fetched");
              }

            }

          });
      } catch (e) {
        reject("Repository List couldn't be fetched");
      }

    });

  },
  findInRepo: (pkgname) => {
    return new Promise((resolve, reject) => {
      let l = 0;
      let code = 0;
      let pos = [];
      
      //Repo Current Location Collection
      let rc = {
        
      };
      //Calculate Repo Length
      let rl = {
        
      };
      //Calculate Repo length
      for (let repo in JSPM.repos) {
        
        rl[repo]=0;
        
        
        for (let list in JSPM.repos[repo]) {
          rl[repo]++;
        }
      }
      

      for (let repo in JSPM.repos) {
        rc[repo]=0;
        for (let list in JSPM.repos[repo]) {

          rc[repo]++;

          if (pkgname == list) {
            console.log(`Found Package in Repo: ${repo}`);
            //Add Repo Data
            pos.push([repo, list, rc[repo]-1]);
          }
          if (rc[repo]==rl[repo]) {
            if(pos.length==0) {
              reject('ERROR: No Package found');
            }
            resolve(pos);
          }
        }
      }
    });
  },
  fetch: (pkgname,select) => {
    return new Promise((resolve, reject)=>{
    if(select===undefined) select =0;
    
    //Search package
    
    JSPM.findInRepo(pkgname)
    .then(r=>{
      //Select Repo (If more than one)
      let rs = r[select];
      //get url from cache
      let url = JSPM.repos[rs[0]][rs[1]];
      try {
      fetch(url,{mode:'cors'})
      .then(t=>t.json())
      .then(json=>{
        let pkg = json;
        //return package data
        resolve(pkg);
      });
      } catch (e) {
        reject("The link provided by this Repo seems to be unavailable");
      }
    });
    });
  },
  require: (pkgname, select) => {
    return new Promise((resolve, reject) => {
      JSPM.fetch(pkgname,select)
      .then(pkg=>{
        
        if (pkg.deps.length>0) {
          //package has dependencies
        } else {
          // no deps import package now 
          resolve({[pkg.id]:import(pkg.src)});
        }
      });
    });
  }
};

export { JSPM };