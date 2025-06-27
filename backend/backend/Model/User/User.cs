using Microsoft.EntityFrameworkCore;
using SQLite;
using Toolbelt.ComponentModel.DataAnnotations.Schema.V5;

namespace Loginoperations.Model;

public class User
{
    [SQLite.PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string? ActivationCode { get; set; }="default";
    public string Password { get; set; }
    
}