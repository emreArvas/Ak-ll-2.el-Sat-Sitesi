using Loginoperations.Model;

namespace Loginoperations.Dto.Response;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; }
    

    public UserDto(int ıd, string username)
    {
        Id = ıd;
        Username = username;
        
    }

    public UserDto()
    {
    }
}