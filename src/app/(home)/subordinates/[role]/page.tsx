import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie, getCurrentUser } from "@/utils/utils";
import { revalidatePath } from "next/cache";

async function getSubordinates(role: string,searchString:string) {
  const token = await getCookie();
  const user: any = await getCurrentUser();
  let url: string = `/api/subordinates?type=${role}`;
  if (searchString?.length>0) {
    url += `&search=${encodeURIComponent(String(searchString))}`;
  }

  let subordinatesurl: string = `/api/subordinates/${user?.username}/subordinates?type=username`;
  if (searchString?.length>0) {
    subordinatesurl += `&search=${encodeURIComponent(String(searchString))}`;
  }
  
  try {
    const response = await fetch(`${config.server}${user?.role === 'admin' ? url : subordinatesurl}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      }
    })


    if (!response.ok) {
      const error = await response.json();
      console.log(error);

      return { error: error.message };
    }

    const data = await response.json();
    const all = data;
  console.log(data,"admin ka data")

    return all;
  } catch (error) {
    console.log("error:", error);
  } finally {
    revalidatePath("/");
  }
}


const page = async ({ params, searchParams }: any) => {
  const data = await getSubordinates(params?.role,searchParams?.search);

  const fieldsHeadings = [
    "Username",
    "Status",
    "Credits",
    "Role",
    "Created At",
    "Actions",
  ];

  const fieldsData = [
    "username",
    "status",
    "credits",
    "role",
    "createdAt",
    "actions"
  ]
  
  return (
    <>
      <div
        className="col-span-12 lg:col-span-9 xl:col-span-8"
      >
        <Table fieldsHeadings={fieldsHeadings} fieldData={fieldsData} data={data} Page={'Player'} />
      </div>
    </>
  );
};

export default page;
