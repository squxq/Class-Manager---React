// imports

// functions
const dashboard = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
    })
  } catch (err) {
    res.status(400).json({ err: err.message })
  }
}

// exports
module.exports = { dashboard }
