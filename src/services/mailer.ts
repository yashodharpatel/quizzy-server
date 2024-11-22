import nodemailer from "nodemailer";

const sendMail = async (email: string): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILSERVICE_USER,
        pass: process.env.MAILSERVICE_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Complete Your Quiz - Quizzy",
      html: `
        <p>Hello User,</p>
        <p>It seems you left your quiz halfway through. Please complete it at your earliest convenience.</p>
        <p>Best Regards,</p>
        <p><strong>Quiizy</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Mail sent to ${email}`);
  } catch (error) {
    console.error(`Error sending mail: ${error}`);
  }
};

export default sendMail;
