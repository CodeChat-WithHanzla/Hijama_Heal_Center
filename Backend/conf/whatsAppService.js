import dotenv from "dotenv";
dotenv.config();

const WHATSAPP_API_URL = "https://graph.facebook.com/v17.0";
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

const createMessage = async (phone, notification) => {
  try {
    const response = await fetch(
      `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phone,
          type: "text",
          text: { body: notification }
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error(`Error: ${data.error.message}`);
    } else {
      console.log(`Message sent successfully: ${JSON.stringify(data)}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default createMessage;