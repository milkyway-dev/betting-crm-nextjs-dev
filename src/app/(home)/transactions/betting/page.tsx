import Table from "@/component/ui/Table";
import { getAllBets } from "@/utils/action";

const page = async () => {
  const data = await getAllBets();
  const fieldsHeadings = [
    "Username",
    "Status",
    "Odds",
    "Amount",
    "Match Info",
    "Pick"
  ];  

  const fieldsData = [
    "player",
    "status",
    "odds",
    "amount",
    "match_info",
    "pick"
  ]
  return (<Table  fieldsHeadings={fieldsHeadings} fieldData = {fieldsData} data={data}  />);
};

export default page;
