import React, { useState, useEffect } from "react"
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_PORTFOLIOS } from '@/apollo/queries'
import axios from 'axios'
import PortfolioCard from '@/components/portfolios/PortfolioCard'
import Link from 'next/link'

const graphDeletePortfolio = (id) => {
  const query = `
  mutation DeletePortfolio {
    deletePortfolio(id: "${id}")
  }`

  return axios.post('http://localhost:3333/graphql', { query: query })
    .then(({ data: graph }) => graph.data)
    .then(data => data.deletePortfolio)
}

const graphUpdatePortfolio = (id) => {
  const query = `
    mutation UpdatePortfolio {
      updatePortfolio(id: "${id}", input: {
        title: "Job in Netcentric - test 333"
          company: "Netcentric - test"
    
      }) {
        title
        description
        jobTitle
        startDate
        endDate
      }
    }`

  return axios.post('http://localhost:3333/graphql', { query: query })
    .then(({ data: graph }) => graph.data)
    .then(data => data.updatePortfolio)
}

const graphCreatePortfolio = () => {
  const query = `
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
    }`

  return axios.post('http://localhost:3333/graphql', { query: query })
    .then(({ data: graph }) => graph.data)
    .then(data => data.createPortfolio)
}

const Portfolios = () => {

  const [portfolios, setPortfolios] = useState([])
  const [getPortfolios, { loading, data }] = useLazyQuery(GET_PORTFOLIOS);

  useEffect(() => {
    getPortfolios()
  }, [])

  if (data && data.portfolios.length > 0 && portfolios.length === 0) {
    setPortfolios(data.portfolios)
  }

  if (loading) return 'Loading...';



  const createPortfolio = async () => {
    const newPortfolio = await graphCreatePortfolio()
    const newPortfolios = [...portfolios, newPortfolio]
    setPortfolios(newPortfolios)
  }

  const updatePortfolio = async (id) => {
    const updatedPortfolio = await graphUpdatePortfolio(id)
    const index = portfolios.findIndex(portfolio => portfolio._id === id)
    const newPortfolios = portfolios.slice()
    newPortfolios[index] = updatedPortfolio
    setPortfolios(newPortfolios)
  }

  const deletePortfolio = async (id) => {
    const deletedId = await graphDeletePortfolio(id)
    const index = portfolios.findIndex(portfolio => portfolio._id === deletedId)
    const newPortfolios = portfolios.slice()
    newPortfolios.splice(index, 1)
    setPortfolios(newPortfolios)
  }

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button className="btn btn-primary" onClick={createPortfolio}>
          Create Portfolio
        </button>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="col-md-4">
              <Link
                href='/portfolios/[id]'
                as={`/portfolios/${portfolio._id}`}>
                <a className="card-link">
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
              <button className="btn btn-warning" onClick={() => updatePortfolio(portfolio._id)}>
                Update Portfolio
        </button>
              <button className="btn btn-danger" onClick={() => deletePortfolio(portfolio._id)}>
                Delete Portfolio
        </button>
            </div>
          ))
          }
        </div>
      </section>
    </>
  )
}

export default Portfolios;
