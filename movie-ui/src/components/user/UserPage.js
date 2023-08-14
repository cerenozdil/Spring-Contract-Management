import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import ContractList from './ContractList'
import { useAuth } from '../context/AuthContext'
import { contractApi } from '../misc/ContractApi'
import { handleLogError } from '../misc/Helpers'

function UserPage() {
  const Auth = useAuth()
  const user = Auth.getUser()
  const isUser = user.data.rol[0] === 'USER'

  const [contracts, setContracts] = useState([])
  const [contractTextSearch, setContractTextSearch] = useState('')
  const [isContractsLoading, setIsContractsLoading] = useState(false)

  useEffect(() => {
    handleGetContracts()
  }, [])

  const handleInputChange = (e, { name, value }) => {
    if (name === 'contractTextSearch') {
      setContractTextSearch(value)
    }
  }

  const handleGetContracts = async () => {
    setIsContractsLoading(true)
    try {
      const response = await contractApi.getContracts(user)
      setContracts(response.data)
    } catch (error) {
      handleLogError(error)
    } finally {
      setIsContractsLoading(false)
    }
  }

  const handleSearchContract = async () => {
    try {
      const response = await contractApi.getContracts(user, contractTextSearch)
      const contracts = response.data
      setContracts(contracts)
    } catch (error) {
      handleLogError(error)
      setContracts([])
    }
  }

  if (!isUser) {
    return <Navigate to='/' />
  }

  return (
    <Container>
      <ContractList
        isContractsLoading={isContractsLoading}
        contractTextSearch={contractTextSearch}
        contracts={contracts}
        handleInputChange={handleInputChange}
        handleSearchContract={handleSearchContract}
      />
    </Container>
  )
}

export default UserPage