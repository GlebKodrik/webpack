start = async() => {
  return Promise.resolve('async work')
}
start().then(console.log)