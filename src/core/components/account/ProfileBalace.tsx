import React, { FC } from "react"
import { Loading, Text } from "@nextui-org/react"
import { useAccount, useBalance } from "wagmi"

const ProfileBalance: FC = () => {
  const { address } = useAccount()
  const { data, isError, isLoading } = useBalance({
    address
  })
  if (isLoading) return <Loading color="secondary" />
  if (isError) return <Text color="error">Error fetching balance</Text>
  return (<>
    <Text h4>Balance</Text>
    <Text>{data?.formatted} {data?.symbol}</Text>
  </>)
}
export default ProfileBalance
