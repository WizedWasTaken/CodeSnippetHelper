using CHS.Entities;

namespace CHS.DataAccess
{
    public class SnippetRepository : Repository<Snippet>, ISnippetRepository
    {
        public SnippetRepository(DataContext context) : base(context)
        {
        }

        public List<Snippet> GetAllSortedByPhrase(string phrase)
        {
            return _context.Snippets.Where(s => s.Title.Contains(phrase)).ToList();
        }

        public List<Snippet> GetAllSortedByLanguage(Language language)
        {
            return _context.Snippets.Where(s => s.Language == language).ToList();
        }

        public List<Snippet> GetAllSortedByLikes()
        {
            return _context.Snippets.OrderByDescending(s => s.Likes).ToList();
        }

        public List<Snippet> GetAllSortedByUser(User user)
        {
            return _context.Snippets.Where(s => s.CreatedBy == user).ToList();
        }

        public List<Snippet> GetByUser(string username)
        {
            return _context.Snippets.Where(s => s.CreatedBy.Name == username).ToList();
        }
    }
}