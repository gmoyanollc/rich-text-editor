<template>
  <div>
     <form>
      <label for="fname">First name:</label>
      <input type="text" id="fname" name="fname"><br><br>
      <label for="lname">Last name:</label>
      <input type="text" id="lname" name="lname"><br><br>
      <slot/>
      <RichTextEditor style="border: thin solid #000000"/>
      <input type="submit" value="Submit">
    </form> 
    
  </div>
</template>

<script>
import RichTextEditor from "./RichTextEditor/RichTextEditor"
export default {
  name: "SampleForm",
  components: {
    RichTextEditor
  }
}

</script>