import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RouterContext } from 'react-router'

import routes from '../share/routes'
import createConfigureStore from '../share/store'

const app = new express()

app.use(express.static('bundle'))

const renderFullPage = (html, state) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(state)};
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `
}

app.use((req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).end(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store = createConfigureStore()
      Promise
        .all(renderProps.components.map(c => c.fetchData ?
                                           c.fetchData(store.dispatch) :
                                           Promise.resolve(false)))
        .then((r) => {
          const html = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          )
          res.end(renderFullPage(html, Object.assign({}, store.getState())))
        })
        .catch((err) => {
          console.error(err)
          res.end(err.toString())
        })
    } else {
      res.status(404).end('Not found')
    }
  })
})

app.listen(3000, () => {
  console.log('start on port 3000')
})
