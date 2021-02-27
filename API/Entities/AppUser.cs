namespace API.Entities
{
  public class AppUser
  {
    public int Id { get; set; }

    public string UserName { get; set; }
    
    public string DisplayName { get; set; }

    public byte[] PasswordHash { get; set; }

    public byte[] PasswordSalt { get; set; }
  }
}