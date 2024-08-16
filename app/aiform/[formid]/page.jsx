"use client";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const LiveAiForm = ({ params }) => {
  const [record, setRecord] = useState(null);
  const [jsonForm, setJsonForm] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedBg, setSelectedBg] = useState("");
  const [formStyle, setFormStyle] = useState("");

  useEffect(() => {
    params && GetFormData();
  }, [params]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(jsonForms)
      .where(eq(jsonForms.id, Number(params?.formid)));

    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
    setSelectedTheme(result[0].theme);
    setSelectedBg(result[0].background);
    setFormStyle(result[0].style);
  };

  return (
    <div
      className="p-4 flex min-h-screen items-center justify-center"
      style={{
        backgroundImage: selectedBg,
      }}
    >
      <div
        className={`border p-5 rounded-lg ${formStyle}`}
        data-theme={selectedTheme}
      >
        <h2 className="font-bold text-center text-2xl">
          {jsonForm?.formTitle}
        </h2>
        <h2 className="text-sm text-gray-400 text-center">
          {jsonForm?.subHeading}
        </h2>
        {jsonForm?.formFields?.map((field, idx) => (
          <div className="flex items-center gap-2" key={idx}>
            {field?.fieldType == "select" ? (
              <div className="my-3 w-full">
                <label className="text-sm text-gray-800">
                  {field?.fieldLabel}
                </label>
                <Select>
                  <SelectTrigger className="w-full bg-transparent">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {field?.options?.map((item, idx) => (
                      <SelectItem key={idx} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : field?.fieldType == "radio" ? (
              <div className="my-3 w-full">
                <label className="text-sm text-gray-800">
                  {field?.fieldLabel}
                </label>
                <RadioGroup>
                  {field?.options?.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 my-1">
                      <RadioGroupItem value={item.value} id={item.value} />
                      <Label htmlFor={item.label}>{item.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ) : field?.fieldType == "checkbox" ? (
              <div className="my-3 w-full">
                <label className="text-sm text-gray-800">
                  {field?.fieldLabel}
                </label>
                {field?.options ? (
                  field?.options?.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Checkbox />
                      <h2>{item.label}</h2>
                    </div>
                  ))
                ) : (
                  <div className="flex gap-2 items-center">
                    <Checkbox />
                    <h2>{field?.fieldLabel || field?.label}</h2>
                  </div>
                )}
              </div>
            ) : (
              <div className="my-3 w-full">
                <label className="text-sm text-gray-800">
                  {field?.fieldLabel}
                </label>
                <Input
                  type={field?.fieldType}
                  placeholder={field?.placeholder}
                  name={field?.fieldName}
                />
              </div>
            )}
          </div>
        ))}
        <button className="btn btn-primary">Submit</button>
      </div>
    </div>
  );
};

export default LiveAiForm;
