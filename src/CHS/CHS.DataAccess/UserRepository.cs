using CHS.Entities;

namespace CHS.DataAccess;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(DataContext context) : base(context)
    {
    }

    public new void Add(User user)
    {
        user.Password = user.HashPassword(user.Password);

        _context.Add(user);
        _context.SaveChanges();
    }

    public User GetByEmail(string email)
    {
        return _context.Users.FirstOrDefault(u => u.Email == email);
    }

    public object GetStatistics(Statistics typeOfStat, User? user)
    {
        switch (typeOfStat)
        {
            // Directory with all posts on each date.
            case Statistics.PostAmountHistory:
                return _context.Snippets.GroupBy(s => s.CreatedOn.Date)
                    .Select(g => new { Date = g.Key, Count = g.Count() })
                    .OrderByDescending(g => g.Date)
                    .ToList();

            case Statistics.UserPostAmountHistory:
                return _context.Snippets.Where(s => s.CreatedBy.UserId == user.UserId)
                    .GroupBy(s => s.CreatedOn.Date)
                    .Select(g => new { Date = g.Key, Count = g.Count() })
                    .OrderByDescending(g => g.Date)
                    .ToList();
        }

        return null;
    }
}