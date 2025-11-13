// Require google from googleapis package.
const { google } = require('googleapis')

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth

/**
 * OAuth2 client instance for Google APIs.
 * Configured with Client ID, Client Secret, and a refresh token.
 * @type {OAuth2}
 */
const oAuth2Client = new OAuth2(
  '1047042295114-ik3qr4kt6i9aqteuhkqvajcg2kksvnlq.apps.googleusercontent.com',
  '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'
)

// Set the credentials using the provided refresh token.
oAuth2Client.setCredentials({
  refresh_token: '1//04ehBEKMoS5rPCgYIARAAGAQSNwF-L9Ir0TxwJXRA2ruD_90_B_xSWEZxRqPLSAH1_vNAAlybNPrd4IAODots1Oc5evJUtRgia1c',
});

module.exports = oAuth2Client;
