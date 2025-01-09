export const Footer = () => {
  return (
    <div className="font-inknut flex h-[920px] w-full flex-col items-end justify-end bg-[url('/footer.png')] bg-center">
      <p className="mb-[100px] flex w-full flex-row justify-between px-[140px] text-[20px] font-light leading-[28px]">
        <span>@{new Date().getFullYear()}. All rights reserved.</span>
        <span>Powered by TarotSol AI</span>
      </p>
    </div>
  );
};
