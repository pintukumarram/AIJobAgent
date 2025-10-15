// import DashboardLayout from "@/components/DashboardLayout";
import DashboardLayout from "../components/DashboardLayout";
import DashboardPage from "../components/DashboardPage";
import Head from "next/head";

export default function Home() {
  return (
<>
  <DashboardLayout>
    <DashboardPage />
  </DashboardLayout>
  <Head>
    <link rel="icon" href="/favicon.ico" />
  </Head>
</>
  );
}
