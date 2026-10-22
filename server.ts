
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`)
  })
})

const PORT = Number(process.env.PORT) || 3001

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Socket.IO rodando na porta ${PORT}`)
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
