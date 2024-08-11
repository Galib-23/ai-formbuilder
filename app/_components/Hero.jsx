import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl uppercase font-extrabold sm:text-5xl">
            Create your forms
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              In Seconds{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-fuchsia-900 focus:outline-none focus:ring active:bg-primary sm:w-auto"
              href="#"
            >
              + Create Now
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-black hover:bg-slate-200 focus:outline-none focus:ring active:text-primary sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
