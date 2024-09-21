using Microsoft.EntityFrameworkCore.Scaffolding;

namespace CHS.Entities
{
    public class Snippet
    {
        #region Fields

        private int snippetId;
        private string title;
        private string code;
        private string description;
        private int likes;
        private User createdBy;
        private DateTime createdOn;
        private Language language;

        #endregion Fields

        #region Constructors

        public Snippet()
        {
        }

        public Snippet(int id, string title, string code, string description, int likes, User createdBy, DateTime createdOn, Language language)
        {
            SnippetId = id;
            Title = title;
            Code = code;
            Description = description;
            Likes = likes;
            CreatedBy = createdBy;
            CreatedOn = createdOn;
            Language = language;
        }

        #endregion Constructors

        #region Properties

        public int SnippetId
        {
            get { return snippetId; }
            set { snippetId = value; }
        }

        public string Title
        {
            get { return title; }
            set { title = value; }
        }

        public string Code
        {
            get { return code; }
            set { code = value; }
        }

        public string Description
        {
            get { return description; }
            set { description = value; }
        }

        public int Likes
        {
            get { return likes; }
            set { likes = value; }
        }

        public User CreatedBy
        {
            get { return createdBy; }
            set { createdBy = value; }
        }

        public DateTime CreatedOn
        {
            get { return createdOn; }
            set { createdOn = value; }
        }

        public Language Language
        {
            get { return language; }
            set { language = value; }
        }

        #endregion Properties
    }
}