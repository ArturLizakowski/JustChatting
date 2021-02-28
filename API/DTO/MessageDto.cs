using System;

namespace API.DTO
{
	public record MessageDto(string Content, bool FromMe, DateTime ModifyDate);
}