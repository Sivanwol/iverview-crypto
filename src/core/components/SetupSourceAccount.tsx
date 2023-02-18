import { Button, Card, Container, Grid } from "@nextui-org/react"
import { FC } from "react"
import Web3 from "web3"
import Joi from "joi"
import { useConnect } from "wagmi"

const sourceAccountError = "Source Address is not valid address"
const schema = Joi.object({
  sourceAccount: Joi.string()
    .required()
    .min(42)
    .max(64)
    .custom((value, helper) => Web3.utils.isAddress(value) ? value : "")
    .label("Source Account")
})

const SetupSourceAccount: FC<{setSourceAccount: any}> = ({
                                                           setSourceAccount
                                                 }) => {

  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const onConnectedHook = (connector) => {
    connect({ connector })
    setSourceAccount(1)
  }
  return (<>
    <Container md>

      <Card>
        <Card.Body>
          <Grid.Container gap={2} justify="center">
            {connectors.map((connector) => (<>
                <Grid xs={4}
                      key={connector.id}>
                  <Button
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => onConnectedHook(connector)}>
                    {connector.name}
                  </Button>
                </Grid>
                {!connector.ready && setSourceAccount("")}
                {isLoading && connector.id === pendingConnector?.id && setSourceAccount(1)}
              </>
            ))}
          </Grid.Container>
          <div>
            {error && <div>{error.message}</div>}
          </div>
        </Card.Body>
      </Card>
    </Container>
  </>)
}
export default SetupSourceAccount
