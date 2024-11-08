"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let VideoGateway = class VideoGateway {
    constructor() {
        this.activeUsers = new Map();
    }
    afterInit(server) {
        console.log('WebSocket Gateway Initialized');
    }
    handleConnection(client) {
        client.on('register', (userId) => {
            this.activeUsers.set(userId, client.id);
        });
    }
    handleDisconnect(client) {
        console.log('Client disconnected:', client.id);
        this.activeUsers.forEach((socketId, userId) => {
            if (socketId === client.id) {
                this.activeUsers.delete(userId);
            }
        });
    }
    handleMessage(message) {
        this.server.emit('message', message);
    }
    handleSendMessage(client, data) {
        console.log(`Message from ${client.id} to ${data.toUserId}: ${data.message}`);
        const targetSocketId = this.activeUsers.get(data.toUserId);
        console.log('targetSocketId', targetSocketId);
        if (targetSocketId) {
            this.server.to(targetSocketId).emit('private-message', {
                from: client.id,
                message: data.message,
            });
        }
        else {
            console.log('User not connected');
        }
    }
    async handleCallUser(client, data) {
        console.log(`call-user event from ${data.callerId} to ${data.receiverId}`);
        const targetSocketId = this.activeUsers.get(data.receiverId);
        console.log('make-call-targetSocketId', targetSocketId);
        if (targetSocketId) {
            this.server.to(targetSocketId).emit('new-call', {
                callerId: data.callerId,
                offer: data.offer,
                callerName: data.callerName,
                callerImage: data.callerImage,
            });
        }
        else {
            client.emit('call-error', { message: 'User not connected' });
            console.log('User not connected');
        }
    }
    handleMakeAnswer(client, data) {
        console.log(`make-answer event from receiever to ${data.callerId}`);
        const targetSocketId = this.activeUsers.get(data.callerId);
        console.log('answer-call-targetSocketId', targetSocketId);
        if (targetSocketId) {
            this.server.to(targetSocketId).emit('call-answered', {
                callerId: data.callerId,
                sdpAnswer: data.sdpAnswer,
            });
        }
        else {
            client.emit('call-error', { message: 'User not connected' });
            console.log('User not connected');
        }
    }
    handleIceCandidate(client, data) {
        const targetSocketId = this.activeUsers.get(data.receiverId);
        console.log('ice-candidate-targetSocketId', targetSocketId);
        if (targetSocketId) {
            this.server.to(targetSocketId).emit('ice-candidate', {
                iceCandidate: data.iceCandidate,
            });
        }
        else {
            client.emit('call-error', { message: 'User not connected' });
            console.log('User not connected');
        }
    }
    handleRejectCall(client, data) {
        console.log(`reject-call event from ${data.receiverId} to ${data.callerId}`);
        const targetSocketId = this.activeUsers.get(data.callerId);
        console.log('Target caller socketId:', targetSocketId);
        if (targetSocketId) {
            this.server.to(targetSocketId).emit('call-rejected', {
                receiverId: data.receiverId,
            });
        }
        else {
            console.log('Caller is not connected');
        }
    }
    handleEndCall(client, data) {
        console.log(`end-call event from ${client.id}`);
        const callerSocketId = this.activeUsers.get(data.callerId);
        const receiverSocketId = this.activeUsers.get(data.receiverId);
        if (callerSocketId) {
            this.server.to(callerSocketId).emit('call-ended', {
                by: client.id === callerSocketId ? 'caller' : 'receiver',
            });
        }
        if (receiverSocketId) {
            this.server.to(receiverSocketId).emit('call-ended', {
                by: client.id === receiverSocketId ? 'receiver' : 'caller',
            });
        }
    }
};
exports.VideoGateway = VideoGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], VideoGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideoGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('send-message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], VideoGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('make-call'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], VideoGateway.prototype, "handleCallUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('answer-call'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], VideoGateway.prototype, "handleMakeAnswer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('ice-candidate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], VideoGateway.prototype, "handleIceCandidate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('reject-call'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], VideoGateway.prototype, "handleRejectCall", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('end-call'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], VideoGateway.prototype, "handleEndCall", null);
exports.VideoGateway = VideoGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        transports: ['websocket', 'polling'],
        wssEngine: ['ws', 'wss'],
        cors: {
            origin: '*',
        },
    })
], VideoGateway);
//# sourceMappingURL=video.gateway.js.map