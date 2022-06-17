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

    @SubscribeMessage('JOIN_QUEUE')
    async joinQueue(client:Socket) {
      
      this.server.to(client.id).emit('joined')

      for (let roomId = 0; ; roomId++) {
        var room: [number, gameRoomClass] | null = this.getRoomByID(roomId.toString())
        if (room == null || !room[1].players[1].id) {
          if (room == null) {
            this.pongInfo.push(new gameRoomClass(roomId.toString(), client.id))
            room = this.getRoomByID(roomId.toString());
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

    @SubscribeMessage('RENDER')
    async render(client:Socket, roomID: string) {
      
      var room = this.getRoomByID(roomID);
      
      if (room != null) {
        
        if (this.pongInfo[room[0]].ready()) {

          this.pongInfo[room[0]].movePlayer()
          
          this.pongInfo[room[0]].moveBall()
          
          if (this.pongInfo[room[0]].win())
           this.server.to(client.id).emit('finish', this.pongInfo[room[0]])
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
