<template>
  <div>
     <form>
      <label for="firstName">First name:</label>
      <input type="text" id="firstName" name="firstName" v-model="firstName"><br><br>
      <label for="lastName">Last name:</label>
      <input type="text" id="lastName" name="lastName" v-model="lastName"><br><br>
      <slot/>
      <RichTextEditor 
      v-bind:content-dispatch="RICH_TEXT_EDITOR.DISPATCH_NAME"
      v-bind:content-initial-value="editorContentHtml" 
      v-bind:content-property="RICH_TEXT_EDITOR.PROPERTY_NAME"
      style="border: thin solid #000000" ref="richTextEditor"/>
      <!--input type="submit" value="Submit" @click="setEditorContentHtml()"-->
    </form> 
    
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import RichTextEditor from "./RichTextEditor/RichTextEditor"
export default {
  name: "SampleForm",
  components: {
    RichTextEditor
  },
  computed: {
    ...mapState(["sampleFormStore"]),
    /*...mapGetters({
      firstName: "getFirstName",
      lastName: "getLastName",
      editorContentHtml: "getEditorContentHtml"
    }),*/
    firstName: {
      get() { return this.sampleFormStore.firstName },
      set(value) {
        this.$store.dispatch("setSampleFormStore", { property: "firstName", value: value } )
      }
    },
    lastName: {
      get() { return this.sampleFormStore.lastName },
      set(value) {
        this.$store.dispatch("setSampleFormStore", { property: "lastName", value: value } )
      }
    },
    editorContentHtml: {
      get() { return this.sampleFormStore.editorContentHtml },
      set(value) {
        this.$store.dispatch("setSampleFormStore", { property: "editorContentHtml", value: value } )
      }
    }
  },
  data: () => { 
    return {
      RICH_TEXT_EDITOR: {
        DISPATCH_NAME: "setSampleFormStore",
        PROPERTY_NAME: "editorContentHtml"
      }
    }
  }
  //methods: {
    //...mapActions([ "setSampleFormStore" ]),
    //setEditorContentHtml: () => {
      //debugger; 
      //this.editorContentHtml = $refs.richTextEditor.getEditorContentHtml();
      //windows.console.log("parent.editorContentHtml:", this.editorContentHtml)

    //}
  //},
}

</script>