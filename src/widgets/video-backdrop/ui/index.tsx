interface IVideoBackdrop {
  src: string;
  mp4: string;
}

export const VideoBackdrop = ({ mp4, src }: IVideoBackdrop) => {
  return (
    <div className="absolute inset-0">
      <video
        loop
        muted
        autoPlay
        src={src}
        playsInline
        preload="auto"
        aria-label="cinematic backdrop"
        className="h-full w-full object-cover"
      >
        <source src={src} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>

      <div
        style={{ background: `rgba(0,0,0,0.4)` }}
        className="pointer-events-none absolute inset-0"
      />
    </div>
  );
};
