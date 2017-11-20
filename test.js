let chai    = require('chai')
let depcmp  = require('./')

describe('Error handling', () => {
  it('Unknown package should return error', () =>
  {
    depcmp.GetDependencies("ididntbornyetpackage", (deps, err) => {
      assert.equal(true, deps.error)
    })
  })
})

describe('Get dependencies', () => {
  it('"async" package should return only 1 dependency', () =>
  {
    depcmp.GetDependencies("async", (deps, err) => {
      assert.equal(1, deps.length)
    })
  })
})
