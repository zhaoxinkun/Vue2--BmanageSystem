<script>
export default {
  name: "Dialog2",
  props: {
    // 提示标题
    dialogTitle: {
      type: String,
      required: true,
      default: "提示"
    },
    dialogBtn: {
      type: String,
      required: true,
      default: "确定"
    },
    // 是否显示
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cancel() {
      this.$emit("update:visible", !this.visible);
    },
    confirm() {
      this.$emit("confirm");
    }
  }
}
</script>

<template>

  <el-dialog
      :title="dialogTitle"
      :visible.sync="visible"
      width="30%"
  >
    <slot>这是一段信息</slot>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="confirm">{{ dialogBtn}}</el-button>
  </span>
  </el-dialog>

</template>
