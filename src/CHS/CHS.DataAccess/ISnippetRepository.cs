using CHS.Entities;

namespace CHS.DataAccess
{
    public interface ISnippetRepository : IRepository<Snippet>
    {
        Snippet GetByTitle(string title);

        Snippet GetByLanguage(Language language);

        Snippet GetByLikes(int likes);

        Snippet GetByFavorites(int favorites);

        Snippet GetByFavorites(List<Favorite> favorites);

        IEnumerable<Snippet> GetByUser(User user);
    }
}