using CHS.Entities;

namespace CHS.DataAccess
{
    public interface ISnippetRepository : IRepository<Snippet>
    {
        List<Snippet> GetAllSortedByPhrase(string phrase);

        List<Snippet> GetAllSortedByLanguage(Language language);

        List<Snippet> GetAllSortedByLikes();

        //List<Snippet> GetAllSortedByFavorites();

        List<Snippet> GetAllSortedByUser(User user);
    }
}