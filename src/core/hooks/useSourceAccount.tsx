import SetupSourceAccount from "../components/SetupSourceAccount"

export const UseSourceAccount = (sourceAccount, setSourceAccount) => {
  const isMatched = !!(sourceAccount && sourceAccount!=='')
  return (<>
    {(!isMatched)? <SetupSourceAccount setSourceAccount={setSourceAccount} />: <>We Golden</>}
  </>);
}
