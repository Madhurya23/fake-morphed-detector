export default function HeatmapPreview({
  imageUrl,
  heatmapUrl
}) {

  return (

    <div className="relative w-full">

      {/* ORIGINAL IMAGE */}
      <img
        src={imageUrl}
        alt="Original"
        className="w-full rounded-xl"
      />

      {/* HEATMAP OVERLAY */}
      {
        heatmapUrl && (

          <img
            src={heatmapUrl}
            alt=""
            className="
              absolute
              top-0
              left-0
              w-full
              h-full
              object-cover
              rounded-xl
              opacity-50
            "
          />

        )
      }

    </div>
  );
}