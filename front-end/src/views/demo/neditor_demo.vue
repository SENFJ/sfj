<template>
  <div id="app">
      <div>
          <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="htmlForEditor">
          </vue-editor>      
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import util from '@/libs/util.js';
  import { VueEditor } from 'vue2-editor'
  import axios from 'axios'
  export default{
      components: {
        VueEditor
      },
      data(){
        return {
          htmlForEditor: '',
          addFormVisible: false
        }
      },
      methods: {
        handleImageAdded: function(file, Editor, cursorLocation) {
          // An example of using FormData
          // NOTE: Your key could be different such as:
          // formData.append('file', file)

          var formData = new FormData();
          formData.append('file', file)
          formData.append('file', file)
          let _self=this;
          util.post(this,'common/uploadToken',{},function(datas){ 
              formData.append('token', datas.token);
              axios({
                url: 'http://up.qiniu.com',
                method: 'POST',
                data: formData
              })
              .then((result) => {
                let url = 'http://p2fovavhn.bkt.clouddn.com/'+result.data.key; // Get url from response
                Editor.insertEmbed(cursorLocation, 'image', url);
              })           
              .catch((err) => {
                console.log(err);
              })                         
          });          
        }
      }
  }

</script>
