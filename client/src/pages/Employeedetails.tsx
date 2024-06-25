import EmployeeDetail from "@/components/EmployeeDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Employee } from "@/lib/types";

export default function Employeedetails() {
  const { id } = useParams();
  const [data, setData] = useState<Employee>();
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
    if (!data) getdata();
  }, [id]);
  // console.log(data);

  return (
    <div className="h-screen flex items-center justify-center">
      {" "}
      <EmployeeDetail employee={data} />{" "}
    </div>
  );
}
