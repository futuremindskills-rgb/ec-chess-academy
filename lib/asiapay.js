// lib/asiapay.js
import crypto from 'crypto';

export function generateAsiaPayHash(orderRef, amount, currCode, secret) {
  // CORRECT: Matches the required AsiaPay string sequence
  const rawStr = `${process.env.ASIAPAY_MERCHANT_ID}|${orderRef}|${currCode}|${amount}|N|${secret}`;
  return crypto.createHash('sha1').update(rawStr).digest('hex');
}