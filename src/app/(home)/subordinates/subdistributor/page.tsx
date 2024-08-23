import SearchBar from "@/component/ui/SearchBar";
import Table from "@/component/ui/Table";
import { config } from "@/utils/config";
import { getCookie, getCurrentUser } from "@/utils/utils";
import { revalidatePath } from "next/cache";

async function getAllSubordinates() {
    const token = await getCookie();
    const user: any = await getCurrentUser();
    try {
    const response = await fetch(`${config.server}${user?.role==='admin'?'/api/subordinates?type=subdistributor':`/api/subordinates/${user?.username}/subordinates?type=username`}`, {
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
        console.log(data,"user ka adata ")
        const all = data;
        return all;
    } catch (error) {
        console.log("error:", error);
    } finally {
        revalidatePath("/");
    }
}



const page = async () => {
    const data = await getAllSubordinates();
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
                className="col-span-12 lg:col-span-9 relative xl:col-span-8"
            >
                {/* <div className="md:absolute md:right-[2%] md:-top-[4.4%] pb-3 md:pb-0 md:inline-block">
                    <SearchBar />
                </div> */}
                <Table fieldsHeadings={fieldsHeadings} fieldData={fieldsData} data={data} Page={'Player'} />
            </div>
        </>
    );
};

export default page;
