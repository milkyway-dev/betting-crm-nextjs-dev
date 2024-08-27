import Table from "@/component/ui/Table";
import { getSubordinates } from "@/utils/action";

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
  
  return (<Table fieldsHeadings={fieldsHeadings} fieldData={fieldsData} data={data} Page={'Player'} />);
};

export default page;
