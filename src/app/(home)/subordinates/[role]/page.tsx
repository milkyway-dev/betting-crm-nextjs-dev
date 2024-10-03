"use client"
import { useEffect, useRef, useState } from "react";
import Table from "@/component/ui/Table";
import { getSubordinates } from "@/utils/action";

const Page = ({ params, searchParams }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageCount, setPageCount] = useState<number>(1)
  const lastElementRef = useRef(null);
  console.log(data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const result = await getSubordinates(
          params?.role,
          searchParams?.search,
          searchParams?.date,
          pageCount,
          10,
        );
        console.log(result?.data,"data")
        if ((searchParams?.search?.length > 0) || (searchParams?.date)) {
          setData([...result?.data]);
        } else {
          const newData = result?.data?.filter((item: any) => !data.some((stateItem) => stateItem?._id === item?._id));
          setData([...data,...newData]);
        }
      } catch (error) {
        console.error("Error fetching subordinates:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, [params?.role, searchParams?.search, searchParams?.date, pageCount]);

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
    "actions",
  ];


  // Use IntersectionObserver to detect when the last element is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && data?.length >= 10) {
          setPageCount((prevPageCount) => prevPageCount + 1);
        } ` `
      },
      {
        threshold: 1
      }
    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [data]);


  return (
    <>
      <Table
        fieldsHeadings={fieldsHeadings}
        searchDate={searchParams?.date}
        searchquery={searchParams?.search}
        fieldData={fieldsData}
        data={data}
      />
      <div ref={lastElementRef} style={{ height: '4px', width: '100%' }} />
    </>
  );
};

export default Page;
