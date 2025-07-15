export default function SidebarRight() {
  return (
    <div className="sidebar-right">
      <div className="bg-[#16161B] p-4 rounded-lg">
        <img src="/banner.jpg" className="w-full rounded" />
        <div className="mt-3">
          <p className="font-semibold">Krameas Aqua</p>
          <p className="text-sm text-gray-400">@krrameas</p>
        </div>
        <button className="mt-2 bg-[#F208FF] text-sm px-4 py-1 rounded text-white">
          Follow
        </button>
      </div>
    </div>
  );
}