/**
* @auther: kid1999
* @date: 2019/11/20 23:03
* @desciption:  缺课信息填报
*/
<template>
<el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="课程名称">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="课程id">
        <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="缺课课时">
        <el-select v-model="form.times" placeholder="请选择课时">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="缺课说明">
        <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">上报</el-button>
        <el-button   @click="onClose">取消</el-button>
        <el-button type="danger" @click="disagree">异议</el-button>
    </el-form-item>
</el-form>
</template>

<script>
    export default {
        name:"missCourseaplicate",
        data() {
            return {
                form: {
                    name: '',
                    id: '',
                    times: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                this.$axios.push('/MissTable', this.form).then(function (res) {
                    console.log(res)
                })
            },
                disagree(){
                    this.$axios.push('/MissTable', this.form).then(function (res) {
                        console.log(res)
                    })
                },
            onClose(){
                this.$router.push({path:"/",query:{user_id:'1'}});
            }

    }

    }

</script>