import { Edit, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const FieldEdit = ({ defaultValue, onUpdate }) => {
  const [label, setLabel] = useState(defaultValue?.fieldLabel);
  const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger>
          <Edit className="h-4 w-4 text-gray-500" />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit Fields</h2>
          <div className="space-y-2">
            <div>
              <label className="text-xs">Label Name</label>
              <Input
                type="text"
                defaultValue={defaultValue.fieldLabel}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs">Placeholder Name</label>
              <Input
                type="text"
                defaultValue={defaultValue.placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
              />
            </div>
            <Button
              size="sm"
              onClick={() =>
                onUpdate({
                  label,
                  placeholder,
                })
              }
            >
              Update
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Trash className="h-4 w-4 text-red-500" />
    </div>
  );
};

export default FieldEdit;
