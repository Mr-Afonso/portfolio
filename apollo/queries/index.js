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
        description
        jobTitle
        startDate
        endDate
      }
    }
`
