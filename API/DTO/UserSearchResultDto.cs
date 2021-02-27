namespace API.DTO
{
	public record UserSearchResultDto(int Id, string DisplayName, bool alreadyFriend, bool alreadyRequestedFriend);
}