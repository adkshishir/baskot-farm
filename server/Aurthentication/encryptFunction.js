import { mySecretCode } from "./serectCode.js";
import CryptoJS from "crypto-js";
// export const enCrypter = (password) => {
//   const encryptedPassword = CryptoJS.AES.encrypt(
//     password,
//     mySecretCode
//   ).toString();
//   return encryptedPassword;
// };
// export const deCryptor = (encryptedPassword) => {
//   const deCryptedPassword = CryptoJS.AES.decrypt(
//     encryptedPassword,
//     mySecretCode
//   );
//   return deCryptedPassword.toString(CryptoJS.enc.Utf8);
// };
export function decryptPassword(encryptedPassword, secretKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Encrypt the password
export function encryptPassword(password, secretKey) {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}
