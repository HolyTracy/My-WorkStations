<template>
    <div>
        <input
            type="file"
            id="file"
            style="display:none;"
            multiple
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            @change="fileReader($event)"
        />
        <el-button @click="selectFile('orderFee')" type="primary">orderFee</el-button>
        <el-button @click="selectFile('productInfo')" type="primary">productInfo</el-button>
        <el-button @click="exportExcel" type="primary">导出</el-button>
    </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
    name: 'excel',
    data() {
        return {
            productInfo: [],
            orderFee: [],
            result: [],
            excelType: ''
        }
    },
    compute: {},
    watch: {},
    methods: {
        fileReader(e) {
            this.excelType === 'productInfo' ? this.importProductInfo(e) : this.importOrderFee(e)
        },
        selectFile(type) {
            this.excelType = type
            document.getElementById('file').click()
        },
        importProductInfo(e) {
            this.utils.excelProcessor(e, dataArray => {
                this.productInfo = dataArray
            })
        },
        importOrderFee(e) {
            this.utils.excelProcessor(e, dataArray => {
                this.orderFee = dataArray
            })
        },
        dataProcessor() {
            let seletedRow = null
            this.productInfo.forEach((row, index) => {
                seletedRow = this.orderFee.find(
                    item =>
                        row[0].trim() == item[0].trim() &&
                        row[1].trim() == item[3].trim() &&
                        row[13].trim() == item[1].trim() &&
                        row[14].trim() == item[2].trim()
                )
                if (seletedRow) {
                    row[17] = seletedRow[4]
                    row[18] = seletedRow[5]
                    debugger
                    row[19] = row[17] + row[18]
                    let U = row[20] ? row[20] / 100 : 1
                    row[21] = row[19] * row[7] * 0.8 + row[19] * row[7] * 0.2 * U
                    row[22] = row[19] * row[9]
                    row[23] = row[19] * row[16] - row[21] - row[22]
                }
                seletedRow = null
            })
        },
        exportExcel() {
            this.dataProcessor()
            this.utils.exportExcel(this.productInfo, 'test.xlsx')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
