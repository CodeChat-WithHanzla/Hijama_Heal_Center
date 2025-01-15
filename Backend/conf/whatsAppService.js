import dotenv from "dotenv";
dotenv.config();
import twilio from "twilio";
const accountSid = process.env.TWILIO_Account_SID;
const authToken = process.env.TWILIO_AUTH;
const client = twilio(accountSid, authToken);
const createMessage = async (phone, notification) => {
  try {
    const message = await client.messages.create({
      body: notification,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${phone}`,
    });

    console.log(message.body);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default createMessage;
