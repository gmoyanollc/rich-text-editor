# rich-text-editor

> A sample Vue.js project for RichTextEditor.

RichTextEditor is a Vue component that enables the editting and formatting of text content.  Formatted text content is represented with HTML tags.  When rendered as HTML, the text content is displayed formatted.

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

## Usage

 1. Insert and style `RichTextEditor` element and in the parent Template: 
 
``` xml
<template>
  <RichTextEditor
    style="border: thin solid #000000"
  />
</template>
```
 2. Bind `RichTextEditor` props for updates to the parent store.  Pass the dispatch name, state property name and the property's initial value. 

 ``` xml
<template>
  <RichTextEditor
    v-bind:content-dispatch="STORE_DISPATCH_NAME"
    v-bind:content-initial-value="editorContentHtml"
    v-bind:content-property="STORE_PROPERTY_NAME"
    style="border: thin solid #000000"
  />
</template>
```

## Sample
Open and try [SampleForm vue component](./src/components/SampleForm.vue) for an example implementation. 

---

        
