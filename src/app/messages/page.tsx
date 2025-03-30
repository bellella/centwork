import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getMessageRoomsByUser } from "@/lib/db/message.db";
import {Box, Stack, Typography} from "@mui/material";
import MessageItem from "@/app/components/messages/MessageItem";

export default async function MessageInboxPage() {
    const session = await getServerSession(authOptions);
    const myId = session!.user.id;
    const rooms = await getMessageRoomsByUser(myId);

    return (
        <Box p={3}>
            <Typography variant="h5" mb={2}>Message Inbox</Typography>
            <Stack spacing={1}>
                {rooms.map((room) => {
                    const peer =
                        room.buyerId === myId ? room.seller : room.buyer;
                    const lastMessage = room.messages[0]?.content ?? "No messages yet";

                    return (
                        <MessageItem
                            key={room.id}
                            roomId={room.id}
                            peerName={peer.name || "Unknown"}
                            peerAvatarUrl="/images/profile/user-1.jpg"
                            lastMessage={lastMessage}
                        />
                    );
                })}
            </Stack>
        </Box>
    );
}
