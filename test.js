const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
  
  const doSomething = async () => {
    let i = 0;
    while (true) {
       await sleep(5000)
      console.log(i)
      i++
    }
  }
  
  doSomething()