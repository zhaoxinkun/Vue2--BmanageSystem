<script>
export default {
  name: "Dialog",
  props: {
    // 标题
    DialogTitle: {
      type: String,
      default: "提示"
    },
    // 是否显示
    visible: {
      type: Boolean,
      default: false
    },

  },
  methods: {
    cancel() {
      // 同步修改父组件数据
      this.$emit("update:visible", !this.visible);
    },
    confirm() {
      this.$emit("confirm");
    }
  }
}
</script>

<template>
  <div>
    <el-dialog
        :title="DialogTitle"
        :visible.sync="visible"
        width="30%">
      <!--    插槽-->
      <slot>
        <span>你是傻逼吗</span>
      </slot>

      <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>
