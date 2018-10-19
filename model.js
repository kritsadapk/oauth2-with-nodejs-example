import JWT from 'jsonwebtoken'


let JWT_ISSUER = 'thisdemo'
let JWT_SECRET_FOR_ACCESS_TOKEN = 'XT6PRpRuehFsyMa2';
let JWT_SECRET_FOR_REFRESH_TOKEN = 'JWPVzFWkqGxoE2C2';

const JWT_ACCESS_TOKEN_EXPIRY_SECONDS = 1800
const JWT_REFRESH_TOKEN_EXPIRY_SECONDS = 1209600

let oauthClients = [{
  cliendId: '12312',
  cliendSecret: 'xxxxbbbbb',
  redirectUri: 'abc.com'
}]
const generateToken = (type, req, callback) => {
  let token
  let secret
  let user = req.user
  let exp = new Date()
  let payload = {
    iss: JWT_ISSUER,
    userId: user.id
  }
  console.log(type)
}
const getClient = (clientId, clientSecret, callback) => {

}

const saveAuthorizationCode = (code, client, user) => { //same saveAuthCode()

}
const getAccessToken = (accessToken, callbacl) => {

}
export default {
  JWT_ACCESS_TOKEN_EXPIRY_SECONDS,
  JWT_REFRESH_TOKEN_EXPIRY_SECONDS,
  generateToken,
  getClient,
  saveAuthorizationCode,
  getAccessToken
}