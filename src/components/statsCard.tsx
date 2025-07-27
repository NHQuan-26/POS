import CountUp from "react-countup";

interface StatsCardProps {
  start: number;
  end: number;
  suffix: string;
  text: string;
}

export default function StatsCard({
  start,
  end,
  suffix,
  text,
}: StatsCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md w-52 h-32 rounded-2xl shadow-lg p-3 border border-white/20 flex flex-col">
      <h1 className="text-gray-400 font-mono">{text}</h1>
      <div className="flex-1 flex flex-col justify-center">
        <span className="text-white font-mono text-2xl font-semibold">
          <CountUp
            start={start}
            end={end}
            duration={10}
            separator=","
            suffix={suffix}
          />
        </span>
      </div>
    </div>
  );
}
