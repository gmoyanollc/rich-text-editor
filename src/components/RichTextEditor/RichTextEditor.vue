<template>
  <div id="templateRootDiv">
    <div id="editorMenuBarDiv">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div id="editorMenuBarDiv">
          <button
            title="bold"
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <EditorMenuBarIcon name="bold" />
          </button>

          <button
            title="italic"
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <EditorMenuBarIcon name="italic" />
          </button>

          <button
            title="strike"
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <EditorMenuBarIcon name="strike" />
          </button>

          <button
            title="underline"
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <EditorMenuBarIcon name="underline" />
          </button>

          <button
            title="code"
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <EditorMenuBarIcon name="code" />
          </button>

          <button
            title="paragraph"
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <EditorMenuBarIcon name="paragraph" />
          </button>

          <button
            title="heading level 1"
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>

          <button
            title="heading level 2"
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>

          <button
            title="heading level 3"
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

          <button
            title="bullet list"
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <EditorMenuBarIcon name="ul" />
          </button>

          <button
            title="ordered list"
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <EditorMenuBarIcon name="ol" />
          </button>

          <button
            title="quote block"
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <EditorMenuBarIcon name="quote" />
          </button>

          <button
            title="code block"
            type="button"
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <EditorMenuBarIcon name="code" />
          </button>

          <button
            title="horizontal line"
            type="button"
            class="menubar__button"
            @click="commands.horizontal_rule"
          >
            <EditorMenuBarIcon name="hr" />
          </button>

          <button
            title="undo"
            type="button"
            class="menubar__button"
            @click="commands.undo"
          >
            <EditorMenuBarIcon name="undo" />
          </button>

          <button
            title="redo"
            type="button"
            class="menubar__button"
            @click="commands.redo"
          >
            <EditorMenuBarIcon name="redo" />
          </button>
        </div>
      </editor-menu-bar>
    </div>
    <div id="editorContentDiv" v-bind:style="contentStyle">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
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
  History,
} from 'tiptap-extensions';
import EditorMenuBarIcon from './EditorMenuBarIcon.vue';

export default {
  name: 'TiptapEditor',
  components: {
    EditorMenuBar,
    EditorContent,
    EditorMenuBarIcon,
  },
  data() {
    return {
      editor: null,
    };
  },
  // prettier-ignore
  props: {
    contentDispatch: String,
    contentInitialValue: String,
    contentProperty: String,
    contentStyle: String,
  },
  watch: {
    contentInitialValue(value) {
      if (this.editor && this.editor.getHTML().length <= 7) {
        // content is empty ('<p></p>')
        this.editor.setContent(value);
      } // Editor.onUpdate() is not triggered
    },
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
        new History(),
      ],
      onUpdate: ({ getHTML }) => {
        this.$store.dispatch(this.contentDispatch, {
          property: this.contentProperty,
          value: getHTML(),
        });
      },
    });
    if (this.editor.getHTML().length <= 7) this.editor.setContent(this.contentInitialValue);
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style>
#editorMenuBarDiv {
  text-align: center;
}
#templateRootDiv {
  height: 100%;
  position: relative;
  width: 100%;
}
.menubar {
  margin-bottom: 1rem;
  -webkit-transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
}
.menubar.is-hidden {
  visibility: hidden;
  opacity: 0;
}
.menubar.is-focused {
  visibility: visible;
  opacity: 1;
  -webkit-transition: visibility 0.2s, opacity 0.2s;
  transition: visibility 0.2s, opacity 0.2s;
}
.menubar__button {
  font-weight: 700;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  background: transparent;
  border: 0;
  color: #000;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
}
.menubar__button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.menubar__button.is-active {
  background-color: rgba(0, 0, 0, 0.1);
}
.menubar span.menubar__button {
  font-size: 8px; /*13.3333px;*/
}
.menububble {
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  z-index: 20;
  background: #000;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity 0.2s, visibility 0.2s;
  transition: opacity 0.2s, visibility 0.2s;
}
.ProseMirror {
  outline: none;
  height: 5em; /** increase edit area to render mouse pointer as a cursor */
  margin: 0.5rem;
}
</style>
