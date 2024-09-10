namespace CHS.Entities
{
    public class Like
    {
        #region Fields

        private int likeId;
        private User user;
        private Snippet snippet;

        #endregion Fields

        #region Constructors

        public Like()
        {
        }

        public Like(int id, User user, Snippet snippet)
        {
            LikeId = id;
            User = user;
            Snippet = snippet;
        }

        #endregion Constructors

        #region Properties

        public int LikeId
        {
            get { return likeId; }
            set { likeId = value; }
        }

        public User User
        {
            get { return user; }
            set { user = value; }
        }

        public Snippet Snippet
        {
            get { return snippet; }
            set { snippet = value; }
        }

        #endregion Properties
    }
}