import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie, getCurrentUser } from "@/utils/utils";
import { revalidatePath } from "next/cache";



async function getAllTransactions(user: any, searchString: string) {
  let transaction: string = `/api/transactions`;
  if (searchString?.length>0) {
    transaction += `&search=${encodeURIComponent(String(searchString))}`;
  }
  let transaction_subordinates: string = `/api/transactions/${user?.username}/subordinate?type=username`;
  if (searchString?.length>0) {
    transaction_subordinates += `&search=${encodeURIComponent(String(searchString))}`;
  }
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}${user?.role=='admin'?transaction:transaction_subordinates}`, {
      method:"GET",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
        Cookie: `userToken=${token}`,
      }
    })
     
    if(!response.ok){
      const error = await response.json();
      return {error:error.message};
    }

    const data = await response.json();
    const transactions = data;
    return transactions;
  } catch (error) {
  }finally{
    revalidatePath("/");
  }
}



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
