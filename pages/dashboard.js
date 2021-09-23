import Head from 'next/head'
import useSWR from 'swr'
import {Box, Button, Code, Flex, Text} from "@chakra-ui/react";
import {useAuth} from "@/lib/auth";
import {LogoIcon} from "@/components/icons";
import EmptyState from "@/components/EmptyState";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import DashboardShell from "@/components/DashboardShell";
import fetcher from "@/utils/fetcher";
import SiteTable from "@/components/SiteTable";

export default function Home() {
  const { user } = useAuth();
  const { data } = useSWR('/api/sites', fetcher);

  if(!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton/>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.sites.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
