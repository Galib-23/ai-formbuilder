"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/configs/AiModel";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const PROMPT =
    ", On the basis of the description please give a form in json format with form 'formTitle', form 'subHeading' with 'formFields' having 'fieldName', 'fieldLabel', 'placeholder', 'fieldType', and 'required' in Json format. Along with these properties for 'fieldType' == 'select', 'checkbox', and 'radio' there will be 'options' array of objects with 'value' and 'label' "

  const onCreateForm = async () => {
    setLoading(true);
    try {
      const result = await AiChatSession.sendMessage(
        "Description: " + userInput + PROMPT,
      );
      if (result?.response?.text()) {
        const res = await db
          .insert(jsonForms)
          .values({
            jsonform: result.response.text(),
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD/MM/yyyy"),
          })
          .returning({ id: jsonForms.id });
        setLoading(false);
        setUserInput("");
        if (res[0].id) {
          router.push(`/edit-form/${res[0].id}`);
        }
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[525px] lg:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                placeholder="Write a description of your form"
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div className="flex gap-2 justify-end my-3">
                <Button
                  onClick={() => setOpenDialog(false)}
                  variant="destructive"
                >
                  Cancel
                </Button>
                {loading ? (
                  <Button disabled>Generating...</Button>
                ) : (
                  <Button disabled={loading} onClick={onCreateForm}>
                    Create
                  </Button>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
