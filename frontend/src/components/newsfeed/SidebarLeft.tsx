import Image from 'next/image';

export default function SidebarLeft() {
  return (
    <div className="sidebar-left">
      <Image src="/logo-icon.png" className="h-10 w-10" alt="logo" width={400}
						height={400}/>
    </div>
  );
}
