const nodemailer = require("nodemailer");

module.exports = {
     sendEmail: (req, res) => {
          const transporter = nodemailer.createTransport({
               host: 'smtp.ethereal.email',
               port: 587,
               secure: false,
               auth: {
                   user: 'genevieve.turner29@ethereal.email',
                   pass: 'QG3NtdbqWKBapGTER7'
               }
           });

           const mailOptions = {
                from: 'genevieve.turner29@ethereal.email',
                to: 'danigar1813@gmail.com',
                subject: 'Authorized payment.',
                text: 'We have received your payment. We will start creating your program!'
           }

           transporter.sendMail(mailOptions, (err, info) => {
                if (err) return res.status(500).send(err.message);
                console.log("Email was sent!");
                res.status(200).jsonp(req.body);
           })
     }
};