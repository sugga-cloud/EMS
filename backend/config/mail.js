
import nodemailer from 'nodemailer'; // For sending email notifications

export const sendMail = (mail,title)=>{
    // Email options
    
    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or use another email provider
        auth: {
            user: process.env.SEND_MAIL, // Your email address (from .env file)
            pass: process.env.SEND_PASS, // Your email password (from .env file)
        },
    });
    const mailOptions = {
        from: process.env.SEND_MAIL,
        to: mail,
        subject: "Successfully Registered",
        text: "You Have Successfuly registered for "+title,
    };
    
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });

}
