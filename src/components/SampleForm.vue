<template>
  <b-container>
    <br /><br />
    <b-form>
      <b-form-input
        type="text"
        id="firstName"
        name="firstName"
        placeholder="First Name"
        v-model="firstName"
      /><br /><br />
      <b-form-input
        type="text"
        id="lastName"
        name="lastName"
        placeholder="Last Name"
        v-model="lastName"
      /><br /><br />
      <slot />
      <div id="richTextEditorDiv">
        <RichTextEditor
          v-bind:content-dispatch="RICH_TEXT_EDITOR.DISPATCH_NAME"
          v-bind:content-property="RICH_TEXT_EDITOR.PROPERTY_NAME"
          v-bind:content-style="RICH_TEXT_EDITOR.STYLE"
          v-bind:content-initial-value="editorContentHtml"
        />
      </div>
      <br /><br />
      <b-button>Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
export default {
  name: "SampleForm",
  components: {
    RichTextEditor
  },
  computed: {
    ...mapGetters(["getFirstName", "getLastName", "getEditorContentHtml"]),
    ...mapState(["sampleFormStore"]),
    firstName: {
      get() {
        return this.getFirstName;
      },
      set(value) {
        this.$store.dispatch("setSampleFormStore", {
          property: "firstName",
          value: value
        });
      }
    },
    lastName: {
      get() {
        return this.getLastName;
      },
      set(value) {
        this.$store.dispatch("setSampleFormStore", {
          property: "lastName",
          value: value
        });
      }
    },
    editorContentHtml: {
      get() {
        return this.getEditorContentHtml;
      },
      set(value) {
        this.$store.dispatch("setSampleFormStore", {
          property: "editorContentHtml",
          value: value
        });
      }
    }
  },
  data: () => {
    return {
      RICH_TEXT_EDITOR: {
        DISPATCH_NAME: "setSampleFormStore",
        PROPERTY_NAME: "editorContentHtml",
        STYLE: "height: 200px; overflow: auto;"
      }
    };
  }
};
</script>

<style>
#richTextEditorDiv {
  border-color: rgb(182, 181, 181);
  border-radius: 5px;
  border-style: solid;
  border-width: thin;
  position: relative;
  width: 100%;
}
</style>
