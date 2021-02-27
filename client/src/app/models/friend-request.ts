export interface FriendRequest {
  requestId: number;
  friendId: number;
  displayName: string;
  canApprove: boolean;
}

export interface Friend {
  id: number;
  displayName: string;
}
