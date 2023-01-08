const classesErrors = (err) => {
  let classErrors = { name: ``, status: ``, teacher: ``, students: `` }

  Object.values(err.errors).forEach((errors) => {
    classErrors[errors.properties.path] = errors.properties.message
  })

  return classErrors
}

module.exports = classesErrors
