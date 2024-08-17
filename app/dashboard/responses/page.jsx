"use client"
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormListForResp from "./_components/FormListForResp";

const Responses = () => {
  const { user } = useUser();
  const [formList, setFormList] = useState([])

  useEffect(() => {
    user && getFormList();
  }, user)

  const getFormList = async () => {
    const result = await db
      .select()
      .from(jsonForms)
      .where(eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(jsonForms.id));
    setFormList(result)
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl flex items-center justify-between">
        Responses
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3">
        {
            formList?.map((form, idx) => (
                <FormListForResp formRecord={form} jsonForm={JSON.parse(form.jsonform)} />
            ))
        }
      </div>
    </div>
  );
};

export default Responses;
