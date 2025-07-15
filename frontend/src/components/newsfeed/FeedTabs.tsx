export default function FeedTabs() {
  return (
    <div className="flex space-x-4 border-b border-[#22222A] pb-2">
      {["For You", "Following", "Friends"].map((tab, i) => (
        <button
          key={i}
          className={`text-sm font-medium ${
            i === 0 ? "text-[#F208FF] border-b-2 border-[#F208FF]" : "text-gray-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}