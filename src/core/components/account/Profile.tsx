import React, { FC } from "react"
import { Avatar, Container, Grid, Spacer, Text, Tooltip } from "@nextui-org/react"
import { useAccount, useEnsAvatar, useEnsName } from "wagmi"
import ProfileBalance from "./ProfileBalace"
import { Ellipsis } from "react-simple-ellipsis"
import ProfileBlock from "./ProfileBlock"

const Profile: FC = () => {

  const { address, connector } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  console.log(`ensName - ${ensName}`)
  // @ts-ignore
  const adr: string = address?.toString()
  return (<>
    <Container md>
      <Grid.Container gap={2} justify="center">
        <Grid xs={8}>
          <Container>
            <Text h4>Account</Text>
            <Text size="$xs">{ensName || "No Supported"}</Text>
            <Text size="$xs">Connected to {connector?.name}</Text>
            <Spacer y={0.5} />
            <Text size="$xs">
              <Tooltip content={adr}>
                <Ellipsis
                  ellipsis="..."
                  text={adr}
                  limit={15}
                  label=""
                  id={adr}
                />
              </Tooltip>
              <Spacer y={0.5} />
            </Text>
            <ProfileBalance />
            <ProfileBlock />
          </Container>
          <Container>
            {ensAvatar &&
              <Avatar
                squared
                src={ensAvatar?.toString()} />}
          </Container>
        </Grid>
      </Grid.Container>
    </Container>
  </>)
}
export default Profile
