using CHS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CHS.DataAccess
{
    public interface ILikeRepository : IRepository<Like>
    {
        Like AddNewLikeToSnippet(Snippet snippet, User user);

        List<Like> GetLikesFromPost(Snippet snippet);
        bool IsLiked(Snippet snippet, User user);
    }
}
