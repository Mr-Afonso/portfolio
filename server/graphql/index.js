const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server-express')

const { portfolioQueries, portfolioMutations, userMutations } = require('./resolvers')
const { portfolioTypes } = require('./types')
const Portfolio = require('./models/Portfolio')
const User = require('./models/User')

exports.createApolloServer = () => {
  // construct a schema using GraphQL shema language
  const typeDefs = gql`
    ${portfolioTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }

    type Mutation{
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID

      signIn: String
      signUp: String
      signOut: String
    }
  `

  // the root provide a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...portfolioQueries
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations
    }
  }

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      models: {
        Portfolio: new Portfolio(mongoose.model('Portfolio')),
        User: new User()
      }
    })
  })

return apolloServer
}