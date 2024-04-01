import crypto from 'crypto-js'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
/**
  * AES-256-CBC对称解密
  * @param textBase64 {string} 要解密的密文，Base64格式
  * @param secretKey {string} 密钥，43位随机大小写与数字
  * @returns {string} 解密后的明文
  */
export const AES_CBC_DECRYPT = (textBase64, secretKey) => {
  var keyHex = Base64.parse(secretKey);
  var ivHex = keyHex.clone();
  // 前16字节作为向量
  ivHex.sigBytes = 16;
  ivHex.words.splice(4);
  var decrypt = crypto.AES.decrypt(textBase64, keyHex, {
    "iv": ivHex,
    "mode": crypto.mode.CBC,
    "padding": crypto.pad.Pkcs7
  });
  return Utf8.stringify(decrypt);
}

/**
 * AES-256-CBC对称加密
 * @param text {string} 要加密的明文
 * @param secretKey {string} 密钥，43位随机大小写与数字
 * @returns {string} 加密后的密文，Base64格式
 */
export const AES_CBC_ENCRYPT = (text, secretKey) => {
  var keyHex = Base64.parse(secretKey);
  var ivHex = keyHex.clone();
  // 前16字节作为向量
  ivHex.sigBytes = 16;
  ivHex.words.splice(4);
  var messageHex = Utf8.parse(text);
  var encrypted = crypto.AES.encrypt(messageHex, keyHex, {
    "iv": ivHex,
    "mode": crypto.mode.CBC,
    "padding": crypto.pad.Pkcs7
  });
  return encrypted.toString();
}