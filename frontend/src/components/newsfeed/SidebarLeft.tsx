import Image from 'next/image';
import { House } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

interface SidebarLeftProps {
  author: string;
  avatarUrl?: string;
}


const SidebarLeft: React.FC<SidebarLeftProps> = ({ author, avatarUrl }) => {
  return (
    <div className="sidebar-left">
      <div className="avatar">
        <Avatar className="size-15">
          <AvatarImage src={avatarUrl || undefined} alt={author} />
              <AvatarFallback>
                  {author?.[0]?.toUpperCase() || "?"}
              </AvatarFallback>
        </Avatar>
      </div>
      <button className='button home-button'>
        <House />
      </button>

      <button className="button messages">
        <Mail />
      </button>
      <Image src="/images/icon2.png" className="logo" alt="logo" width={45} height={10}/>
    </div>
  );
}

export default SidebarLeft
