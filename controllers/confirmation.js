const { StatusCodes } = require(`http-status-codes`)
const nodemailer = require(`nodemailer`)
const ejs = require(`ejs`)
const path = require(`path`)
const bcrypt = require(`bcrypt`)
const User = require(`../models/User`)

const confirmation = async (req, res) => {
    const { id, firstname, email } = req.user
    const { id: paramsID } = req.params

    User.findOne({ _id: id }, async (err, user) => {
        if (err) { 
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                err: `User not found.`,
            })
        }
        else {
            const UserID = user._id.valueOf()
            if (UserID !== paramsID) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    err: `Unauthorized to access this route.`,
                })
            }
            else {
                const emailTemplatePath = path.join(__dirname, `..`, `views`, `email-template.ejs`)
                const transporter = nodemailer.createTransport({
                    service: `Gmail`,
                    port: 465,
                    secure: true,
                    auth: {
                        user: `ng.classmanager@gmail.com`,
                        pass: `ghawxtvopgvnyfwh`,
                    }
                })
            
                let user = await User.findById(id)
            
                if (!user.emailToken) {
                    const expression = /[^A-Za-z0-9]/gi
                    const salt = await bcrypt.genSalt(10)
                    let hash = await bcrypt.hash(email, salt)
                    hash = hash.replace(expression, ``)
                
                    user = await User.findOneAndUpdate({ _id: id }, 
                        { emailToken: hash }, { new: true })
                }
            
                const data = await ejs.renderFile(emailTemplatePath, { firstname, emailToken: user.emailToken })
                
                const mailOptions = {
                    from: `"Class Manager" ng.classmanager@gmail.com`,
                    to: `${email}`,
                    subject: `Confirmation email.`,
                    html: data,
                }
                
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) { return console.log(err.message)}
                    console.log(`Message sent: ${ info.messageId }`) 
                })
                try {
                    res.status(StatusCodes.OK).json({ 
                            success: true,
                            firstname,
                        })
                } catch (err) {
                    res.status(StatusCodes.BAD_REQUEST).json({
                        success: false,
                        err: err.message,
                    })
                }
            }
        }
    })
}

const verification = async (req, res) => {
    try {
        const { id, firstname, email } = req.user
        const { token } = req.params

        User.findOne({ _id: id }, (err, user) => {
            if (err) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    err: `User not found.`
                })
            }
            else {
                if (user.emailToken !== token) {
                    return res.status(StatusCodes.UNAUTHORIZED).json({
                        success: false,
                        err: `Unauthorized to access this route.`
                    })
                }
                else {
                    User.findOneAndUpdate({ _id: id }, { active: true }, (err, doc) => {
                        if (err) {
                            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                                success: false,
                                err: `Something went wrong, please try again later.`
                            })
                        } else {
                            res.status(StatusCodes.OK).json({
                                success: true,
                                firstname,
                                email,
                            })
                        }
                    })
                }
            }
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            err: error.message,
        })
    }
}

module.exports = { confirmation, verification } 