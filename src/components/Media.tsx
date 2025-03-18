export default function Media() {
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@media (max-width: 767px) {\n/* DivMagic Note: Tailwind does not support max-width. We will fix this soon. */\n\n#div-1 {\ngrid-template-columns: 1fr !important;\n}\n#div-2 {\npadding-top: 80px !important; padding-right: 11% !important; padding-bottom: 80px !important; padding-left: 11% !important;\n}\n}\n@media (max-width: 991px) {\n/* DivMagic Note: Tailwind does not support max-width. We will fix this soon. */\n\n#div-2 {\npadding-top: 100px !important; padding-bottom: 100px !important;\n}\n}\n",
        }}
      />

      <div
        className="box-border text-white/[0.65] auto-cols-fr grid-cols-[1fr_1fr] grid-rows-[auto] h-[54.38rem] leading-7 w-full grid bg-neutral-900"
        id="div-1"
      >
        <div
          className="items-start flex-col h-[65.75rem] justify-center py-32 px-64 relative w-[96.00rem] flex"
          id="div-2"
        >
          <div className="items-center h-5 justify-center mb-3 w-44 flex">
            <div className="bg-amber-400 h-0.5 w-7" />
            <div
              className="text-amber-400 text-sm font-medium h-5 leading-5 uppercase w-28 m-3"
              style={{
                letterSpacing: "2px",
              }}
            >
              Fitness Class
            </div>
          </div>
          <h2
            className="text-white text-[2.63rem] leading-none italic font-bold h-24 leading-[2.88rem] mb-7 uppercase w-[35.00rem]"
            style={{
              letterSpacing: "0px",
            }}
          >
            Get insight into the club and learn what to expect
          </h2>
          <p className="text-lg h-24 leading-8 mb-9 w-[31.25rem]">
            Get the strength workouts, cardio equipment, group exercise classes
            and personal training support you need to crush your fitness goals.
            Are you in?
          </p>
          <a
            className="items-center text-white cursor-pointer h-24 max-w-full w-96 flex"
          >
            <div className="items-center h-24 justify-center relative w-40 flex border-2 border-white/[0.15] border-solid overflow-hidden">
              <div className="items-center bg-stone-950 bottom-[1.38rem] h-12 justify-center left-[3.50rem] absolute right-[3.50rem] top-[1.38rem] w-12 z-20 flex border-2 border-white/[0.15] border-solid rounded-full p-3">
                <img
                  className="h-6 max-w-full align-middle w-6 inline-block overflow-clip"
                  src="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/6089ce1460f19c0957d3f4cd_play_arrow.svg"
                  style={{
                    overflowClipMargin: "content-box",
                  }}
                />
              </div>
              <img
                className="h-24 max-w-full object-cover align-middle w-40 inline-block overflow-clip"
                src="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/6089cc5e5571bbf504fed060_img_3.jpg"
                style={{
                  overflowClipMargin: "content-box",
                }}
              />
            </div>
            <h3
              className="text-4xl italic font-bold h-10 leading-10 ml-6 mr-3 uppercase w-40"
              style={{
                letterSpacing: "0px",
              }}
            >
              Play Video
            </h3>
          </a>
        </div>
        <div
          className="border-l-2 border-r-2 h-[54.38rem] relative w-full border-white/[0.15] overflow-hidden"
          style={{
            borderLeftStyle: "solid",
            borderRightStyle: "solid",
          }}
        >
          <img
            className="h-full object-cover align-middle w-full inline-block overflow-clip"
            src="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087088a92677d321c490c9a_fitness.jpeg"
            srcSet="https://assets-global.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087088a92677d321c490c9a_fitness-p-1080.jpeg 1080w, https://assets-global.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087088a92677d321c490c9a_fitness.jpeg 1162w"
            style={{
              overflowClipMargin: "content-box",
            }}
          />
        </div>
      </div>
    </div>
  );
}
