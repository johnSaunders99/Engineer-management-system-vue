/**
* @auther: kid1999
* @date: 2019/11/20 23:03
* @desciption:  课程申报
*/
<template>
    <div class="TestWord">

        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column prop="coursesName" label="课程名称">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.coursesName" placeholder="课程名称"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="coursePoint" label="课程学分">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.coursePoint" placeholder="课程学分"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="courseTime" label="课程课时">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.courseTime" placeholder="课程课时"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="courseTerm" label="学年">
                <template slot-scope="scope">
                    <el-date-picker
                            v-model="scope.row.courseTerm"
                            type="year"
                            placeholder="选择学年">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column prop="courseSemester" label="学期">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.courseSemester" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="status" align="center" label="审核状态">
                <template slot-scope="scope">
                    <el-popover
                        placement="bottom"
                        title="审核状态"
                        width="200"
                        trigger="click">
                        <el-steps :space="200" :active="scope.row.checkStatus">
                            <el-step title="未上传" icon="el-icon-edit"></el-step>
                            <el-step title="审核中" icon="el-icon-upload"></el-step>
                            <el-step title="审核通过" icon="el-icon-picture"></el-step>
                        </el-steps>
                        <el-button slot="reference" size="mini" type="primary">查看<i class="el-icon-upload el-icon--right"></i></el-button>
                    </el-popover>


                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button size="mini"
                                   type="primary"
                                   @click="addLine"
                                   icon="el-icon-plus"  circle>
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                v-if="!scope.row.editing"
                                icon="el-icon-delete"
                                @click="handleDelete(scope.$index, scope.row)" circle>
                        </el-button>
                    </template>
            </el-table-column>
        </el-table>
        <div align="center">
        <el-button @click="addLine" icon="el-icon-add" >添加课程</el-button>
        <el-button @click="save">提交</el-button>
        </div>
    </div>
</template>

<script>
    // import axios from 'axios'
    export default {
        name:'courseApplicateTable',
        data() {
            return {
                tableData:[],
                options:['春季学期','秋季学期'],
            }
        },
        // 創建時 加载
        created:function(){
            this.$axios.get('/applicateTable', {
                params: {
                    userId:'123456789',     //暂时先模拟登陆信息
                    userStatus:3
                }
            }).then((data) =>{
                console.log(data);
                this.tableData = data.data;
                for (var i=0;i<this.tableData.length;i++){
                if(this.tableData[i].checkStatus == 0){
                    this.tableData.splice(i,1)}}}
        );
            this.addLine();
        },
        methods:{
            addLine(){ //添加行数
                var newValue = {
                    coursesName:'',
                    coursePoint:'1',
                    courseTime:'16',
                    courseTerm:'',
                    courseSemester:'',
                    checkStatus:1,
                };
                //添加新的行数
                this.tableData.push(newValue);
            },
            handleDelete(index){ //删除行数
                this.tableData.splice(index, 1)
            },
            save(){  //  保存
                var arr = [];
                this.$confirm('是否确定提交信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (var i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].checkStatus == 0){
                            this.tableData.splice(i,1)
                        }
                        if(this.tableData[i].checkStatus == 1){
                            this.tableData[i].checkStatus = 2;
                            arr.push(this.tableData[i]);
                        }
                    }
                    var _this = this;
                    console.log(JSON.stringify(arr));
                    this.$axios.post("/applicateTable",arr).then((data) =>{
                        console.log(data);
                        _this.$message.success("恭喜你，课程已提交申请");
                    }).catch(function (error) {
                        console.log(error);
                        _this.$message.error('错了哦，这是一条错误消息');
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            }
        }
    }
</script>

<style scoped>

</style>
