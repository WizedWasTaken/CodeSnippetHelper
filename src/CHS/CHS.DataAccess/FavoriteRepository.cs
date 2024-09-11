using CHS.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CHS.DataAccess
{
    public class FavoriteRepository : Repository<Favorite>, IFavoriteRepository
    {
        public FavoriteRepository(DataContext context) : base(context)
        {
        }

        public Favorite AddNewFavoriteToSnippet(Snippet snippet, User user)
        {
            if (IsFavorite(snippet, user))
            {
                throw new SqlAlreadyFilledException("Dette snippet er allerede favoritted.");
            }

            var favorite = new Favorite
            {
                Snippet = snippet,
                User = user
            };

            Add(favorite);

            return favorite;
        }

        public List<Favorite> GetFavoritesFromPost(Snippet snippet)
        {
            return _context.Favorites.Where(l => l.Snippet.SnippetId == snippet.SnippetId).ToList();
        }

        public bool IsFavorite(Snippet snippet, User user)
        {
            return _context.Favorites.Any(l => l.Snippet.SnippetId == snippet.SnippetId && l.User.UserId == user.UserId);
        }
    }
}
