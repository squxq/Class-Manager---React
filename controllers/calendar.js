const { StatusCodes } = require("http-status-codes")
const Events = require("../models/Event")
const User = require("../models/User")
const calendarErrors = require(`../errors/calendar-errors`)

const getEvents = async (req, res) => {
  try {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: err.message,
        })
      }

      const userId = user._id

      Events.find({ userId }, async (err, events) => {
        if (err) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            err: err.message,
          })
        }
        try {
          res.status(StatusCodes.OK).json({
            success: true,
            events,
          })
        } catch (err) {
          res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: err.message,
          })
        }
      })
    })
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      err: err.message,
    })
  }
}

const postEvent = async (req, res) => {
  try {
    User.findById(req.params.id, async (err, user) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: err.message,
        })
      }
      const userId = user._id
      let { eventTitle: title, startDate, endDate } = req.body

      if (Object.keys(startDate).length === 0) {
        startDate = new Date().toISOString()
      }
      if (Object.keys(endDate).length === 0) {
        endDate = new Date(
          new Date().setHours(new Date().getHours() + 1)
        ).toISOString()
      }
      try {
        const event = await Events.create({
          userId,
          title,
          start: startDate,
          end: endDate,
        })

        res.status(StatusCodes.CREATED).json({
          success: true,
          event,
        })
      } catch (err) {
        const errors = calendarErrors(err)
        res.status(StatusCodes.BAD_REQUEST).json({ errors })
      }
    })
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      err: err.message,
    })
  }
}

const getSingleEvent = async (req, res) => {
  try {
    Events.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: `Event not found.`
        })
      }
      const {title, start, end} = event
      res.status(StatusCodes.OK).json({
        success: true,
        event: {
          title, 
          start,
          end
        }
      })
    })
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      err: err.message
    })
  }
}

const patchEvent = async (req, res) => {
  try {
    const { eventTitle: title, eventStart: start, eventEnd: end } = req.body
    Events.findOneAndUpdate({_id: req.params.id}, {
      title, start, end
    }, (err, event) => {
      if (err) {
        return res.status(StatusCodes).json({
          success: false,
          err: ``
        })
      }

      res.status(StatusCodes).json({
        success: false,
        event
      })
    })
  } catch (err) {
    res.status(StatusCodes).json({
      success: false,
      err: err.message,
    })
  }
}

const deleteEvent = async (req, res) => {
  try {
    Events.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(StatusCodes).json({
          success: false,
          err: ``
        })
      }
    })
  } catch (err) {
    res.status(StatusCodes).json({
      success: false,
      err: err.message,
    })
  }
}

module.exports = { getEvents, postEvent, getSingleEvent, patchEvent, deleteEvent }
