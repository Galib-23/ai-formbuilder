import { Button } from "@/components/ui/button";
import { Edit, Share2, Trash } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";

const FormListItem = ({ jsonForm, formRecord, refreshData }) => {
  const { user } = useUser();

  const onDeleteForm = async () => {
    const result = await db
      .delete(jsonForms)
      .where(
        and(
          eq(jsonForms.id, formRecord?.id),
          eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress),
        ),
      );

    if (result) {
      toast("Form deleted successfully");
      refreshData();
    }
  };

  return (
    <div className="border shadow-sm rounded-lg p-4">
      <div className="flex justify-between">
        <h2></h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash className="h-5 w-5 text-red-500 cursor-pointer hover:scale-105 transition-all" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeleteForm()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h2 className="text-lg text-black">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm text-gray-500">{jsonForm?.subHeading}</h2>
      <hr className="my-4" />
      <div className="flex justify-between">
        <Button className="flex gap2" size="sm" variant="outline">
          <Share2 className="h-4" />
          Share
        </Button>
        <Link href={`/edit-form/${formRecord?.id}`}>
          <Button className="flex gap2" size="sm">
            <Edit className="h-4" />
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FormListItem;
