// export default
const clickHandlers = {
  // First screen handlers
  getPartOfData: () => {
    localStorage.setItem('type', 'part')
    window.location.href = './table.html'
  },
  getFullOfData: () => {
    localStorage.setItem('type', 'full')
    window.location.href = './table.html'
  },

  // Table handlers
  switchPageHandler: (value) => {
    const table = document.getElementById('table')
    table.setAttribute('current-page', value)
  },
  sortHandler: (value) => {
    const table = document.getElementById('table')
    const currentFlowArr = table.getAttribute('sort-flow').split('-')
    let sortDirection = 'up'
    if (currentFlowArr[0] === value) {
      if (currentFlowArr[1] === sortDirection) {
        table.setAttribute('sort-flow', value + '-down')
      } else {
        table.setAttribute('sort-flow', value + '-' + sortDirection)
      }
    } else {
      table.setAttribute('sort-flow', value + '-' + sortDirection)
    }
  }
}