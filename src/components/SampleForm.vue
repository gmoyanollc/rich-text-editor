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
      <label for="richTextEditor" class="text-left">Rich Text Editor</label>
      <div
        id="richTextEditorDiv"
        class="form-group rich-text-editor"
        onmouseout="this.classList.toggle('rich-text-editor-mouseover');"
        onmouseover="this.classList.toggle('rich-text-editor-mouseover');"
      >
        <RichTextEditor
          id="richTextEditor"
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
import { mapGetters, mapState } from 'vuex';
import RichTextEditor from './RichTextEditor/RichTextEditor.vue';

export default {
  name: 'SampleForm',
  components: {
    RichTextEditor,
  },
  computed: {
    ...mapGetters(['getFirstName', 'getLastName', 'getEditorContentHtml']),
    ...mapState(['sampleFormStore']),
    firstName: {
      get() {
        return this.getFirstName;
      },
      set(value) {
        this.$store.dispatch('setSampleFormStore', {
          property: 'firstName',
          value,
        });
      },
    },
    lastName: {
      get() {
        return this.getLastName;
      },
      set(value) {
        this.$store.dispatch('setSampleFormStore', {
          property: 'lastName',
          value,
        });
      },
    },
    editorContentHtml: {
      get() {
        return this.getEditorContentHtml;
      },
      set(value) {
        this.$store.dispatch('setSampleFormStore', {
          property: 'editorContentHtml',
          value,
        });
      },
    },
  },
  data: () => ({
    RICH_TEXT_EDITOR: {
      DISPATCH_NAME: 'setSampleFormStore',
      PROPERTY_NAME: 'editorContentHtml',
      STYLE: 'height: 200px; overflow: auto;',
    },
  }),
};
</script>

<style>
.rich-text-editor {
  position: relative;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}
.rich-text-editor-mouseover {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
