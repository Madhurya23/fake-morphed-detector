export default function ImageMeta({ file }) {
  if (!file) return null;

  return (
    <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
      <p><strong>File name:</strong> {file.name}</p>
      <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
      <p><strong>Type:</strong> {file.type}</p>
    </div>
  );
}
