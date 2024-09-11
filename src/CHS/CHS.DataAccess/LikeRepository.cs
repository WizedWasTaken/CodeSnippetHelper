using CHS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CHS.DataAccess
{
    public class LikeRepository : Repository<Like>, ILikeRepository
    {
        public LikeRepository(DataContext context) : base(context)
        {
        }

        public Like AddNewLikeToSnippet(Snippet snippet, User user)
        {
            var like = new Like
            {
                Snippet = snippet,
                User = user
            };

            Add(like);

            return like;
        }

        public List<Like> GetLikesFromPost(Snippet snippet)
        {
            return _context.Likes.Where(l => l.Snippet.SnippetId == snippet.SnippetId).ToList();
        }

        public bool IsLiked(Snippet snippet, User user)
        {
            return _context.Likes.Any(l => l.Snippet.SnippetId == snippet.SnippetId && l.User.UserId == user.UserId);
        }
    }
}
