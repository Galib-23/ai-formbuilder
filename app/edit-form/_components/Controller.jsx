import GradientBg from "@/app/_data/GradientBg";
import Themes from "@/app/_data/Themes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Borders from "./Borders";

const Controller = ({ setSelectedTheme, selectBackground, disabled, updateControllerFields }) => {
  const [showAllBg, setShowAllBg] = useState(false);

  return (
    <div>
      {/* {Theme Selection} */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="my-2">Select Themes</h2>
        <Button onClick={updateControllerFields} className={`${disabled && 'hidden'}`} size="sm">Save</Button>
      </div>
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

      {/* Background Controller */}
      <h2 className="mt-8 my-1">Background</h2>
      <div className="grid grid-cols-3 gap-5">
        {GradientBg.map(
          (bg, idx) =>
            (!showAllBg ? idx < 6 : showAllBg) && (
              <div
                key={idx}
                onClick={() => selectBackground(bg.gradient)}
                className="w-full h-[70px] rounded-lg border hover:border-black hover:border-2 cursor-pointer flex items-center justify-center"
                style={{
                  background: bg.gradient,
                }}
              >
                {idx == 0 && "None"}
              </div>
            ),
        )}
      </div>
      <Button
        onClick={() => setShowAllBg(!showAllBg)}
        variant="ghost"
        size="sm"
        className="w-full mt-4"
      >
        {showAllBg ? "Show Less" : "Show More"}
      </Button>
      <Borders />
    </div>
  );
};

export default Controller;
