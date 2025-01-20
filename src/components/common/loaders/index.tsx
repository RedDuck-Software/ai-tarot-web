const BigSpinner = () => {
  return (
    <div
      style={{
        clipPath:
          "path('m23.5 0C10.5415 0 0 10.5415 0 23.5v60C0 96.4585 10.5415 107 23.5 107h60c12.9585 0 23.5-10.5415 23.5-23.5v-60C107 10.5415 96.4585 0 83.5 0zm0 7h60c9.2015 0 16.5 7.2985 16.5 16.5v60c0 9.2015-7.2985 16.5-16.5 16.5h-60C14.2985 100 7 92.7015 7 83.5v-60C7 14.2985 14.2985 7 23.5 7z')",
      }}
      className="flex h-[107px] w-[107px] items-center justify-center overflow-visible"
    >
      <div className="loader-spinner min-h-[125%] min-w-[125%]" />
    </div>
  );
};

export const FullPageLoader = () => {
  return (
    <div className="scroll fixed left-0 top-0 z-50 flex h-screen w-screen flex-row items-center justify-center bg-customYellow">
      <BigSpinner />
    </div>
  );
};
