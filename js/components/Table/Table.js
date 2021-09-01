
function createTable(data) {
  return class Table extends HTMLElement {
    constructor() {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
    }
    connectedCallback() {
      console.log('RENDER')
      this.render()
    }

    static get observedAttributes() {
      return ['current-page', 'sort-flow'];
    }

    attributeChangedCallback(name, newValue) {
      this.render();
    }

    render() {
      const currentPage = this.getAttribute('current-page')
      const sortFlowArray = this.getAttribute('sort-flow').split('-')
      const sortedData = sort(data, sortFlowArray)
      const pages = createPages(sortedData, ITEMS_ON_PAGE)
      const sortIconRender = (flowArr, cellName) => {
        if (flowArr[0] === cellName) {
          if (flowArr[1] === 'up') {
            return sortArrowUp
          } else return sortArrowDown
        } else return ''
      }
      const page = pages[currentPage - 1].reduce((acc, item) => {
        return acc = acc + `
        <tr>
          <td>${item.id}</td> 
          <td>${item.firstName}</td>
          <td>${item.lastName}</td>
          <td>${item.email}</td>
          <td>${item.phone}</td>
        </tr>
        `
      }, ``)
      const navRender = (numberOfPages) => {
        let result = ``
        for (let i = 0; i < numberOfPages; i++) {
          result += `<button onclick='clickHandlers.switchPageHandler(${i + 1})' 
          class='nav' id='${'button-' + i}' 
          current-page='${currentPage}' 
          value=${(i + 1).toString()} 
          ${currentPage - 1 === i ? 'disabled' : ''}>${i + 1}</button>`
        }
        return result
      }
      this.shadow.innerHTML = `
        ${tableStyle}
        <table>
        <tr> 
          <th onclick='clickHandlers.sortHandler("id")'>id ${sortIconRender(sortFlowArray, 'id')}</th>
          <th onclick='clickHandlers.sortHandler("firstName")'>firstName ${sortIconRender(sortFlowArray, 'firstName')}</th>
          <th onclick='clickHandlers.sortHandler("lastName")'>lastName ${sortIconRender(sortFlowArray, 'lastName')}</th>
          <th onclick='clickHandlers.sortHandler("email")'>email ${sortIconRender(sortFlowArray, 'email')}</th>
          <th onclick='clickHandlers.sortHandler("phone")'>phone ${sortIconRender(sortFlowArray, 'phone')}</th>
        </tr>
        ${page}
      </table>
      <div>
        ${navRender(data.length)}
      </div>
      `      
    }
  }
}