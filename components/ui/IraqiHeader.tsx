interface IraqiHeaderProps {
  title: string;
  subtitle?: string;
}

export default function IraqiHeader({ title, subtitle }: IraqiHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
