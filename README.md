# rich-text-editor

> A sample Vue.js project for RichTextEditor.

RichTextEditor is a Vue component that enables the editting and formatting of text content.  Formatted text content is represented with HTML tags.  When rendered as HTML, the text content is displayed formatted.

The parent component only interfaces with RichTextEditor and has control its styling. The parent does not have control of styling the EditorMenuBar component. A quirk is that the menu bar is scrolled away when the editor fills.

## Build Setup

``` bash
# install dependencies
npm install

# serve for debugging with hot reload at localhost:8080
npm run dev

# build for debugging from a remote http server
npm run dev-build

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Usage In Your Component

 1. Copy `RichTextEditor` folder to your project's components folder.
 
 2. Install Tiptap components. 

``` bash
  npm install --save tiptap tiptap-extensions
```

 3. Insert and style a `RichTextEditor` element in your component: 
 
``` html
  <template>
+   <RichTextEditor
+      class="border border-secondary rounded text-left"
+   />
  </template>
```

 4. Import and export `Rich Text Editor`:

``` javascript
+  import RichTextEditor from "./RichTextEditor/RichTextEditor";
   export default {
     components: {
+      RichTextEditor
     }
   }
```

 5. Declare and initialize local keys and values to bind with `Rich Text Editor` props:

``` javascript
   data: () => {
     return {
+      RICH_TEXT_EDITOR: {
+        DISPATCH_NAME: "setSampleFormStore",
+        PROPERTY_NAME: "editorContentHtml",
+        STYLE: "height: 12em; overflow: auto;"
+      }
     };
   }
```

6. Bind `RichTextEditor` props to the parent store and optional styling.  Pass the dispatch name, state property name and the property's initial value. 

``` html
   <template>
     <RichTextEditor
       class="border border-secondary rounded text-left"
+      v-bind:content-dispatch="RICH_TEXT_EDITOR.DISPATCH_NAME"
+      v-bind:content-property="RICH_TEXT_EDITOR.PROPERTY_NAME"
+      v-bind:content-style="RICH_TEXT_EDITOR.STYLE"
+      v-bind:content-initial-value="editorContentHtml"
     />
   </template>
```

## Sample
Open and try [SampleForm vue component](./src/components/SampleForm.vue) for an example implementation. 

 1. Run sample by building it first and then hosting it with NodeJS. 
 ``` bash
   npm run dev-build; cd ./dist; node ../test/server.js index.html 8080
 ```
---

        
