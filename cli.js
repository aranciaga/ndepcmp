#!/usr/bin/env node

const depcmp   = require('./')
const packages = process.argv.slice(2)

if ( packages.length ==  0)
{
  console.log("Usage: ndepcmp <pkg1> <pkg2> .. <pkgn>")
  return
}

console.log("Searching dependencies...")

depcmp.SearchAllDependencies(packages, (pkg_deps) =>
{
  pkg_deps.forEach( (pkg) => {
    console.log(
      pkg.error ? "* The package '" + pkg.name + "' was not found"
                : "* The package '" + pkg.name + "' has " + Object.keys(pkg.dependencies).length + " dependencies"
    )
  })
})
