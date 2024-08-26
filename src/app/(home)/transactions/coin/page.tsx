import Header from "@/component/common/Header";
import SearchBar from "@/component/ui/SearchBar";
import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie, getCurrentUser } from "@/utils/utils";
import { revalidatePath } from "next/cache";



async function getAllTransactions(user: any) {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}${user?.role=='admin'?`/api/transactions/`:`/api/transactions/${user?.username}/subordinate?type=username`}`, {
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



const page = async () => {
  const user = await getCurrentUser()
  const data = await getAllTransactions(user);
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
    <>
      <div
        className="md:relative"
      >
        {/* <div className="md:absolute md:right-[2%] md:-top-[7%] pb-3 md:pb-0 md:inline-block">
          <SearchBar />
        </div> */}
        <Table  fieldsHeadings={fieldsHeadings} fieldData = {fieldsData} data={data}  />
      </div>
    </>
  );
};

export default page;
