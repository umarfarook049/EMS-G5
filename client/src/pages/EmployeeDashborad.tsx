import { useEffect, useState } from "react";
import axios from "axios";
import { Employee } from "@/lib/types";
import { useRecoilValue } from "recoil";
import { userInfo } from "../store/atom";
import EmployeeDetail from "@/components/EmployeeDetails";

export default function EmployeeDashborad() {
  const [data, setData] = useState<Employee>();
  const user = useRecoilValue(userInfo);
  console.log(user?.UserID);
  const id = user?.UserID;

  useEffect(() => {
    async function getdata() {
      try {
        const responese = await axios.get<Employee>(
          "http://localhost:3000/api/v1/employee/" + id
        );
        const responeseData = await responese.data;
        setData(responeseData);
      } catch (error) {
        console.log("error", error);
        // setError("some thing went worng");
      }
    }
    if (!id) return;
    if (!data) getdata();
  }, [id]);
  console.log(data);

  return (
    <div className=" h-screen flex items-center justify-center">
      <EmployeeDetail employee={data} />
    </div>
  );
}
