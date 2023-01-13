type ElMessageBox = typeof import('element-plus')['ElMessageBox'];
type Ttoast = {
    $message: typeof import('element-plus')['ElMessage'],
    $notify: typeof import('element-plus')['ElNotification'],
    $confirm: ElMessageBox.confirm,
    $alert: ElMessageBox.alert,
    $prompt: ElMessageBox.prompt,
}