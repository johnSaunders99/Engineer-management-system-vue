/**
* @auther: kid1999
* @date: 2019/11/20 23:03
* @desciption:  admin 的课程信息管理
*/
/* eslint-disable */

<template>
	<div id="courseInfo">
		<el-page-header title="返回上层" @back="goBack" content="课表管理">
		</el-page-header>
		<el-table
		:data="courseTable.slice((currentPage-1)*pagesize,currentPage*pagesize)"
		show-summary
		style="width: 100%" >

			<el-table-column
					prop="id"
					label="课程编号"
					width="180">
			</el-table-column>
			<el-table-column
					prop="name"
					label="课程名"
					width="180">
			</el-table-column>
			<el-table-column
					prop="course_time"
					label="课时"
					width="180">
			</el-table-column>
			<el-table-column
					prop="credit"
					label="学分"
					width="180">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
							size="mini"
							@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button
							size="mini"
							type="danger"
							@click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
		layout="prev, pager, next"
		@current-change="current_change"
		:total="total"
		background
		>
		</el-pagination>
	</div>
</template>

<script>
  export default {
      name: "courseInfo",
      data() {
          return {
              total:500,
              currentPage:1,
              pagesize:10,
              courseTable: [{
                  id: 1,
                  name:'大数据导论',
                  course_time: 32,
                  credit: 2
              }, {
                  id: 2,
                  name:'大数据导论',
                  course_time: 32,
                  credit: 2
              }, {
                  id: 3,
                  name:'大数据导论',
                  course_time: 32,
                  credit: 2
              }, {
                  id: 4,
                  name:'大数据导论',
                  course_time: 32,
                  credit: 2
              }]
          }
      },
      methods: {
          goBack(){
              this.$router.push({path:"/",query:{user_id:'4'}});
       },
          current_change:function(currentPage){
              this.currentPage = currentPage;
       },
          handleEdit(index, row) {
              console.log(index, row);
          },
          handleDelete(index, row) {
              console.log(index, row);

          },
      },
      // 創建時 加载
      created:function(){
          this.total=this.courseTable.length;
          this.$axios.get('/courseInfo', {
              params: {
                  userId:'123456789',     //暂时先模拟登陆信息
              }
          }).then((data) => {
          console.log(data);
          this.courseTable = data.data;
          });
          this.addLine();
      }
  }
</script>

<style scoped>

</style>