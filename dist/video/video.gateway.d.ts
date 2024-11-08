import { Server, Socket } from 'socket.io';
export declare class VideoGateway {
    server: Server;
    private activeUsers;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleMessage(message: string): void;
    handleSendMessage(client: Socket, data: {
        toUserId: string;
        message: string;
    }): void;
    handleCallUser(client: Socket, data: {
        callerId: string;
        callerName: string;
        callerImage?: string;
        receiverId: string;
        token: string;
        offer: any;
    }): Promise<void>;
    handleMakeAnswer(client: Socket, data: {
        callerId: string;
        sdpAnswer: any;
    }): void;
    handleIceCandidate(client: Socket, data: {
        receiverId: string;
        iceCandidate: any;
    }): void;
    handleRejectCall(client: Socket, data: {
        receiverId: string;
        callerId: string;
    }): void;
    handleEndCall(client: Socket, data: {
        callerId: string;
        receiverId: string;
    }): void;
}
