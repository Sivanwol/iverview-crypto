import SetupSourceAccount from "../components/SetupSourceAccount"
import AccountView from "../components/AccountView"

export const UseSourceAccount = (sourceAccount, setSourceAccount) => {
  const isMatched = (sourceAccount && sourceAccount !== "")
  console.log(sourceAccount)
  return (<>
    {(!isMatched) ? <SetupSourceAccount setSourceAccount={setSourceAccount} /> :
      <AccountView setSourceAccount={setSourceAccount} />}
  </>)
}
