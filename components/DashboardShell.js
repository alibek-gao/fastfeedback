import React from 'react'
import {
  Flex,
  Link,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Box,
  Text,
  Button
} from '@chakra-ui/react'
import {LogoIcon} from "@/components/icons";
import {useAuth} from "@/lib/auth";
import AddSiteModal from "@/components/AddSiteModal";

const DashboardShell = ({children}) => {
  const { user, signout } = useAuth();
  return (
    <Flex flexDirection="column" height="100vh">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="white"
        py={4}
        px={8}
      >
        <Stack spacing={4} isInline alignItems="center">
          <LogoIcon boxSize={8} color="black"/>
          <Link>Sites</Link>
          <Link>Feedback</Link>
        </Stack>
        <Flex alignItems="center">
          {user && <Button variant="link" mr={4} onClick={(e) => signout()}>Sign Out</Button>}
          <Avatar size="sm" src={user?.photoURL}/>
        </Flex>
      </Flex>
      <Flex
        h="100%"
        backgroundColor="gray.100"
        justifyContent="center"
        p={8}
      >
        <Flex flexDirection="column" maxWidth="800px" w="100%">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink color="gray.700" fontSize="sm">Sites</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex justify="space-between">
            <Heading mb={4}>Sites</Heading>
            <AddSiteModal>+ Add Site</AddSiteModal>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default DashboardShell