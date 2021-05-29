import app from './app'
import dotenv from 'dotenv'
import MeliApi from './libs/meli'

dotenv.config()

MeliApi.setup()

app.listen(process.env.PORT, () => {
  console.info("Listening on", process.env.PORT)
})
