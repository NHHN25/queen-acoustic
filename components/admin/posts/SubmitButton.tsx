interface SubmitButtonProps {
  isLoading: boolean;
  t: any;
}

export default function SubmitButton({ isLoading, t }: SubmitButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {isLoading ? t.creating : t.save}
      </button>
    </div>
  );
}
