interface IraqiHeaderProps {
  title: string;
  subtitle: string;
}

export default function IraqiHeader({ title, subtitle }: IraqiHeaderProps) {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}
