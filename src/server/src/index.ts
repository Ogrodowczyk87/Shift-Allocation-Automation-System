import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import { typeDefs } from './schema/typeDefs.js'
import { resolvers } from './schema/resolvers.js'
import { db } from './db/client.js'

const app = express()
const port = Number(process.env.PORT) || 4000

const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await apolloServer.start()

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true)
          return
        }

        callback(new Error('Not allowed by CORS'))
      },
    })
  )

  app.use(express.json())

  app.get('/health', async (_req, res) => {
    try {
      await db.query('SELECT 1')
      res.json({ status: 'ok' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ status: 'db_error' })
    }
  })

  app.use('/graphql', expressMiddleware(apolloServer))

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
    console.log(`GraphQL available at http://localhost:${port}/graphql`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server', error)
  process.exit(1)
})
