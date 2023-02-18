import { FC } from "react"
import { Table } from "@nextui-org/react"
import { useAccount } from "wagmi"

const ListView: FC<{}> = ({}) => {
  const { address } = useAccount()
  return <><Table
    aria-label="Transaction List"
    css={{
      height: "auto",
      minWidth: "100%"
    }}
  >
    <Table.Header>
      <Table.Column>Dest.</Table.Column>
      <Table.Column>Amount</Table.Column>
    </Table.Header>
    <Table.Body>
      <Table.Row key="1">
        <Table.Cell>Tony Reichert</Table.Cell>
        <Table.Cell>CEO</Table.Cell>
      </Table.Row>
      <Table.Row key="2">
        <Table.Cell>Zoey Lang</Table.Cell>
        <Table.Cell>Technical Lead</Table.Cell>
      </Table.Row>
      <Table.Row key="3">
        <Table.Cell>Jane Fisher</Table.Cell>
        <Table.Cell>Senior Developer</Table.Cell>
      </Table.Row>
      <Table.Row key="4">
        <Table.Cell>William Howard</Table.Cell>
        <Table.Cell>Community Manager</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  </>
}

export default ListView
