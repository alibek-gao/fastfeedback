import Head from 'next/head'
import {useAuth} from "@/lib/auth";
import {Box, Button, Code, Flex, Text} from "@chakra-ui/react";
import {LogoIcon} from "@/components/icons";
import EmptyState from "@/components/EmptyState";

export default function Home() {
  const auth = useAuth();

  if(!auth.user) return 'Loading...';

  return <EmptyState />;
}
