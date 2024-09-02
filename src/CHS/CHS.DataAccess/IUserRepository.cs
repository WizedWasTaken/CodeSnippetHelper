using CHS.Entities;

namespace CHS.DataAccess
{
    public interface IUserRepository
    {
        public User GetUserById(int id);

        public User GetUserByEmail(string email);

        public User GetUserByEmailAndPassword(string email, string password);

        public void AddUser(User user);

        public void UpdateUser(User user);

        public void DeleteUser(User user);
    }
}