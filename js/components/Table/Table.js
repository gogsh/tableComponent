
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

      const navRenderForBigData = (numberOfPages, navLimit) => {
        const currentPageNumber = Number(currentPage)
        const firstIndex = 1
        const lastIndex = numberOfPages
        const lengthFromStart = currentPageNumber - firstIndex
        const lengthFromLast = lastIndex - currentPageNumber
        const stepLength = (navLimit - 1) / 2
        const stepLeftIndex = currentPageNumber - stepLength
        const stepRigthIndex = currentPageNumber + stepLength
        let result = ``
        if (lengthFromStart < stepLength) {
          let diff = stepLength - lengthFromStart
          for (let i = 0; i < stepRigthIndex + diff; i++) {
            result += `<button onclick='clickHandlers.switchPageHandler(${i + 1})' 
            class='nav' id='${'button-' + i}' 
            value=${(i + 1).toString()} 
            ${currentPage - 1 === i ? 'disabled' : ''}>${i + 1}</button>`
          }
        } else if (lengthFromLast < stepLength) {
          let diff = stepLength - lengthFromLast
          for (let i = stepLeftIndex - diff - 1; i < lastIndex; i++) {
            result += `<button onclick='clickHandlers.switchPageHandler(${i + 1})' 
            class='nav' id='${'button-' + i}' 
            value=${(i + 1).toString()} 
            ${currentPageNumber - 1 === i ? 'disabled' : ''}>${i + 1}</button>`
          }
        } else {
          for (let i = stepLeftIndex - 1; i < stepRigthIndex; i++) {
            result += `<button onclick='clickHandlers.switchPageHandler(${i + 1})' 
            class='nav' id='${'button-' + i}' 
            value=${(i + 1).toString()} 
            ${currentPageNumber - 1 === i ? 'disabled' : ''}>${i + 1}</button>`
          }
        }
        return `<button onclick='clickHandlers.switchPageHandler(${1})'
        class='side_buttons' id='${'button-toStart-' + 1}' ${currentPage == 1 ? 'disabled' : ''}
        >В начало</button> ${result}
        <button onclick='clickHandlers.switchPageHandler(${numberOfPages})'
        class='side_buttons' id='${'button-toEnd-' + numberOfPages}' ${currentPage == numberOfPages ? 'disabled' : ''}       
        >... ${numberOfPages}</button>`
      }

      const navRender = (numberOfPages) => {
        if (numberOfPages > 12) {
          return navRenderForBigData(numberOfPages, 11)
        }
        let result = ``
        for (let i = 0; i < numberOfPages; i++) {
          result += `<button onclick='clickHandlers.switchPageHandler(${i + 1})' 
          class='nav' id='${'button-' + i}' 
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