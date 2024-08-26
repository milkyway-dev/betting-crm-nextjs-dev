import SearchBar from "@/component/ui/SearchBar";
import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie, getCurrentUser } from "@/utils/utils";
import { revalidatePath } from "next/cache";

async function getSubordinates(role: string) {
  const token = await getCookie();
  const user: any = await getCurrentUser();

  try {
    const response = await fetch(`${config.server}${user?.role === 'admin' ? `/api/subordinates?type=${role}` : `/api/subordinates/${user?.username}/subordinates?type=username`}`, {
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
    return all;
  } catch (error) {
    console.log("error:", error);
  } finally {
    revalidatePath("/");
  }
}


const page = async ({ params, searchParams }: any) => {
  const data = await getSubordinates(params?.role);
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

  const debounce = (func:any, wait:number) => {
    let timerId:any;
    return (...args:any) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, wait);
    };
  };

  const debouncedFunction = debounce(() => console.log('Helloasdasd World!'), 1000);

  if (debouncedFunction) {
    debouncedFunction();
  }
  
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
