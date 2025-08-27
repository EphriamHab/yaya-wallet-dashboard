import crypto from "crypto";


export function generateSignature(body: string = "") {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = crypto
    .createHmac("sha256", process.env.YAYA_API_SECRET!)
    .update(timestamp + body)
    .digest("hex");
  return { timestamp, signature };
}
