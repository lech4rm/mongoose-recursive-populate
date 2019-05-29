module.exports = exports = function mongooseRecursivePopulate(schema, index) {
  // Fetch all the paths with valid options here
  var paths = ''

  // Grab every path with truthy recursive value

  schema.eachPath(function grabPaths(pathName, schemaType) {
    if (schemaType.options && schemaType.options.recursive) {
      paths += pathName
    }
  })

  function recursivePopulateHandler(next) {
    // Populate only if paths is truthy
    paths && this.populate(paths)
    next()
  }

  schema
    .pre('find', recursivePopulateHandler)
    .pre('findOne', recursivePopulateHandler)
}
