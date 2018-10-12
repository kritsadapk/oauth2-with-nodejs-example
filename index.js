import express from 'express'
import bodyParser from 'body-parser'
import OAuth2Server from 'oauth2-server'
import views from 'co-views'
import util from 'util'
import swig from 'swig'

let PORT = 3002
let tobi = {
  name: 'Infinite Team',
  species: 'Open Source Technology co,.ltd'
}


const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())



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



app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`)
})