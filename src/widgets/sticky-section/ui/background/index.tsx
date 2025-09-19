export const Background = () => {
  return (
    <div className="absolute inset-0 z-[-1]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-green-950/40 to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.25),transparent_30%)] blur-2xl" />
    </div>
  );
};
