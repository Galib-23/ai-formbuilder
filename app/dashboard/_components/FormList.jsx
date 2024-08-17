"use client";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import FormListItem from "./FormListItem";

const FormList = () => {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    user && GetFormList();
  }, [user]);

  const GetFormList = async () => {
    const result = await db
      .select()
      .from(jsonForms)
      .where(eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(jsonForms.id));
    setFormList(result);
  };
  return (
    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
      {formList.map((form, idx) => (
        <div key={idx}>
          <FormListItem
            formRecord={form}
            jsonForm={JSON.parse(form.jsonform)}
            refreshData={GetFormList}
          />
        </div>
      ))}
    </div>
  );
};

export default FormList;
