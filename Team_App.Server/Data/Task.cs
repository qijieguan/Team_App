namespace Team_App.Server.Data
{
    public class Task
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string[] Assign { get; set; }
        public int Status { get; set; }
    }
}