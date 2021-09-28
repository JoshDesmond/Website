import * as Dotenv from 'dotenv';
import mail from 'nodemailer';
import express from 'express';
import cors from 'cors';

// Set up express
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// Set up dotenv
Dotenv.config();

// Set up nodemailer
const transporter = mail.createTransport({
	host: "mail.gandi.net",
	auth: {
		user: process.env.SMTP_EMAIL,
		pass: process.env.SMTP_PASS,
	},
	secure: true,
	port: 465,
});

transporter.verify((error, success) => {
	if (error) {
		console.log(error);
	}
});

// Endpoints
app.get('/', (req, res, next) => {
	res.status(200).json({ msg: 'working' })
});

app.post('/', (req, res, next) => {
	console.log(`api called recieved with name: ${req.body.name}`);

	const mail = {
		from: process.env.SMTP_EMAIL,
		to: process.env.TO_EMAIL,
		subject: `New Contact Form Submission From ${req.body.name}`,
		text: `${req.body.message}\n\nSent from ${req.body.email}`,
	}

	const confirmationMail = {
		from: process.env.SMTP_EMAIL,
		to: req.body.email,
		subject: "Automated Confirmation: Your message was delivered to Desmond",
		text: `Hi ${req.body.name},\n\nThank you for contacting me on my website, `
		+ "https://developerdesmond.tech. I've recieved your message and will do my "
	    + "best to get back to you in a timely fashion.\n\nThanks,\nDeveloper Desmond"
	}

	transporter.sendMail(mail, (err, data) => {
		if (err) {
			console.log(`Mail failed: ${err}`);
			res.json({
				status: 'fail',
			})
		} else {
			console.log(`Mail sent: ${JSON.stringify(data)}`);
			console.log(`Sending confirmation email`);
			transporter.sendMail(confirmationMail, (err, data) => {
				if (err) { console.log(`Confirmation email failed: ${err}`); }
			});
			res.json({
				status: 'success',
			})
		}
	})
});

// Run app
app.listen(port, () => {
	console.log(`Backend app listening at http://localhost:${port}`);
});
