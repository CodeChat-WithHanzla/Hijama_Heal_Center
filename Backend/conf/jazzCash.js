import Jazzcash from "jazzcash-checkout";
Jazzcash.credentials({
  config: {
    merchantId: "MC148227",
    password: "YOUR_PASSWORD",
    hashKey: "YOUR_HASH_KEY"
  },
  environment: "sandbox"
});

const JC = {
  pay: (data, callback) => {
    Jazzcash.setData(data);
    Jazzcash.createRequest("PAY").then((res) => {
      callback(JSON.parse(res));
    });
  }
};

export default JC;
