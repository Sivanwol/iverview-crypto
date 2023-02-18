import React, { FC } from "react"
import { Loading, Text } from "@nextui-org/react"
import { useBlockNumber } from "wagmi"

const ProfileBlock: FC = () => {
  const { data, isError, isLoading } = useBlockNumber()
  if (isLoading) return <Loading color="secondary" />
  if (isError) return <Text color="error">Error fetching block</Text>
  return (<>
    <Text h4>Block number</Text>
    <Text>{data}</Text>
  </>)
}
export default ProfileBlock
