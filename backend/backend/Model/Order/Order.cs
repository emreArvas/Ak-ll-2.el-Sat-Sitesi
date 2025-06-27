using Loginoperations.Enum;
using SQLite;

namespace Loginoperations.Model.Order;

public class Order
{
    [SQLite.PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; }
    public DateTime DatePosted { get; set; }=DateTime.Now;
    public int UserId { get; set; }
    public User User { get; set; }
    public string OrderStatus { get; set; }
}