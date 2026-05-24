import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/models/userModel.models";

export const sendMail = async ({ email, userId, emailType }: any) => {

    try {

        //create token

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }, { new: true }
            )
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }, { new: true }
            )
        }

        const transporter = nodemailer.createTransport({

            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "de1ab05a13fc6a",
                pass: "91a4e02af9de04"
            }

        });

        const mailOptions = {
            from : 'shubham@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }

        const mailresponse = await transporter.sendMail(mailOptions);

        return mailresponse;

    } catch (error: any) {
        console.error(error.message);
    }
}

