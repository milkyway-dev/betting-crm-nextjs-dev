import Table from "@/component/ui/Table";
import { getAllTransactions } from "@/utils/action";
import {getCurrentUser } from "@/utils/utils";

const page = async ({ searchParams }: any) => {
  const user = await getCurrentUser()
  const data = await getAllTransactions(user,searchParams?.search);
  const fieldsHeadings = [
    "Amount",
    "Type",
    "Sender",
    "Receiver",
    "Date",
  ];  

  const fieldsData = [
    "amount",
    "type",
    "sender",
    "receiver",
    "date"
  ]

  return (
    <Table  fieldsHeadings={fieldsHeadings} fieldData = {fieldsData} data={data}  />
  );
};

export default page;
