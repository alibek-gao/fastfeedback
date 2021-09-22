import React from 'react'
import {
  Heading,
  Text,
  Button,
  Flex
} from '@chakra-ui/react'
import DashboardShell from "@/components/DashboardShell";
import AddSiteModal from "@/components/AddSiteModal";

const EmptyState = () => (
  <DashboardShell>
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading as="h3" size="lg" mb={2}>You haven&apos;t added any sites.</Heading>
      <Text mb={4}>Welcome! Let&apos;s get started.</Text>
      <AddSiteModal />
    </Flex>
  </DashboardShell>
)

export default EmptyState;