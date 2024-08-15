const Borders = () => {
  const borders = [
    {
      id: 1,
      name: "default",
      styles: "",
    },
    {
      id: 2,
      name: "border",
      styles: "border-4 border-black",
    },
    {
      id: 3,
      name: "retro",
      styles: "border-2 border-black shadow-black shadow-md",
    },
  ];
  return (
    <div>
      <h2 className="mt-8 my-1">Styles</h2>
      <div className="grid grid-cols-3 gap-5">
        {borders.map((border) => (
          <div
            key={border.id}
            className="p-2 h-24 w-full bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer"
          >
            <div
              className={`bg-white w-16 h-16 ${border.styles} hover:scale-105 transition-all`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Borders;
