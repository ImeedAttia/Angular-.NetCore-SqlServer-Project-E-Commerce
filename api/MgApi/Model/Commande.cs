namespace MgApi.Model
{
    public class Commande
    {
        public int CommandeId { get; set; }
        
        public int UserId { get; set; }
        public string ArticleIds { get; set; }
        public string CreateDate { get; set; }
        public string ModifiedDate { get; set; }
        public string valid { get; set; }

    }
}
