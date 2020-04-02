<template>
  <div>
    <!-- <div id="toolbar">
      <button class="ql-bold">Bold</button>
      <button class="ql-italic">Italic</button>
    </div> -->
    <div class="container" v-bind:class="'oak-editor-' + id"></div>
  </div>
</template>
<script>
import Quill from 'quill';
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];
export default {
  name: 'OakEditorQuill',
  props: {
    id: String,
    data: String,
  },
  data: function() {
    return {
      quillData: {
        initialized: false,
        options: {
          modules: {
            toolbar: toolbarOptions,
          },
          theme: 'snow',
        },
        editor: null,
      },
    };
  },
  mounted() {
    this.quillData.editor = new Quill(
      `.oak-editor-${this.id}`,
      this.quillData.options
    );
    this.quillData.editor.on('text-change', () => {
      this.initialized = true;
      // this.$emit('change', this.quillData.editor.root.innerHTML);
      this.quillData.editor.on('text-change', () => this.update());
    });
    this.quillData.editor.root.innerHTML = this.data;
  },
  // watch: {
  //   data: function() {
  //     if (!this.initialized) {
  //       this.quillData.editor.root.innerHTML = this.data;
  //     }
  //   },
  // },
  methods: {
    update: function() {
      this.$emit(
        'change',
        this.quillData.editor.getText()
          ? this.quillData.editor.root.innerHTML
          : ''
      );
    },
  },
};
</script>
<style lang="scss" scoped>
@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
// .container {
//   background-color: white;
// }
</style>
