import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 360000 })
        }


        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "97f062cb64e0a3",
                pass: "0f4d87573bf755"
            }
        });


        const mailOptions = {
            from: 'jais08933@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your password" : "Reset your password",
            html: `<p> Click <a href="${process.env.domain}/verifyEmail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "Reset your password"} or copy and paste the link below in your browser.
            <br> ${process.env.domain}/verifyEmail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;


    } catch (error) {
        throw new Error(error.message)
    }
}



