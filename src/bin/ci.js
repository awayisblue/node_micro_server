
async function exec () {

}
exec().then((res) => {
  console.log(res)
  process.exit(0)
}).catch((err) => {
  console.log(err)
  process.exit(1)
})
