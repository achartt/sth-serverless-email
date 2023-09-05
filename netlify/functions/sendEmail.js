const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'austin@southerndreamhomes.org',
            pass: 'vmmsecxlsazgnors' // You should use an app-specific password here
        }
    });

    let info = await transporter.sendMail({
        from: '"Southern Dream Homes" <austin@southerndreamhomes.org>', 
        to: "austin@southerndreamhomes.org", 
        subject: "New Form Submission", 
        text: JSON.stringify(body, null, 2), 
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Email sent successfully!" }),
    };
};
