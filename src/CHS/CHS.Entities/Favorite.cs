namespace CHS.Entities
{
    public class Favorite
    {
        #region Fields

        private int favoriteId;
        private User user;
        private Snippet snippet;

        #endregion Fields

        #region Constructors

        public Favorite(int id, User user, Snippet snippet)
        {
            FavoriteId = id;
            User = user;
            Snippet = snippet;
        }

        #endregion Constructors

        #region Properties

        public int FavoriteId
        {
            get { return favoriteId; }
            set { favoriteId = value; }
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