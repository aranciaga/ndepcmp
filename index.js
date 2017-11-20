let http    = require('http')
let async   = require('async')

const GetInfo = (pkg, cb) => {

  var data = ''

  return http.get('http://registry.npmjs.org/' + pkg, (res) =>
  {
    if( res.statusCode == "404" ) return cb(null, true)
    res.on('data', (chunk) => { data+=chunk })
    res.on('end',  ()      => { return cb(JSON.parse(data)) })
  })

}

const GetDependencies = (pkg, cb) => {
  GetInfo(pkg, (info, err) => {
    if(err) return cb(null, true)
            return cb(info.versions[info['dist-tags'].latest].dependencies)
  })
}

const SearchAllDependencies = (dependencies, cb) => {

  let pkg_deps = []
  async.each(dependencies, (item, asyncCB) => {

    GetDependencies(item, (dep, err) =>
    {
      pkg_deps.push( (dep) ? { name: item, dependencies: dep } : {name : item, error: true })
      asyncCB()
    })

  }, () => { return cb(pkg_deps) })

}

module.exports = { GetDependencies, SearchAllDependencies, GetInfo }
