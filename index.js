import express from 'express'
import bodyParser from 'body-parser'
import OAuth2Server from 'oauth2-server'
import AccessDeniedError from 'oauth2-server/lib/errors/access-denied-error'

import views from 'co-views'
import util from 'util'
import swig from 'swig'

import model from './model'

// const Request = OAuth2Server.Request
// const Response = OAuth2Server.Response

let PORT = 3002
let tobi = {
  name: 'Infinite Team',
  species: 'Open Source Technology co,.ltd'
}

const app = express()

app.oauth = new OAuth2Server({
  model,
  grants: ['password', 'authorization_code', 'refresh_token'],
  debug: true,
  allowBearerTokensInQueryString: true,
  accessTokenLifetime: model.JWT_ACCESS_TOKEN_EXPIRY_SECONDS,
  refreshTokenLifetime: model.JWT_REFRESH_TOKEN_EXPIRY_SECONDS
})

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())


// let request = new Request({
//   method: 'GET',
//   query: {},
//   headers: {
//     Authorization: 'Bearer foobar'
//   }
// })

// let response = new Response({
//   headers: {}
// })



app.use(app.oauth.authorize())

app.post('/oauth/token', app.oauth.token()) //same grant()




app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

app.get('/login', (req, res) => {
  res.render('login', {
    user: tobi,
    redirect: req.query.redirect,
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri
  })
})

console.log(model)

// Get secret.
app.get('/secret', app.oauth.authenticate(), function (req, res) {
  // Will require a valid access_token.
  res.send('Secret area');
})

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`)
})