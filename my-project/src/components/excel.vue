<template>
    <div class="tien">
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
        <el-button @click="exportExcel1" type="primary">需求1导出</el-button>
        <el-divider></el-divider>
        <el-button @click="selectFile('aggregation')" type="primary">需求三</el-button>
        <el-button @click="exportExcel3" type="primary">需求3导出</el-button>
    </div>
</template>

<script>
export default {
    name: 'excel',
    data() {
        return {
            productInfo: [],
            orderFee: [],
            result3: [
                [
                    '账期',
                    '角色',
                    '合作方名称',
                    '支付方式',
                    '产品包名称',
                    '结算用户数',
                    '实收结算金额',
                    '考核分',
                    '带动订购分成结算费',
                    '片源占比分成结算费',
                    '播放时长分成结算费',
                    '播放次数分成结算费',
                    '含税合计结算金额',
                    '不含税合计结算金额',
                    '实际结算金额'
                ]
            ],
            excelType: ''
        }
    },
    compute: {},
    watch: {},
    methods: {
        fileReader(e) {
            const fileList = e.target.files
            if (fileList.length == 0) return
            Array.prototype.forEach.call(fileList, file => {
                switch (this.excelType) {
                    case 'productInfo':
                        this.importProductInfo(file)
                        break
                    case 'orderFee':
                        this.importOrderFee(file)
                        break
                    case 'aggregation':
                        this.importLotsOfExcel(file)
                        break
                    default:
                        return
                }
            })
        },
        selectFile(type) {
            this.excelType = type
            document.getElementById('file').click()
        },
        importProductInfo(file) {
            this.utils.excelProcessor(file, (dataArray, name) => {
                this.productInfo = dataArray
            })
        },
        importOrderFee(file) {
            this.utils.excelProcessor(file, (dataArray, name) => {
                this.orderFee = dataArray
            })
        },
        importLotsOfExcel(file) {
            this.utils.excelProcessor(file, (dataArray, name) => {
                this.dataProcessor3(dataArray, name)
            })
        },
        dataProcessor3(data, name) {
            const isMore = data[3].indexOf('带动订购分成结算费') > -1
            const nameInfo = name.split(/-|_|[.]/)
            const endIndex = data.findIndex(item => item[1] === '合计')
            data = data.slice(5, endIndex)
            let row = []
            data.forEach(item => {
                row.push(nameInfo[0])
                row.push(nameInfo[2])
                row.push(nameInfo[3])
                row.push(nameInfo[4])
                row.push(item[1])
                row.push(item[4])
                row.push(item[7])
                row.push(item[8])
                if (isMore) {
                    row.push(item[10])
                    row.push(item[11])
                    row.push(item[12])
                    row.push(item[13])
                    row.push(item[14])
                    row.push(item[15])
                    row.push(item[17])
                } else {
                    row.push(0)
                    row.push(0)
                    row.push(0)
                    row.push(0)
                    row.push(item[10])
                    row.push(item[11])
                    row.push(item[13])
                }
                this.result3.push(row)
                row = []
            })
        },
        dataProcessor1() {
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
                    row[19] = row[17] + row[18]
                    let U = row[20] ? row[20] / 100 : 1
                    row[21] = row[19] * row[7] * 0.8 + row[19] * row[7] * 0.2 * U
                    row[22] = row[19] * row[9]
                    row[23] = row[19] * row[16] - row[21] - row[22]
                }
                seletedRow = null
            })
        },
        exportExcel1() {
            this.dataProcessor1()
            this.utils.exportCSV(this.productInfo, '需求1.csv')
        },
        exportExcel3() {
            this.utils.exportCSV(this.result3, '需求3.csv')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tien {
    position: absolute;
    height: 719px;
    width: 1080px;
    background: url('../../static/tien.jpeg') center center no-repeat;
    background-size: 100% 100%;
}
</style>
