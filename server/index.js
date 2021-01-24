const express = require('express')
const next = require('next')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const port = parseInt(process.env.PORT, 10) || 3333
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const data = {
  portfolios: [
    {
      _id: 'csc3234vsd',
      title: 'Job in USA',
      content: 'It was a very nice experience',
      jobTitle: 'Chef',
      daysOfExperience: 100,
      isCurrentEmployed: false
    },
    {
      _id: 'zxczxc35',
      title: 'Job in Portugal',
      content: 'It was a very good experience',
      jobTitle: 'Developer',
      isCurrentEmployed: true
    },
    {
      _id: 'dfgdf566',
      title: 'Job in UK',
      content: 'It was a very solid experience',
      jobTitle: 'Manager',
      daysOfExperience: 30,
      isCurrentEmployed: false
    },
  ]
}

app.prepare().then(() => {
  const server = express()

  // construct a schema using GraphQL shema language
  const schema = buildSchema(`
    type Portfolio {
      _id: ID!
      title: String
      content: String
      jobTitle: String
      daysOfExperience: Int
      isCurrentEmployed: Boolean
    }

    type Query {
      hello: String
      portfolio: Portfolio
      portfolios: [Portfolio]
    }
  `)

  // the root provide a resolver for each API endpoint
  const root = {
    hello: () => {
      return 'Hello World!'
    },
    portfolio: () => {
      return data.portfolios[0]
    },
    portfolios: () => {
      return data.portfolios
    }
  }

  server.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }))

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
