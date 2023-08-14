import React from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'

function ContractForm({ conprice, conName, conFile, handleInputChange, handleAddContract }) {


  const createBtnDisabled = conprice.trim() === '' || conName.trim() === '' 
  return (
    <Form onSubmit={handleAddContract}>
      <Form.Group>
        <Form.Input
          name='conprice'
          placeholder='Cayma Bedeli'
          value={conprice}
          onChange={handleInputChange}
        />
        <Form.Input
          name='conName'
          placeholder='Şirket İsmi'
          value={conName}
          onChange={handleInputChange}
        />
  
        <Form.Input
          name='conFile'
          placeholder='Belge'
          value={conFile}
          onChange={handleInputChange}
        />
       <Button icon labelPosition='right' disabled={createBtnDisabled}>
          Oluştur<Icon name='add' />
        </Button>
      </Form.Group>
    </Form>
  )
}

export default ContractForm
