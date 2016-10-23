import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'

import routes from '../share/routes'
import createConfigureStore from '../share/store'

const app = new express()
const store = createConfigureStore()

app.use(express.static('public'))
app.use(express.static('bundle'))

const renderFullPage = (html, state) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>server-side rendering with asynchronous API</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${serialize(state)};
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `
}

app.use((req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      Promise.all(renderProps.components.map(c => c.fetchData ?
                                                c.fetchData(store.dispatch) :
                                                Promise.resolve('no fetching')))
                                       .then(() => {
                                         const html = renderToString(
                                           <Provider store={store}>
                                             <RouterContext {...renderProps} />
                                           </Provider>
                                         )
                                         res.send(renderFullPage(html, store.getState()))
                                       })
                                       .catch((err) => res.end(err.toString()))
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(3000, () => {
  console.log('start on port 3000')
})
