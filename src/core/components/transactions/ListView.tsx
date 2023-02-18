import { FC, useState } from "react"
import { Table, Text } from "@nextui-org/react"
import { useAccount, useWatchPendingTransactions } from "wagmi"

const ListView: FC<{}> = ({}) => {
  const { address } = useAccount()
  const [transactions, setTransactions] = useState<{ transaction, amount }[]>([])

  useWatchPendingTransactions({
    chainId: 1,
    listener: (transaction) => {
      const tTransaction = transaction.hash?.toString()
      const obj = { transaction: tTransaction, amount: transaction.value }
      const hasElm = transactions.find(t => t.transaction === tTransaction)
      if (!hasElm) {
        transactions.push(obj)
        setTransactions(transactions)
      }
    }
  })
  if (transactions.length === 0) return <Text>NO Paddning Transcations</Text>
  return <><Table
    aria-label="Padding Transaction List"
    css={{
      height: "auto",
      minWidth: "100%"
    }}
  >
    <Table.Header>
      <Table.Column>Hash</Table.Column>
      <Table.Column>Amount</Table.Column>
    </Table.Header>
    <Table.Body>
      {transactions.map((trans, idx) => {
        return <Table.Row key="{idx}">
          <Table.Cell>{trans.transaction}</Table.Cell>
          <Table.Cell>{trans.amount}</Table.Cell>
        </Table.Row>
      })}
    </Table.Body>
  </Table>
  </>
}

export default ListView
