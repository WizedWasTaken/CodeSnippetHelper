using System.Security.Principal;
using BCrypt;

namespace CHS.Entities
{
    public class User
    {
        #region Fields

        private int userId;
        private string name;
        private string email;
        private string password;
        private DateTime createdOn;

        #endregion Fields

        #region Constructors

        public User()
        { }

        public User(int id, string name, string email, string password, DateTime createdOn)
        {
            UserId = id;
            Name = name;
            Email = email;
            Password = password;
            CreatedOn = createdOn;
        }

        #endregion Constructors

        #region Properties

        public int UserId
        {
            get { return userId; }
            set { userId = value; }
        }

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public string Email
        {
            get { return email; }
            set
            {
                email = value;
            }
        }

        public string Password
        {
            get { return password; }
            set { password = value; }
        }

        public DateTime CreatedOn
        {
            get { return createdOn; }
            set
            {
                if (value == null)
                {
                    createdOn = DateTime.Now;
                }
                else
                {
                    createdOn = value;
                }
            }
        }

        #endregion Properties

        #region Methods

        public bool VerifyEmail(string email)
        {
            return email.Contains("@");
        }

        #endregion Methods

        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }

        public bool VerifyUser(string email, string password)
        {
            return Email == email && Password == password;
        }

        public bool VerifyUser(User user)
        {
            return Email == user.Email && Password == user.Password;
        }
    }
}