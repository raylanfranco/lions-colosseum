export default function Services() {
  return (
    <div>
      <div
        className="text-white/[0.65] items-center border-t-neutral-700 border-t-2 flex-col justify-center py-32 px-5 flex border-solid bg-stone-950"
        id="div-1"
      >
        <div className="items-center flex-col justify-center flex w-full max-w-[75.00rem]">
          <div className="items-start flex-col justify-center px-1 flex mr-auto">
            <div className="items-center justify-center flex mb-3">
              <div className="bg-amber-400 w-7 h-0.5" />
              <div className="text-amber-400 text-sm font-medium uppercase m-3">
                Services
              </div>
            </div>
            <h2 className="text-white text-[2.63rem] leading-none italic font-bold uppercase max-w-[35.00rem] mb-6">
              Helping you reach higher and achieve more
            </h2>
          </div>
          <div
            className="items-start gap-x-[3.25rem] auto-cols-fr grid-cols-[1fr_1fr_1fr] grid-rows-[auto] grid w-full"
            id="div-2"
          >
            <div className="mt-24" id="div-3">
              <a
                className="text-white underline inline-block w-full max-w-full overflow-hidden border-2 border-white/[0.15] border-solid"
              >
                <img
                  className="cursor-pointer object-cover align-middle inline-block w-full h-[33.13rem] max-w-full"
                  id="img-1"
                  src="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087259e4440e64a041530c2_services_vertically_1.jpg"
                  srcSet="https://assets-global.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087259e4440e64a041530c2_services_vertically_1-p-500.jpeg 500w, https://assets-global.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087259e4440e64a041530c2_services_vertically_1.jpg 584w"
                />
              </a>
              <div className="items-center justify-start flex mt-7 mb-4">
                <img
                  className="align-middle inline-block w-7 h-7 max-w-full mr-3"
                  src="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087279eae55b8446af5939d_icon_5.svg"
                />
                <a
                  className="text-white inline-block max-w-full text-3xl font-bold uppercase"
                >
                  <h4 className="cursor-pointer italic">Classes</h4>
                </a>
              </div>
              <p className="mb-6">
                Lacus duis consectetur elementum pharetra, dictumst dictum nulla
                adipiscing.
              </p>
            </div>
            <div className="mt-12" id="div-4">
              <a
                className="text-white underline inline-block w-full max-w-full overflow-hidden border-2 border-white/[0.15] border-solid"
              >
                <img
                  className="cursor-pointer object-cover align-middle inline-block w-full h-[33.13rem] max-w-full"
                  id="img-2"
                  src="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087259f2fe93534177fe1a5_services_vertically_2.jpg"
                />
              </a>
              <div className="items-center justify-start flex mt-7 mb-4">
                <img
                  className="align-middle inline-block w-7 h-7 max-w-full mr-3"
                  src="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087279ec433ac2a49bfa663_icon_2.svg"
                />
                <a
                  className="text-white inline-block max-w-full text-3xl font-bold uppercase"
                >
                  <h4 className="cursor-pointer italic">Personal training</h4>
                </a>
              </div>
              <p className="mb-6">
                Nulla mi bibendum in quis ac turpis sapien massa. Quam turpis
                tempus ut dolor.
              </p>
            </div>
            <div>
              <a
                className="text-white blur-[1px] underline inline-block w-full max-w-full overflow-hidden border-2 border-white/[0.15] border-solid"
              >
                <img
                  className="cursor-pointer object-cover align-middle inline-block w-full h-[33.13rem] max-w-full"
                  id="img-3"
                  src="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087259f770d4e2de615dd19_services_vertically_3.jpg"
                />
              </a>
              <div className="items-center justify-start flex mt-7 mb-4">
                <img
                  className="align-middle inline-block w-7 h-7 max-w-full mr-3"
                  src="https://cdn.prod.website-files.com/60831bedfbf8fb4bf3dcb9f8/6087279ecc559056af584d94_icon_1.svg"
                />
                <a
                  className="text-white inline-block max-w-full text-3xl font-bold uppercase"
                >
                  <h4 className="cursor-pointer italic">Crossfit</h4>
                </a>
              </div>
              <p className="mb-6">
                Duis scelerisque montes, libero egestas. Sit nec etiam auctor
                augue justo. Vel nec vitae.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
