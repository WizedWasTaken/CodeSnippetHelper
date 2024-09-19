using CHS.Entities;

namespace CHS.DataAccess;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(DataContext context) : base(context)
    {
    }

    new public void Add(User user)
    {
        user.Password = user.HashPassword(user.Password);

        _context.Add(user);
        _context.SaveChanges();
    }

    public User GetByEmail(string email)
    {
        return _context.Users.FirstOrDefault(u => u.Email == email);
    }
}