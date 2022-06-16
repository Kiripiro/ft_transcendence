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
    async joinRoom(client: Socket, roomId: string) {
      
      client.join(roomId);
      this.logger.log(`${client.id} join: ${roomId}`)
      
      var roomSockets = this.server.in(roomId).fetchSockets();
      
      if ((await roomSockets).length == 2)
      this.server.to(roomId).emit('start')
    }

    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    /*                      POUR PONG                        */
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    private pongInfo: Array<gameRoomClass>



    @SubscribeMessage('JOIN_QUEUE')
    async joinQueue(client:Socket) {
      
      this.server.to(client.id).emit('joined')

      for (let roomId = 0; ; roomId++)
        if (!this.server.sockets.adapter.rooms.has(roomId.toString()) || (await this.server.sockets.in(roomId.toString()).fetchSockets()).length < 2) {
          this.joinRoom(client, roomId.toString())

          if (!this.pongInfo.length)

          this.logger.log('test', this.pongInfo)

          // this.setPlayer(client, this.pongInfo[roomId].nbPlayer, roomId)

          break
        }
    }

    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    /*                      POUR PONG                        */
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////





  }




