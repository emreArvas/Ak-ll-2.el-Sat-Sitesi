using SQLite;
using System.ComponentModel.DataAnnotations.Schema;

namespace Loginoperations.Model;

public class Product
{
    [SQLite.PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Image { get; set; } = "default";
    public decimal Price { get; set; }
    public string Location { get; set; }
    
    public int UserId { get; set; }
    [ForeignKey("Seller")]
    public User? User { get; set; }
    
    public DateTimeOffset DatePosted { get; set;}=DateTimeOffset.Now;
}