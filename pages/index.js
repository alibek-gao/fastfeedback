import Head from 'next/head'
import {useAuth} from "@/lib/auth";
import {Button, Code, Heading, Text} from "@chakra-ui/react";

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <main>
        <Heading>Fast Feedback</Heading>

        <Text>Current user: <Code>{auth.user?.name ?? 'None'}</Code></Text>
        {auth.user ?
          <Button onClick={(e) => auth.signout()}>Sign Out</Button> :
          <Button onClick={(e) => auth.signinWithGithub()}>Sign In</Button>
        }
      </main>
    </div>
  )
}
