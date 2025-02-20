interface PostFormProps {
  title: string;
  category: string;
  onTitleChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  t: any;
}

export default function PostForm({
  title,
  category,
  onTitleChange,
  onCategoryChange,
  t
}: PostFormProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder={t.postTitle}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
      
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
        required
      >
        <option value="news">{t.categories.news}</option>
        <option value="events">{t.categories.events}</option>
      </select>
    </div>
  );
}
