import React from 'react'
import { Grid, Header, Form, Icon, Image, Input, Item, Segment } from 'semantic-ui-react'

function ContractList({ isContractsLoading, contractTextSearch, contracts, handleInputChange, handleSearchContract }) {
  let contractList
  if (contracts.length === 0) {
    contractList = <Item key='no-contract'>Sözleşme Bulunamadı</Item>
  } else {
    contractList = contracts.map(contract => {
      return (
        <Item key={contract.price}>
          <Image src={contract.file} size='small' bordered rounded />
          <Item.Content>
            <Item.Header>{contract.name}</Item.Header>
            <Item.Meta>{contract.price}</Item.Meta>
            <Item.Description>
              <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Item.Description>
          </Item.Content>
        </Item>
      )
    })
  }

  return (
    <Segment loading={isContractsLoading} color='purple'>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='3'>
            <Header as='h2'>
              <Icon name='file alternate' />
              <Header.Content>Sözleşme</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
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
        </Grid.Row>
      </Grid>
      <Item.Group divided unstackable relaxed link>
        {contractList}
      </Item.Group>
    </Segment>
  )
}

export default ContractList