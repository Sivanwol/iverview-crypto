import MainLayout from "src/core/layouts/MainLayout"
import { BlitzPage } from "@blitzjs/next"
import createPersistedState from "use-persisted-state"
import { UseSourceAccount } from "../core/hooks/useSourceAccount"
import { useState } from "react"

const useSourceAccountState = createPersistedState('sourceAccount');

const Home: BlitzPage = () => {
  const [sourceAccount, setSourceAccount] = useState()
  const renderer = UseSourceAccount(sourceAccount, setSourceAccount)
  return (
    <MainLayout title="Home">
      {renderer}
    </MainLayout>
  )
}

export default Home
