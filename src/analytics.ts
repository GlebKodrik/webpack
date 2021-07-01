const createAnalytics = ():object => {
  let count = 0;
  let isDestroyed:boolean = false;

  const listener = ():number => count++;

  document.addEventListener('click' , listener);

  return{
    destroy(){
      document.removeEventListener('click' , listener)
      isDestroyed =  true;
    },
    getAnalytics(){
      if(isDestroyed){
        return `Analytics is delete. Total clicks = ${count}`
      }
      return count;
    }
  }
}

window.analytics = createAnalytics()