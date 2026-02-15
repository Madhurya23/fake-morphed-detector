export default function HeatmapPreview({ imageUrl, heatmapUrl }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <img src={imageUrl} alt="Original" className="rounded-lg" />
      {heatmapUrl && (
        <img src={heatmapUrl} alt="Heatmap" className="absolute top-0 left-0 w-full h-full rounded-lg opacity-50" />
      )}
    </div>
  );
}
