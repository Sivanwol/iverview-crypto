import { Button, Card, Container, Grid, Input, Spacer, Text, Tooltip } from "@nextui-org/react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import Web3 from "web3"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"

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

  const {
    register, handleSubmit,
    formState: { errors }
  } = useForm<{ sourceAccount: string }>({
    resolver: joiResolver(schema)
  })
  const onSubmit = handleSubmit((data) => {
    if (data.sourceAccount != "") {
      setSourceAccount(data.sourceAccount)
    }
  })

  return (<>
    <Container md>

      <Card>
        <Card.Body>

          <form onSubmit={onSubmit}>
            <Grid.Container gap={2} justify="center">
              <Grid xs={6}>
                <Text>Account Source</Text>
              </Grid>
              <Grid xs={6}>
                <Input {...register("sourceAccount")}
                       clearable
                       underlined
                       helperText={"ETH Source Address from where token will be sent "}
                       width="250px" status="default" color="primary"
                       labelLeft="ADR " placeholder="0xfb0a9d38c4dc5...9ce21aa0e5c0c586b" />
              </Grid>
            </Grid.Container>
            <Spacer y={1} />
            {errors?.sourceAccount &&
              <Grid.Container gap={2} justify="center">
                <Grid xs={12} sm>
                  <Text color="error" size="$xs">{errors?.sourceAccount?.message}</Text>
                </Grid>
              </Grid.Container>
            }
            <Grid.Container gap={2} justify="center">
              <Grid xs={12} direction={"row-reverse"} sm>
                <Tooltip content={"Setup Source Account"} rounded placement={"bottomEnd"}>
                  <Button type="submit" auto color="primary" rounded css={{
                    width: 150,
                    align: "right"
                  }}>
                    Save
                  </Button>
                </Tooltip>
              </Grid>
            </Grid.Container>
          </form>
        </Card.Body>
      </Card>
    </Container>
  </>)
}
export default SetupSourceAccount
