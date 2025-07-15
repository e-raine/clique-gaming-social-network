export default function PostCard() {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-info">
          <img src="/user.jpg" className="avatar" />
          <div>
            <p className="username">krrameas</p>
            <p className="timestamp">43 minutes ago</p>
          </div>
        </div>
        <span className="post-options">•••</span>
      </div>
      <p className="post-caption">Valorant paldo moments</p>
      <img src="/valorant.jpg" className="post-image" />
      <div className="post-footer">
        <span>💜 18.9k</span>
        <span>💬 102</span>
      </div>
    </div>
  );
}