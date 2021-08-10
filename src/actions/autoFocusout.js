export function autoFocusout(node, focusoutListener) {
  const focusinListener = e => {
    e.stopPropagation()
  }
  setTimeout(() => {
    node.addEventListener('click', focusinListener)
    window.addEventListener('click', focusoutListener)
  })  
  // CallStack 동작 방식 때문에 렌더링 후에 포커스아웃이 동작됨
  // callback(focusoutListener) 함수는 setTimeout 이후(node 렌더링 이후)에 실행됨

  return {
    destroy() {
      node.removeEventListener('click', focusinListener)
      window.removeEventListener('click', focusoutListener)
    }
  }
}