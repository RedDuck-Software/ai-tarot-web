export const Footer = () => {
  return (
    <div className="flex h-[820px] w-full flex-col items-end justify-end bg-[url('/images/footer/footer.png')] bg-center font-inknut md:h-[920px]">
      <p className="mb-[100px] flex w-full flex-col justify-between px-[28px] text-[20px] font-light leading-[28px] max-md:gap-10 max-md:text-center md:flex-row md:px-[140px]">
        <span>@{new Date().getFullYear()}. All rights reserved.</span>
        <span>Powered by TarotSol AI</span>
      </p>
    </div>
  );
};
