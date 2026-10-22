
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`)
  })
})

httpServer.listen(3001, () => {
  console.log('Servidor Socket.IO rodando em http://localhost:3001')
})

// Eventos de demonstração para testar atualizações em tempo real.
setInterval(() => {
  io.emit('nft.updated', {
    message: 'Atualização simulada de NFTs',
    updatedAt: new Date().toISOString(),
  })
}, 15000)

setInterval(() => {
  io.emit('order.updated', {
    message: 'Atualização simulada de pedidos',
    updatedAt: new Date().toISOString(),
  })
}, 20000)
