"use client"
import LastItemDetector from "@/component/ui/LastItemDetector";
import Table from "@/component/ui/Table";
import { getAllTransactions } from "@/utils/action";
import { getCurrentUser } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";

const Page = ({ searchParams }: any) => {
  const [pageCount, setPageCount] = useState<number>(1)
  const lastElementRef = useRef(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState<any[]>([]);

  console.log(pageCount,"pageCount")
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const user = await getCurrentUser();
        const result = await getAllTransactions(
          user,
          searchParams?.search,
          searchParams?.date,
          pageCount,
          10,
        );
        if (searchParams?.search?.length > 0 || searchParams?.date) {
          setData([]);
          setPageCount(1)
          setSearch([...result?.data]);
        } else {
          const newData = result?.data?.filter(
            (item: any) => !data.some((stateItem: any) => stateItem?._id === item?._id)
          );
          setData([...data, ...newData]);
          setSearch([])
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, [searchParams?.search,searchParams?.date,pageCount]);

  const fieldsHeadings = ["Amount", "Type", "Sender", "Receiver", "Date"];
  const fieldsData = ["amount", "type", "sender", "receiver", "date"];


  // Use IntersectionObserver to detect when the last element is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (searchParams?.search?.length > 0 || searchParams?.date) {
          setPageCount(1)
        }
        if (entries[0]?.isIntersecting && data?.length >= 10) {
          setPageCount((prevPageCount) => prevPageCount + 1);
        }
      },
      {
        threshold: 1, // Trigger when the last element is fully in view
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
  }, [data, search]);


  return (
    <>
      <Table Page="transactions" width={'w-[20px]'} fieldsHeadings={fieldsHeadings} fieldData={fieldsData} data={((searchParams?.date) || (searchParams?.search?.length > 0)) ? search : data}
      />
      <div ref={lastElementRef} style={{ height: '4px', width: '100%' }} />
    </>
  );
};

export default Page;
