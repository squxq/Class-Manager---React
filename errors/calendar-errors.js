// handle errors

const calendarErrors = (err) => {
  let errors = { title: ``, startDate: ``, endDate: `` }

  // validation errors
  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message
  })

  return errors
}

module.exports = calendarErrors
