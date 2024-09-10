using CHS.Entities;

namespace CHS.DataAccess
{
    public class SnippetRepository : Repository<Snippet>, ISnippetRepository
    {
        public SnippetRepository(DataContext context) : base(context)
        {
        }

        public Snippet GetByTitle(string title)
        {
            return _context.Snippets.FirstOrDefault(s => s.Title == title);
        }

        public Snippet GetByLanguage(Language language)
        {
            return _context.Snippets.FirstOrDefault(s => s.Language == language);
        }

        public Snippet GetByLikes(int likes)
        {
            return _context.Snippets.FirstOrDefault(s => s.Likes == likes);
        }

        public Snippet GetByFavorites(int favorites)
        {
            return _context.Snippets.FirstOrDefault(s => s.Favorites.Count == favorites);
        }

        public Snippet GetByFavorites(List<Favorite> favorites)
        {
            return _context.Snippets.FirstOrDefault(s => s.Favorites == favorites);
        }

        public IEnumerable<Snippet> GetByUser(User user)
        {
            return _context.Snippets.Where(s => s.CreatedBy == user);
        }
    }
}