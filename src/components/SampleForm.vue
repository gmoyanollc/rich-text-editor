<template>
  <div>
    <form>
      <label for="firstName">First name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        v-model="firstName"
      /><br /><br />
      <label for="lastName">Last name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        v-model="lastName"
      /><br /><br />
      <slot />
      <RichTextEditor
        v-bind:content-dispatch="RICH_TEXT_EDITOR.DISPATCH_NAME"
        v-bind:content-initial-value="editorContentHtml"
        v-bind:content-property="RICH_TEXT_EDITOR.PROPERTY_NAME"
        style="border: thin solid #000000"
        ref="richTextEditor"
      />
      <input type="submit" value="Submit" />
    </form>
  </div>
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
    ...mapGetters([
      "getFirstName",
      "getLastName",
      "getEditorContentHtml"
    ]),
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
        PROPERTY_NAME: "editorContentHtml"
      }
    };
  }
};
</script>
