import React, { Fragment } from 'react'
import { Button, Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import ContractForm from './ContractForm'

function ContractTable({ contracts, conprice, conName, conFile, contractTextSearch, handleInputChange, handleAddContract, handleDeleteContract, handleSearchContract }) {
  let contractList
  if (contracts.length === 0) {
    contractList = (
      <Table.Row key='no-contract'>
        <Table.Cell collapsing textAlign='center' colSpan='5'>No contract</Table.Cell>
      </Table.Row>
    )
  } else {
    contractList = contracts.map(contract => {
      return (
        <Table.Row key={contract.price}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              onClick={() => handleDeleteContract(contract.price)}
            />
          </Table.Cell>
          <Table.Cell>
            { contract.file ?
            <Image src={contract.file} size='tiny' bordered rounded /> :
            <Image src='/images/contract-poster.jpg' size='tiny' bordered rounded />
            }
          </Table.Cell>
          <Table.Cell>{contract.price}</Table.Cell>
          <Table.Cell>{contract.name}</Table.Cell>
          <Table.Cell>{contract.createdAt}</Table.Cell>
   
        </Table.Row>
      )
    })
  }

  return (
    <Fragment>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='5'>
            <Form onSubmit={handleSearchContract}>
              <Input
                action={{ icon: 'search' }}
                name='contractTextSearch'
                placeholder='Ara'
                value={contractTextSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <ContractForm
              conprice={conprice}
              conName={conName}
              conFile={conFile}
              handleInputChange={handleInputChange}
              handleAddContract={handleAddContract}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}/>
            <Table.HeaderCell width={4}>Belge</Table.HeaderCell>
            <Table.HeaderCell width={3}>Cayma Bedeli</Table.HeaderCell>
            <Table.HeaderCell width={4}>Şirket İsmi</Table.HeaderCell>
            <Table.HeaderCell width={4}>Eklenme Tarihi</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {contractList}
        </Table.Body>
      </Table>
    </Fragment>
  )
}

export default ContractTable