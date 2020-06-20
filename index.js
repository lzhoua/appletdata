const readline = require('readline')
const httpApi = require('./api')

const { getAccessToken, getVisitTrend } = httpApi

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('这是一个很好的东西:\n', async (answer) => {
  console.log('---answer--->', answer)
  const {code, access_token} = await getAccessToken('wx696a42df4f2456d3', '604994e566fc62c1c7d4b3d1c1ef63f4')
  if (code === 0) {
    const visit = await getVisitTrend(access_token, '20200618')
    if (visit.code === 0) {
      const { ref_date, session_cnt, visit_pv, visit_uv } = visit.data
      console.table({
        '日   期': `${ref_date.slice(0, 4)}-${ref_date.slice(4, 6)}-${ref_date.slice(6, 8)}`,
        '打开次数': session_cnt,
        '访问次数': visit_pv,
        '访问人数': visit_uv
      })
    }
  }

  rl.close()
})