interface PageHeaderProps {
  title: string;
  onPreview: () => void;
  t: any;
}

export default function PageHeader({ title, onPreview, t }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <button
        type="button"
        onClick={onPreview}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        {t.preview}
      </button>
    </div>
  );
}
