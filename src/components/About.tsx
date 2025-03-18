export default function About() {
  return (
    <section className="w-screen">
      <div>
        <div
          className="items-center box-border text-white/[0.65] flex-col h-[44.88rem] justify-center leading-7 py-32 px-5 w-[159.00rem] flex bg-neutral-900 w-screen"
          id="div-1"
        >
          <div className="items-center flex-col h-96 justify-center max-w-[75.00rem] w-full flex">
            <div
              className="gap-x-[3.25rem] auto-cols-fr grid-cols-[1fr_1fr] grid-rows-[auto] h-96 w-full grid"
              id="div-2"
            >
              <div className="h-96 relative w-full border-2 border-white/[0.15] border-solid overflow-hidden">
                <img
                  className="h-full object-cover align-middle w-full inline-block overflow-clip"
                  src="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087088a85bd1aee15d550ca_welcome.jpeg"
                  srcSet="https://assets-global.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087088a85bd1aee15d550ca_welcome-p-500.jpeg 500w, https://assets-global.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087088a85bd1aee15d550ca_welcome-p-1080.jpeg 1080w, https://assets-global.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087088a85bd1aee15d550ca_welcome.jpeg 1162w"
                  style={{
                    overflowClipMargin: "content-box",
                  }}
                />
              </div>
              <div
                className="items-start flex-col h-96 justify-center py-12 pl-40 relative w-[36.00rem] flex"
                id="div-3"
              >
                <div className="items-center h-5 justify-center mb-3 w-32 flex">
                  <div className="bg-amber-400 h-0.5 w-7" />
                  <div
                    className="text-amber-400 text-sm font-medium h-5 leading-5 uppercase w-20 m-3"
                    style={{
                      letterSpacing: "2px",
                    }}
                  >
                    Welcome
                  </div>
                </div>
                <h2
                  className="text-white text-[2.63rem] leading-none italic font-bold h-24 leading-[2.88rem] mb-7 max-w-[35.00rem] uppercase w-[32.38rem]"
                  style={{
                    letterSpacing: "0px",
                  }}
                >
                  Dedicated to igniting your passion for health
                </h2>
                <p className="h-28 mb-9 w-96">
                  Ut magna amet, a malesuada. Nibh in interdum at sem senectus
                  pulvinar aliquam orci. Adipiscing malesuada urna sed urna in
                  nunc volutpat ipsum. Dictumst nunc et velit sed curabitur
                  lobortis viverra sapien.
                </p>
                <a
                  className="text-white cursor-pointer text-sm font-medium h-16 leading-5 py-4 px-8 text-center uppercase w-36 inline-block border-2 border-white border-solid"
                  style={{
                    letterSpacing: "2px",
                  }}
                >
                  About Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
