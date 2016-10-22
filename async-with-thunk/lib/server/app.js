import express from 'express'

const app = new express()

app.use(express.static('public'))
app.use(express.static('bundle'))

app.listen(3000, () => {
  console.log('start on port 3000')
})
