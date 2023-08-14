import React from 'react'
import { Tab } from 'semantic-ui-react'
import UserTable from './UserTable'
import ContractTable from './ContractTable'

function AdminTab(props) {
  const { handleInputChange } = props
  const { isUsersLoading, users, userUsernameSearch, handleDeleteUser, handleSearchUser } = props
  const { isContractsLoading, contracts, conprice, conName, conFile, contractTextSearch, handleAddContract, handleDeleteContract, handleSearchContract } = props

  const panes = [
    {
      menuItem: { key: 'users', icon: 'users', content: 'Kullanıcı' },
      render: () => (
        <Tab.Pane loading={isUsersLoading}>
          <UserTable
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleInputChange={handleInputChange}
            handleDeleteUser={handleDeleteUser}
            handleSearchUser={handleSearchUser}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'contracts', icon: 'file alternate', content: 'Sözleşme' },
      render: () => (
        <Tab.Pane loading={isContractsLoading}>
          <ContractTable
            contracts={contracts}
            conprice={conprice}
            conName={conName}
            conFile={conFile}
            contractTextSearch={contractTextSearch}
            handleInputChange={handleInputChange}
            handleAddContract={handleAddContract}
            handleDeleteContract={handleDeleteContract}
            handleSearchContract={handleSearchContract}
          />
        </Tab.Pane>
      )
    }
  ]

  return (
    <Tab menu={{ attached: 'top' }} panes={panes} />
  )
}

export default AdminTab