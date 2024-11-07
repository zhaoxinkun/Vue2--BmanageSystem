/**
 *
 * 弹框提示函数
 * @param context
 * @param title
 * @param message
 * @param type
 * */
export function notifyError(context, title, message, type) {
    context.$notify({
        title: title || '申请失败',
        message: message || '申请失败,请思考原因',
        type: 'error' || type
    });
}
