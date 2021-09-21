import React from 'react'
import {
  Heading,
  Text,
  Button,
  Flex
} from '@chakra-ui/react'
import DashboardShell from "@/components/DashboardShell";

const FreePlanEmptyState = () => (
  <DashboardShell>
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={8}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading>Get feedback on your site instantly.</Heading>
      <Text>Start today, than grow with us </Text>
      <Button variant="solid" size="md">
        Upgrade to starter
      </Button>
    </Flex>
  </DashboardShell>
)

export default FreePlanEmptyState;