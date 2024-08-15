"use client";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormUi from "../_components/FormUi";
import { toast } from "sonner";
import Controller from "../_components/Controller";

const EditForm = ({ params }) => {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState();
  const [selectedBg, setSelectedBg] = useState();
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();

  useEffect(() => {
    user && GetFormData();
  }, [user]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(jsonForms)
      .where(
        and(
          eq(jsonForms.id, params.formId),
          eq(jsonForms.createdBy, user?.primaryEmailAddress.emailAddress),
        ),
      );
    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
    setSelectedTheme(result[0].theme);
    setSelectedBg(result[0].background);
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const updateJsonFormInDb = async () => {
    const result = await db
      .update(jsonForms)
      .set({
        jsonform: jsonForm,
      })
      .where(
        and(
          eq(jsonForms.id, record.id),
          eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress),
        ),
      );
    toast("Updated successfully!");
  };

  const onFieldUpdate = (value, idx) => {
    if (jsonForm?.formFields && jsonForm.formFields[idx]) {
      jsonForm.formFields[idx].fieldLabel = value.label;
      jsonForm.formFields[idx].placeholder = value.placeholder;
      setUpdateTrigger(Date.now());
    }
  };

  const deleteField = async (idx) => {
    const result = jsonForm?.formFields?.filter((item, index) => index != idx);
    jsonForm.formFields = result;
    setUpdateTrigger(Date.now());
  };

  useEffect(() => {
    if (record.theme == selectedTheme && record.background == selectedBg) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [selectedBg, selectedTheme]);

  const updateControllerFields = async () => {
    const result = await db
      .update(jsonForms)
      .set({
        theme: selectedTheme,
        background: selectedBg,
      })
      .where(
        and(
          eq(jsonForms.id, record.id),
          eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress),
        ),
      );
      if (result) {
        console.log(result)
        toast("Updated successfully");
        setDisabled(true)
      }
  };

  return (
    <div className="p-10">
      <div className="flex items-center gap-11">
        <h2
          onClick={() => router.back()}
          className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
        >
          <ArrowLeft /> Back
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-lg border shadow-md">
          <Controller
            selectBackground={(value) => setSelectedBg(value)}
            setSelectedTheme={setSelectedTheme}
            disabled={disabled}
            updateControllerFields={updateControllerFields}
          />
        </div>
        <div
          className="md:col-span-2 border rounded-lg p-4 flex min-h-screen items-center justify-center"
          style={{
            backgroundImage: selectedBg,
          }}
        >
          <FormUi
            jsonForm={jsonForm}
            onFieldUpdate={onFieldUpdate}
            selectedTheme={selectedTheme}
            deleteField={(idx) => deleteField(idx)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
