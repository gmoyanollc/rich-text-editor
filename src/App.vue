<template>
  <div id="app">
    <p>
      <!--<router-link to="/tiptap">tiptap example</router-link>-->
      <!--<router-link to="/bar">Go to Bar</router-link>-->
    </p>
    <TiptapEditor/>
  </div>
</template>

<script>
import TiptapEditor from "./components/TiptapEditor"

export default {
  name: 'App',
  components: {
    TiptapEditor
  }
}

</script>

