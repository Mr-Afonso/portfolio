import { gql } from 'apollo-boost';

export const GET_PORTFOLIO = gql`
    query Portfolio($id: ID) {
      portfolio(id: $id) {
        _id
        title
        company
        companyWebsite
        location
        jobTitle
        description
        startDate
        endDate
      }
    }
`;

export const GET_PORTFOLIOS = gql`
  query Portfolios {
        portfolios {
          _id
          title
          company
          companyWebsite
          location
          jobTitle
          description
          startDate
          endDate
        }
      }
`;

export const CREATE_PORTFOLIO = gql`
   mutation CreatePortfolio {
      createPortfolio(input: {
        title: "Just a Test"
        company: "Just a Test"
        companyWebsite: "Just a Test"
        location: "Just a Test"
        jobTitle: "Just a Test"
        description: "Just a Test"
        startDate: "12/12/2012"
        endDate: "12/12/2012"
      }) {
        _id
        title
        company
        description
        companyWebsite
        location
        jobTitle
        startDate
        endDate
      }
    }
`

export const UPDATE_PORTFOLIO = gql`
mutation UpdatePortfolio($id: ID) {
  updatePortfolio(id: $id, input: {
    title: "Job in Netcentric - test 333"
    company: "Netcentric - test"
    companyWebsite: "Just a Test"
    location: "Just a Test"
    jobTitle: "Just a Test"
    description: "Just a Test"
    startDate: "12/12/2012"
    endDate: "12/12/2012"

  }) {
    _id
    title
    company
    description
    companyWebsite
    location
    jobTitle
    startDate
    endDate
  }
}`

export const DELETE_PORTFOLIO = gql`
mutation DeletePortfolio($id: ID) {
  deletePortfolio(id: $id)
}`
