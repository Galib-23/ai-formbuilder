import Themes from "@/app/_data/Themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Controller = ({setSelectedTheme}) => {
  return (
    <div>
      <h2 className="my-2">Select Themes</h2>
      <Select onValueChange={(value) => setSelectedTheme(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Themes.map((theme, idx) => (
            <SelectItem value={theme.theme} key={idx}>
              <div className="flex gap-3">
                <div className="flex">
                  <div
                    className={`h-5 w-5 rounded-l-md`}
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div
                    className={`h-5 w-5`}
                    style={{ backgroundColor: theme.secondary }}
                  ></div>
                  <div
                    className={`h-5 w-5`}
                    style={{ backgroundColor: theme.accent }}
                  ></div>
                  <div
                    className={`h-5 w-5 rounded-r-md`}
                    style={{ backgroundColor: theme.neutral }}
                  ></div>
                </div>
                <div>{theme.theme}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Controller;
