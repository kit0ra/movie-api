import express from 'express'

const app = express()

app.use(express.json())

// Define some routes (example)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
