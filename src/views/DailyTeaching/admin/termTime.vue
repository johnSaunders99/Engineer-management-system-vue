<template>
    <div id="test">

        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="开学第一天日期" prop="firstDay"></el-table-column>
            <el-table-column label="学年" prop="year"></el-table-column>
            <el-table-column label="学期" prop="term"></el-table-column>
            <el-table-column align="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div align="center">
            <el-button @click="dialogFormVisible = true" icon="el-icon-add" >新加规则</el-button>
        </div>



        <!-- 删除信息弹出 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>你确定要删除此纪录吗？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="to_delete()">确 定</el-button>
  </span>
        </el-dialog>


        <!--  会员信息弹出  -->
        <el-dialog title="会员信息" :visible.sync="dialogFormVisible">

            <el-form :model="form" status-icon :rules="rules" ref="ruleForm">

                <el-form-item label="开学第一天日期">
                    <el-date-picker v-model="form.firstDay" prop="firstDay" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="学年">
                    <el-date-picker v-model="form.year" prop="year" type="year" placeholder="选择年"></el-date-picker>
                </el-form-item >
                <el-form-item label="学期">
                    <el-select v-model="form.term" prop="term" placeholder="活动区域">
                        <el-option label="春季学期" value="春季学期"></el-option>
                        <el-option label="秋季学期" value="秋季学期"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"  @click="submitForm('form')">确 定</el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "members",
        data() {

            return {
                tableData:[],
                dialogFormVisible: false,
                dialogVisible:false,
                formLabelWidth: '120px',
                changeIndex:-1, //修改列
                deleteIndex:-1,
                form: {},
                rules: {
                    firstDay:'',
                    year: '',
                    term: ''
                }
            };
        },
        methods: {
            // 表单核对
            submitForm() {
                this.dialogFormVisible = false;
                var dd = new Date(this.form.firstDay);
                this.form.firstDay = dd.getFullYear() +'年'+ (dd.getMonth()+1) + '月' +dd.getDate() + '日';
                this.form.year = new Date(this.form.year).getFullYear();
                // this.to_save();
                if(this.changeIndex === -1){
                    this.tableData.push(this.form);
                }else{
                    this.tableData[this.changeIndex] = this.form;
                }
            this.form = {};
            this.changeIndex = -1;
            },

            // onSubmit() {
            //     var _self = this;
            //     console.info("post: ");
            //     console.info(this.formInline);
            //     this.$axios.post("/term",{
            //         firstDay: _self.formInline.firstDay,
            //         term:  _self.formInline.term,
            //         year:  parseInt(_self.formInline.year.getFullYear()),
            //     }).then((response) =>{
            //         console.info(response.data);
            //         if(response.data['statusCode'] === 1){
            //             _self.$message.success("恭喜你，添加成功！");
            //         }else{
            //             _self.$message.error('添加失败');
            //         }
            //     });
            // },

            // 修改信息
            handleEdit(index) {
                this.changeIndex = index;
                console.info(this.tableData);
                console.info(index);
                this.form = {};
                this.dialogFormVisible = true;
            },

            // 删除信息
            handleDelete(index, row) {
                this.dialogVisible = true;
                this.deleteIndex = index;
                console.info(this.deleteIndex);
                this.form = row;
            },

            // axios delete()
            to_delete(){
                this.dialogVisible = false;
                var _self = this;
                var deleteIndex = this.deleteIndex;
                var param = _self.form;
                this.$axios.delete('/term',{data: param}).then(function (response) {
                    var res = response.data;
                    if(res['statusCode'] === 1){
                        _self.tableData.splice(deleteIndex,1);
                        _self.$message.success(res['info']);
                    }else{
                        _self.$message.error(res['info']);
                    }
                }).catch(function () {
                    _self.$message.error("请求错误！");
                });
                this.form = {};
                this.deleteIndex = -1;
            },

            // axios save()
            to_save() {
                var self = this;
                this.$axios.post('/term', self.form).then(function (response) {
                    var res = response.data;
                    if(res['statusCode'] === 1){    // 后端返回成功
                        self.$message.success(res['info']);
                    }else{
                        self.$message.error(res['info']);
                    }
                }).catch(function () {
                    self.$message.error("请求错误！");
                });
            },


        },
        mounted() {
            var self = this;
            this.$axios.get("/term").then((response)=>{
                let data = response.data;
                console.info(data);
                self.tableData = data;
                return response.data;
            })
        }

    }
</script>

<style scoped>

</style>
