<template>
  <div class="container valign">
    <h1>FicSave</h1>
    <h2>An Open-Source Online Fanfiction Downloader</h2>
    <div class="row">
      <div class="col s12">
        <div class="row">
          <div class="input-field col s9 l5">
            <input id="url" type="url" name="url" class="validate" value=""/>
            <label for="url" class="grey-text text-lighten-1">Fanfic URL</label>
          </div>
          <div class="input-field col s3 l2">
            <select id="format" name="format">
              <option value="epub">ePub</option>
              <option value="mobi">MOBI</option>
              <option value="txt">Text</option>
            </select>
            <label class="grey-text text-lighten-1" for="format">Format</label>
          </div>
          <div class="input-field col s12 l3">
            <input id="email" type="email" name="email" class="validate"/>
            <label for="email" class="grey-text text-lighten-1">Email (optional)</label>
          </div>
          <div class="input-field col s12 l2">
            <button class="btn waves-effect col s12">Download</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12 l7 offset-l2 center-align" style="max-height: 200px; overflow-y: auto;">
        <table id="downloads" class="responsive-table centered">
          <tbody v-for="download in downloads">
          <tr>
            <td v-text="download.story.title + ' - ' + download.story.author + '.' + download.format"></td>
            <td>
              <span v-if="download.status == -1" v-text="'Error: ' + download.statusMessage"></span>
              <span v-if="download.status == 0" v-text="'Pending'"></span>
              <span v-if="download.status == 1" v-text="'Downloading chapter ' + download.currentChapter + ' of ' + download.numChapters"></span>
              <span v-if="download.status == 2" v-text="'Download complete; starting build...'"></span>
              <span v-if="download.status == 3" v-text="'Building eBook...'"></span>
              <span v-if="download.status == 4 || download.status == 5"><a :href="'/download/' + download.id" class="blue-text text-lighten-3" v-text="'Download File'"></a></span>
              <span v-if="download.status == 6" v-text="'Email sent!'"></span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isConnected: false,
    socketMessage: '',
    downloads: [],
  }),
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
  mounted: () => {
    $(document).ready(() => {
      $('select').material_select();
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-family: 'Indie Flower', cursive;
  font-size: 5em;
  margin: 0;
  color: #fff;
}
h2 {
  font-family: 'Indie Flower', cursive;
  font-size: 2.5em;
  margin: 0 0 30px 0;
}
</style>
