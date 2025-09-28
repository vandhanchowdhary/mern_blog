function ImageUpload({ images, setImages, setImagesToRemove }) {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = null; // reset input after selection
  };

  const removeImage = (img, idx) => {
    // If it's an existing image (with public_id), mark for removal
    if (img.public_id) {
      setImagesToRemove?.((prev) => [...prev, img.public_id]);
    }
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="p-1 w-full text-slate-500 text-sm rounded leading-6 file:bg-blue-200 file:text-gray-700 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 file:rounded hover:file:bg-green-200 border"
      />
      <div className="flex gap-2 flex-wrap">
        {images.map((img, idx) => (
          <div key={idx} className="relative w-24 h-24">
            <img
              src={img.url}
              alt="preview"
              className="w-full h-full object-cover rounded"
            />
            <button
              type="button"
              onClick={() => removeImage(img, idx)}
              className="absolute top-0 right-0 bg-black text-white rounded px-2 py-1 text-xs hover:bg-red-600 hover:text-black"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
