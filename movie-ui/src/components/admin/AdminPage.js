import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import AdminTab from './AdminTab'
import { contractApi } from '../misc/ContractApi'
import { handleLogError } from '../misc/Helpers'

function AdminPage() {
  const Auth = useAuth()
  const user = Auth.getUser()
  const isAdmin = user.data.rol[0] === 'ADMIN'

  const [users, setUsers] = useState([])
  const [contracts, setContracts] = useState([])
  const [conprice, setConPrice] = useState('')
  const [conName, setConName] = useState('')
  const [conFile, setConFile] = useState('')
  const [contractTextSearch, setContractTextSearch] = useState('')
  const [userUsernameSearch, setUserUsernameSearch] = useState('')
  const [isUsersLoading, setIsUsersLoading] = useState(false)
  const [isContractsLoading, setIsContractsLoading] = useState(false)

  useEffect(() => {
    handleGetUsers()
    handleGetContracts()
  }, [])

  const handleInputChange = (e, { name, value }) => {
    if (name === 'conprice') {
      setConPrice(value)
    } else if (name === 'conName') {
      setConName(value)
    } else if (name === 'conFile') {
      setConFile(value)
    } else if (name === 'contractTextSearch') {
      setContractTextSearch(value)
    } else if (name === 'userUsernameSearch') {
      setUserUsernameSearch(value)
    }
  }

  const handleGetUsers = async () => {
    try {
      setIsUsersLoading(true)
      const response = await contractApi.getUsers(user)
      setUsers(response.data)
    } catch (error) {
      handleLogError(error)
    } finally {
      setIsUsersLoading(false)
    }
  }

  const handleDeleteUser = async (username) => {
    try {
      await contractApi.deleteUser(user, username)
      await handleGetUsers()
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleSearchUser = async () => {
    try {
      const response = await contractApi.getUsers(user, userUsernameSearch)
      const data = response.data
      const users = Array.isArray(data) ? data : [data]
      setUsers(users)
    } catch (error) {
      handleLogError(error)
      setUsers([])
    }
  }

  const handleGetContracts = async () => {
    try {
      setIsContractsLoading(true)
      const response = await contractApi.getContracts(user)
      setContracts(response.data)
    } catch (error) {
      handleLogError(error)
    } finally {
      setIsContractsLoading(false)
    }
  }

  const handleDeleteContract = async (price) => {
    try {
      await contractApi.deleteContract(user, price)
      await handleGetContracts()
    } catch (error) {
      handleLogError(error)
    }
  }

  const handleAddContract = async () => {
    const trimmedPrice = conprice.trim()
    const trimmedName = conName.trim()
    const trimmedFile = conFile.trim()
    

    if (!(trimmedPrice && trimmedName)) {
      return
    }

    const contract = { price: trimmedPrice, name: trimmedName, file: trimmedFile }

    try {
      await contractApi.addContract(user, contract)
      clearContractForm()
      await handleGetContracts()
    } catch (error) {
      handleLogError(error)
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

  const clearContractForm = () => {
    setConPrice('')
    setConName('')
    setConFile('')
  }

  if (!isAdmin) {
    return <Navigate to='/' />
  }

  return (
    <Container>
      <AdminTab
        isUsersLoading={isUsersLoading}
        users={users}
        userUsernameSearch={userUsernameSearch}
        handleDeleteUser={handleDeleteUser}
        handleSearchUser={handleSearchUser}
        isContractsLoading={isContractsLoading}
        contracts={contracts}
        conprice={conprice}
        conName={conName}
        conFile={conFile}
        contractTextSearch={contractTextSearch}
        handleAddContract={handleAddContract}
        handleDeleteContract={handleDeleteContract}
        handleSearchContract={handleSearchContract}
        handleInputChange={handleInputChange}
      />
    </Container>
  )
}

export default AdminPage