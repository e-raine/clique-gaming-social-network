import Image from 'next/image';

export default function PostCard() {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-info">
          <Image src="/user.jpg" className="avatar" alt="user"/>
          <div>
            <p className="username">krrameas</p>
            <p className="timestamp">43 minutes ago</p>
          </div>
        </div>
        <span className="post-options">•••</span>
      </div>
      <p className="post-caption">Valorant paldo moments</p>
      <Image src="/valorant.jpg" className="post-image" alt=""/>
      <div className="post-footer">
        <span>💜 18.9k</span>
        <span>💬 102</span>
      </div>
    </div>
  );
}