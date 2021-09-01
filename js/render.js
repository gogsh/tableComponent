// Uncomment imports if you want use modules
// import sort from '../js/sort'
// import createTable from './components/Table/Table'


// Styles
// import tableStyle from './components/Table/TableStyles'

// Icons
const sortArrowUp = `<svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 8H0L5.5 0L11 8Z" fill="#BBBBBB"/></svg>`
const sortArrowDown = `<svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 0H0L5.5 8L11 0Z" fill="#BBBBBB"/></svg>`

// How many items will be display on one page
const ITEMS_ON_PAGE = 10
// const state = []



function createPages(data, pageLength) {
  let dataLength = data.length
  const pages = []
  for (let i = 1; i <= Math.ceil(dataLength / pageLength); i++) {
    pages.push(data.splice(0, pageLength))
  }
  if (data.length !== 0) {
    pages.push(data)
  }
  return pages
}

function renderTable(tableDataURL) {
  fetch(tableDataURL).then(response => {
    return response.json()
  }).then(data => {
    const pages = createPages(data, 10)
    // state.push(...pages)
    customElements.define('table-data', createTable(pages, ITEMS_ON_PAGE))
  })
}



renderTable(
  localStorage.type === 'part'
    ? 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}'
    : 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}'
)
