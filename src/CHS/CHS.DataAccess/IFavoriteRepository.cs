using CHS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CHS.DataAccess
{
    public interface IFavoriteRepository : IRepository<Favorite>
    {
        Favorite AddNewFavoriteToSnippet(Snippet snippet, User user);
        List<Favorite> GetFavoritesFromPost(Snippet snippet);
        bool IsFavorite(Snippet snippet, User user);
    }
}
