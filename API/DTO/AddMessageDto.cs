using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class AddMessageDto
    {
        [Required]
        public string Content { get; set; }
    }
}