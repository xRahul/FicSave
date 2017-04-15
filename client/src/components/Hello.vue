<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <button @click="ping()">Ping Server</button>
  </div>
</template>

<script>
  const helloData = {
    isConnected: false,
    socketMessage: '',
  };
  export default {
    data: () => (helloData),
    sockets: {
      connect() {
        this.isConnected = true;
      },
      disconnect() {
        this.isConnected = false;
      },
      message(data) {
        this.socketMessage = data;
      },
    },
    methods: {
      ping() {
        // Send the "pingServer" event to the server.
        this.$options.sockets.pong = () => {
          this.socketMessage = 'PONG';
        };
        this.$socket.emit('ping1');
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
