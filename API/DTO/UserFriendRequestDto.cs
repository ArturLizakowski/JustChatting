namespace API.DTO
{
	public record UserFriendRequestDto(int RequestId, int FriendId, string DisplayName, bool canApprove);
}