import MainLayout from "src/core/layouts/MainLayout"
import { BlitzPage } from "@blitzjs/next"
import createPersistedState from 'use-persisted-state';
import { UseSourceAccount } from "../core/hooks/useSourceAccount"

const useSourceAccountState = createPersistedState('sourceAccount');

const Home: BlitzPage = () => {
  const [sourceAccount, setSourceAccount] = useSourceAccountState('');
  const renderer = UseSourceAccount(sourceAccount, setSourceAccount);
  return (
    <MainLayout title="Home">
      {renderer}
    </MainLayout>
  )
}

export default Home
