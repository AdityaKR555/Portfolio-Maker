"use client";

import Input from "@/components/input/Input";
import Output from "@/components/Output";
import { useState } from "react";

export default function Home() {

  const [data, setData] = useState({
    name : "",
    bio : "",
    skills : [],
    projects: [{ title: "", description: "", link: "" }],
    social: {
      github: "",
      linkedin: ""
    }
  });

  const [theme, setTheme] = useState("dark");

  return (
   <div className="flex p-6 gap-4 flex-col md:flex-row">
     <Input data={data} setData={setData} />
     <Output data={data} theme={theme} setTheme={setTheme} />
   </div>
  );
}
