import Head from 'next/head'
import {useAuth} from "@/lib/auth";
import {Box, Button, Code, Flex, Text} from "@chakra-ui/react";
import {LogoIcon} from "@/components/icons";

export default function Home() {
  const auth = useAuth();
  return (
    <Flex as="main" direction="column" align="center" justify="center" h="100vh">
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <LogoIcon boxSize={12} />
      {auth.user ?
        (
          <Button variant="link" mt={4} onClick={(e) => auth.signout()}>Sign Out</Button>
        ) :
        (
          <Button variant="link" mt={4} onClick={(e) => auth.signinWithGithub()}>Sign In</Button>
        )
      }
    </Flex>
  )
}
