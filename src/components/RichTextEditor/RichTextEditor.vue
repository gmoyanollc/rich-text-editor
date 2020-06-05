<template>
  <div>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div style="text-align: center">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <EditorMenuBarIcon name="bold" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <EditorMenuBarIcon name="italic" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <EditorMenuBarIcon name="strike" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <EditorMenuBarIcon name="underline" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <EditorMenuBarIcon name="code" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <EditorMenuBarIcon name="paragraph" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <EditorMenuBarIcon name="ul" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <EditorMenuBarIcon name="ol" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <EditorMenuBarIcon name="quote" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <EditorMenuBarIcon name="code" />
        </button>

        <button class="menubar__button" @click="commands.horizontal_rule">
          <EditorMenuBarIcon name="hr" />
        </button>

        <button class="menubar__button" @click="commands.undo">
          <EditorMenuBarIcon name="undo" />
        </button>

        <button class="menubar__button" @click="commands.redo">
          <EditorMenuBarIcon name="redo" />
        </button>
      </div>
    </editor-menu-bar>
    <div id="richTextEditorDiv">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";
import EditorMenuBarIcon from "./EditorMenuBarIcon";
import { mapGetters, mapState } from "vuex";

export default {
  name: "TiptapEditor",
  components: {
    EditorMenuBar,
    EditorContent,
    EditorMenuBarIcon
  },
  data() {
    return {
      editor: null,
      editorContentHtml: "html"
    };
  },
  // prettier-ignore
  props: { 
    contentDispatch:      String,
    contentInitialValue:  String,
    contentProperty:      String
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History()
      ],
      content: this.contentInitialValue,
      onUpdate: ({ getJSON, getHTML }) => {
        this.$store.dispatch(this.contentDispatch, {
          property: this.contentProperty,
          value: getHTML()
        });
      }
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>

<style>
.menubar__button {
  background-color: #fff;
  border: none;
}
.ProseMirror {
  height: 500px;
}

.ProseMirror:focus {
  outline: none;
}
#richTextEditorDiv {
  border: 1px solid black;
  overflow-y: auto;
}
</style>
