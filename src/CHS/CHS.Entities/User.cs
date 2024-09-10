using System.Security.Principal;

namespace CHS.Entities
{
    public class User
    {
        #region Fields

        private int userId;
        private string name;
        private string email;
        private string password;

        #endregion Fields

        #region Constructors

        public User()
        { }

        public User(int id, string name, string email, string password)
        {
            UserId = id;
            Name = name;
            Email = email;
            Password = password;
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
                if (VerifyEmail(value))
                {
                    throw new InvalidOperationException("Invalid email");
                }

                email = value;
            }
        }

        public string Password
        {
            get { return password; }
            set { password = value; }
        }

        #endregion Properties

        #region Methods

        public bool VerifyEmail(string email)
        {
            return email.Contains("@");
        }

        #endregion Methods

        public bool VerifyPassword(string password)
        {
            return password.Length >= 8;
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