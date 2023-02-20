import React, { FC } from "react"
import { Loading, Text } from "@nextui-org/react"
import { useAccount, useBalance } from "wagmi"

const ProfileBalance: FC = () => {
  const { address } = useAccount()
  const { data, isError, isLoading } = useBalance({
    address,
    token: "0xE72c69b02B4B134fb092d0D083B287cf595ED1E6"
  })
  if (isLoading) return <Loading color="secondary" />
  if (isError) return <Text color="error">Error fetching balance</Text>
  return (<>
    <Text h4>Balance</Text>
    <Text>{data?.formatted} {data?.symbol}</Text>
  </>)
}
export default ProfileBalance
