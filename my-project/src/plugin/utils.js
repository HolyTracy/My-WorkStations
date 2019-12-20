/**
 * create by chen
 * 工具类
 */
import XLSX from 'xlsx'
const readWorkbookFromLocalFile = (file, callback) => {
    const reader = new FileReader()
    reader.onload = function(e) {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        if (callback) callback(workbook)
    }
    reader.readAsBinaryString(file)
}
const readWorkbook = workbook => {
    const sheetNames = workbook.SheetNames
    const worksheet = workbook.Sheets[sheetNames[0]]
    const csv = XLSX.utils.sheet_to_csv(worksheet)
    const dataArray = csv2array(csv)
    return dataArray
}
const csv2array = csv => {
    const rows = csv.split('\n')
    rows.pop()
    return rows.map(row => row.split(','))
}
const array2csv = arr => {
    arr = arr.map(row => row.join())
    return arr.join('\n')
}
const csv2sheet = csv => {
    var sheet = {} // 将要生成的sheet
    csv = csv.split('\n')
    csv.forEach(function(row, i) {
        row = row.split(',')
        if (i == 0)
            sheet['!ref'] = 'A1:' + String.fromCharCode(65 + row.length - 1) + (csv.length - 1)
        row.forEach(function(col, j) {
            sheet[String.fromCharCode(65 + j) + (i + 1)] = { v: col }
        })
    })
    return sheet
}
const sheet2blob = (sheet, sheetName = 'sheet1') => {
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    }
    workbook.Sheets[sheetName] = sheet
    // 生成excel的配置项
    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    }
    var wbout = XLSX.write(workbook, wopts)
    var blob = new Blob([s2ab(wbout)], {
        type: 'application/octet-stream'
    })
    // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
        return buf
    }
    return blob
}
const openDownloadDialog = (url, saveName) => {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url) // 创建blob地址
    }
    var aLink = document.createElement('a')
    aLink.href = url
    aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event
    if (window.MouseEvent) event = new MouseEvent('click')
    else {
        event = document.createEvent('MouseEvents')
        event.initMouseEvent(
            'click',
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            0,
            false,
            false,
            false,
            false,
            0,
            null
        )
    }
    aLink.dispatchEvent(event)
}
class utils {
    static excelProcessor = (e, callback) => {
        const fileList = e.target.files
        if (fileList.length == 0) return
        const f = fileList[0]
        if (!/\.xlsx$/g.test(f.name)) {
            alert('仅支持读取xlsx格式！')
            return
        }
        readWorkbookFromLocalFile(f, workbook => {
            callback(readWorkbook(workbook))
        })
    }
    static exportExcel = (dataArray, name) => {
        const csv = array2csv(dataArray)
        const sheet = csv2sheet(csv)
        const blob = sheet2blob(sheet)
        openDownloadDialog(blob, name)
    }
}

var obj = {
    install(Vue) {
        Vue.prototype.utils = utils
    }
}

export { obj as default, utils }
