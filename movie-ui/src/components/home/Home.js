import React, { useState, useEffect } from 'react'
import { Statistic, Icon, Grid, Container, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { contractApi } from '../misc/ContractApi'
import { handleLogError } from '../misc/Helpers'



function Home() {
  const [numberOfUsers, setNumberOfUsers] = useState(0)
  const [numberOfContracts, setNumberOfContracts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        let response = await contractApi.numberOfUsers()
        const users = response.data

        response = await contractApi.numberOfContracts()
        const contracts = response.data

        setNumberOfUsers(users)
        setNumberOfContracts(contracts)
      } catch (error) {
        handleLogError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <Segment basic style={{ marginTop: window.innerHeight / 2 }}>
        <Dimmer active inverted>
          <Loader inverted size='huge'>Loading</Loader>
        </Dimmer>
      </Segment>
    )
  }

  return (
    <Container text>
      <Grid stackable columns={2}>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Segment color='purple'>
              <Statistic>
                <Statistic.Value><Icon name='user' color='grey' />{numberOfUsers}</Statistic.Value>
                <Statistic.Label>Kullanıcı</Statistic.Label>
              </Statistic>
            </Segment>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Segment color='purple'>
              <Statistic>
                <Statistic.Value><Icon name='laptop' color='grey' />{numberOfContracts}</Statistic.Value>
                <Statistic.Label>Sözleşme</Statistic.Label>
              </Statistic>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
  <video autoPlay muted loop style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}>
          <source src={require('../home/video/Designer.mp4')} type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      </div>
      </Container>
      
    
  )
  
}

export default Home