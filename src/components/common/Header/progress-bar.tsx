const RECT_COUNT = 26;

export const SvgComponent = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width={267} height={20} fill="none">
        <path fill="#2F130F" d="M.5 6h1v8h-1zM1.5 3h1v14h-1z" />
        <rect width={261} height={19} x={3} y={0.5} stroke="#2F130F" rx={1.5} />

        {new Array(RECT_COUNT).fill(null).map((_, idx) => (
          <Rectangle key={idx} x={10 * idx + 4.5} animateId={idx} />
        ))}

        <path fill="#2F130F" d="M264.5 3h1v14h-1zM265.5 6h1v8h-1z" />
      </svg>
    </>
  );
};

const Rectangle = ({ animateId, x }: { animateId: number; x: number }) => {
  const beginTime = animateId === 0 ? `0s;rectRepeat.end` : `rect${animateId - 1}.end`;

  return (
    <rect width={8} height={16} y={2} x={x} fill="#2F130F" rx={1} opacity={0.1}>
      <animate
        id={`rect${animateId}`}
        attributeName="opacity"
        values="0.5;1"
        begin={beginTime}
        dur="0.3s"
        fill="freeze"
      />
      <animate
        id="rectRepeat"
        attributeName="opacity"
        from="1"
        to="0.1"
        dur="0.0001s"
        begin={`rect${RECT_COUNT - 1}.end`}
        fill="freeze"
      />
    </rect>
  );
};
