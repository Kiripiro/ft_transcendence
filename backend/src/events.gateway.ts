import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('AppGateway');
  
    handleDisconnect(client: any) {
        this.logger.log( `Client disconnected: ${client.id}`);
    }
    handleConnection(client: any, ...args: any[]) {
        this.logger.log( `Client connected: ${client.id}`);
    }
    async afterInit(server: any) {
        this.logger.log('Init');
    }

    @SubscribeMessage('msgConnection')
    async handleMessage(client: Socket, message: string) {
      const newmessage = `Hey! You have the id: ${client.id}. Welcome to our fucking server!`;
      this.server.to(client.id).emit('msgToClient', newmessage);
      this.server.to(client.id).emit('ID', client.id);
    }

    @SubscribeMessage('msgToServer')
    async msgReceived(client: Socket, data: any) {
      this.logger.log(`${client.id} said: ${data.text}`);
      this.server.to(client.id).emit('msgToClient', 505);
    }
    
    @SubscribeMessage('JOIN_ROOM')
    async joinRoom(client: Socket, data: any) {
      if (!data)
      return ;
      this.logger.log(`${client.id} join: ${data}`);
      client.join(data);
      var roomSockets = this.server.in(data).fetchSockets();
      if (client.rooms.has(data))
        this.server.to(client.id).emit('joined');
      if ((await roomSockets).length == 2)
        this.server.to(data).emit('start')
    }
  }