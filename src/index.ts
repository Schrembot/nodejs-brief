import { setupServer } from './server'

;(async () => {
  const app = await setupServer()
  if (app === null) process.exit()

  app.listen(process.env.LEAGUE_SERVER_PORT, () => console.log(`Server running on port: ${process.env.LEAGUE_SERVER_PORT}`))
})()
