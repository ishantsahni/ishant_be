require('dotenv').config();

const sgMail = require('@sendgrid/mail');

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendSignUpEmail = (email, name) => {

    const msg = {
        to: email,  // Recipient's email
        from: process.env.FROM_EMAIL,
        subject: 'Welcome to our Ecomm Applicaiton!',
        message: `Hi ${name},\n\nThank you for signing up! We are excited to have you onboard.\n\nBest regards,\nYour Ecomm Team`
    }

    sgMail.send(msg)
        .then(() => console.log("Signup email sent successfull!"))
        .catch(error => console.error("Error sending email: ", error));

}

module.exports = { sendSignUpEmail };

