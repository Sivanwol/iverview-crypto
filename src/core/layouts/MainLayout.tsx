import { CommonReactType } from "../CommonReactType"
import Head from "next/head"
import { Card, Container, Row } from "@nextui-org/react"
import { BlitzLayout } from "@blitzjs/next"
import { Spacer } from '@nextui-org/react';

const MainLayout: BlitzLayout<CommonReactType> = ({
                                          children,
                                          title
                                        }) => {
  return (<>
    <Head>
      <title>{title || "interview-cypto"}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Container xl>
      <Spacer y={1} />
      <Container>
        {children}
      </Container>
    </Container>
  </>)
}
export default MainLayout;
