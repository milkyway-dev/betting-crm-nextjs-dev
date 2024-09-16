import DailyActivityViewer from "@/component/ui/DateWiseActivity";
import React from "react";

const page = async ({ params }: any) => {
  console.log("params : ", params);
  const player = params.activity;

  return <DailyActivityViewer username={player} />;
};

export default page;
