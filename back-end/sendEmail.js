var nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport')


module.exports = function sendMail(email, url){
	const transport = nodemailer.createTransport(smtpTransport({
		host: 'smtp.gmail.com',
    	port: 465,
    	secure: true,
		auth: {
			user: "articleannotator@gmail.com",
			pass: "comp523pass"
		}
	}))

	var mailOptions = {
	from: "articleannotator@gmail.com",
	to: email,
	subject: 'Requested URL',
	text: 'Here is the URL to your Article Annotator webpage! \n' + url
	};

	transport.sendMail(mailOptions, function(error, info){
	if (error) {
		console.log(error);
	} else {
		console.log('Email sent: ' + info.response);
	}
	});

}

