namespace API.DTO
{
	public record UserSearchResultDto(int Id, string DisplayName, bool AlreadyFriend, bool AlreadyRequestedFriend);
}