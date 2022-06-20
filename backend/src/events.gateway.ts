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
import { gameRoomClass } from './gameRoomClass';


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

      this.logger.log( `Client disconnected: ${client.id}`)
    
      var room: [number, gameRoomClass] | null = this.getRoomByClientID(client.id)
      if (room != null) {
        for (let i = 0; i < 2; i++)
          if (this.pongInfo[room[0]].players[i].id == client.id)
            this.pongInfo[room[0]].players[i].connected = false
        if (!this.pongInfo[room[0]].players[0].connected && !this.pongInfo[room[0]].players[1].connected)
          this.pongInfo.splice(room[0], 1)
      }

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
      
    }

    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    /*                      POUR PONG                        */
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    private pongInfo: Array<gameRoomClass> = new Array()

    getRoomByID(roomID: string): [number, gameRoomClass] | null {
        for (let i = 0; i < this.pongInfo.length; i++)
        if (this.pongInfo[i].roomID == roomID)
          return [i, this.pongInfo[i]]
        return null
    }

    getRoomByClientID(ClientID: string): [number, gameRoomClass] | null {
      for (let i = 0; i < this.pongInfo.length; i++)
        for (let j = 0; j < 2; j++)
          if (this.pongInfo[i].players[j].id == ClientID)
            return [i, this.pongInfo[i]]
      return null
  }

    @SubscribeMessage('JOIN_QUEUE')
    async joinQueue(client:Socket) {
      
      this.server.to(client.id).emit('joined')

      for (let roomId = 0; ; roomId++) {
        var room: [number, gameRoomClass] | null = this.getRoomByID(roomId.toString())
        if (room == null || !room[1].players[1].id) {
          if (room == null) {
            this.pongInfo.push(new gameRoomClass(roomId.toString(), client.id))
            room = this.getRoomByID(roomId.toString());
            this.pongInfo[room[0]].players[0].connected = true
          }
          else
            this.pongInfo[room[0]].setOponnent(client.id)
          this.joinRoom(client, roomId.toString())

          if (this.pongInfo[room[0]].players[1].id)
            this.server.to(room[1].roomID).emit('start', room[1].roomID);
          break
        }
      }
    }

    @SubscribeMessage('SPECTATE_CLIENT')
    async spectateClient(client:Socket, specID: string) {
      
      var room = this.getRoomByID(specID)
      if (room == null) {
        this.server.to(client.id).emit('clientNotFound')
        return
      }
      this.joinRoom(client, room[1].roomID)
      // for (let i = 0; i < 100; i++)
      this.pongInfo[room[0]].addSpectator(client.id)

      for (let i = 0; i < this.pongInfo[room[0]].spectate.length; i++) {
        this.logger.log(`pannel: ${this.pongInfo[room[0]].spectate[i].pannel} x: ${this.pongInfo[room[0]].spectate[i].x} | y: ${this.pongInfo[room[0]].spectate[i].y}`)
      }

      this.server.to(client.id).emit('start', room[1].roomID);
    }

    @SubscribeMessage('RENDER')
    async render(client:Socket, roomID: string) {
      
      var room = this.getRoomByID(roomID);
      
      if (room != null) {
        
        if (this.pongInfo[room[0]].ready()) {

          if (this.pongInfo[room[0]].win()) {
            this.server.to(client.id).emit('finish', this.pongInfo[room[0]])
            return
          }
          for (let i = 0; i < 2; i++)
            if (this.pongInfo[room[0]].players[i].id == client.id) {
              this.pongInfo[room[0]].movePlayer()
              this.pongInfo[room[0]].moveBall()
            }
          
      }

        this.server.to(client.id).emit('render', this.pongInfo[room[0]])
      }
    }

    
    @SubscribeMessage('ENTER')
    async enter(client: Socket, info: [string, boolean]) {
      var room = this.getRoomByID(info[0])
      if (room != null) {

        for (let index = 0; index < 2; index++)
          if (this.pongInfo[room[0]].players[index].id == client.id)
            this.pongInfo[room[0]].players[index].ready = true

    }}

    @SubscribeMessage('SPACE')
    async space(client: Socket, info: [string, boolean]) {
      var room = this.getRoomByID(info[0])
      if (room != null) {

        for (let index = 0; index < 2; index++)
          if (this.pongInfo[room[0]].players[index].id == client.id) {
            if (info[1])
              this.pongInfo[room[0]].players[index].speed = 2
            else
              this.pongInfo[room[0]].players[index].speed = 1
          }

    }}

    @SubscribeMessage('ARROW_UP')
    async arrowUp(client: Socket, info: [string, boolean]) {
      var room = this.getRoomByID(info[0])
      if (room != null) {

        for (let index = 0; index < 2; index++)
          if (this.pongInfo[room[0]].players[index].id == client.id)
              this.pongInfo[room[0]].players[index].up = info[1]

    }}

    // info type: string -> roomID | boolean -> value of key (press or release)
    @SubscribeMessage('ARROW_DOWN')
    async arrowDown(client: Socket, info: [string, boolean]) {
      var room = this.getRoomByID(info[0])
      if (room != null) {
        
        for (let index = 0; index < 2; index++)
          if (this.pongInfo[room[0]].players[index].id == client.id)
              this.pongInfo[room[0]].players[index].down = info[1]

    }}

    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    /*                      POUR PONG                        */
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
}
