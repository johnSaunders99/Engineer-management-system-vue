/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'
import checkCourseTime from '@/views/DailyTeaching/engineer/checkCourseTime'
import courseApplicateTable from '@/views/DailyTeaching/engineer/courseApplicateTable'
import missCourseapplicate from '@/views/DailyTeaching/engineer/missCourseapplicate'
const DailyTeachingRouter = {
  path: '/DailyTeaching',
  component: Layout,
  redirect: 'noRedirect',
  name: 'DailyTeaching',
  meta: {
    title: '日常授课模块',
    icon: 'chart'
  },
  children: [
    {
      path: 'checkCourseTime',
      component: checkCourseTime,
      name: 'checkCourseTime',
      meta: { title: '课时核对', noCache: true }
    },
    {
      path: 'courseApplicateTable',
      component: courseApplicateTable,
      name: 'courseApplicateTable',
      meta: { title: '课程申请表', noCache: true }
    },
    {
      path: 'missCourseapplicate',
      component: missCourseapplicate,
      name: 'missCourseapplicate',
      meta: { title: '缺课原因填写', noCache: true }
    }
  ]
}

export default DailyTeachingRouter
