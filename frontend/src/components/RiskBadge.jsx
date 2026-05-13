export default function RiskBadge({ label, type }) {

  let styles = "";

  if (type === "real") {

    styles =
      "bg-green-100 text-green-700 border border-green-300";

  }

  else if (type === "ai") {

    styles =
      "bg-yellow-100 text-yellow-700 border border-yellow-300";

  }

  else if (type === "morphed") {

    styles =
      "bg-red-100 text-red-700 border border-red-300";

  }

  else {

    styles =
      "bg-gray-100 text-gray-700 border border-gray-300";
  }

  return (

    <div
      className={`
        w-full
        text-center
        text-2xl
        font-bold
        py-4
        rounded-xl
        ${styles}
      `}
    >

      {label}

    </div>
  );
}