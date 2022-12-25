const { StatusCodes } = require(`http-status-codes`)
const nodemailer = require(`nodemailer`)
const ejs = require(`ejs`)
const path = require(`path`)

const confirmation = async (req, res) => {
    const emailTemplatePath = path.join(__dirname, `..`, `views`, `email-template.ejs`)
    const { firstname, email } = req.user
    
    const data = await ejs.renderFile(emailTemplatePath, { firstname })

    const transporter = nodemailer.createTransport({
        service: `Gmail`,
        port: 465,
        secure: true,
        auth: {
            user: `ng.classmanager@gmail.com`,
            pass: `ghawxtvopgvnyfwh`,
        }
    })

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

module.exports = confirmation 