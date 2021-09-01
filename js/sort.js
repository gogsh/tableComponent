function sort(data, method) {
  if (method[0] === 'id') {
    if (method[1] === 'up') {
      return data.flat().sort((a, b) => {
        return a[method[0]] - b[method[0]]
      })
    } else {
      return data.flat().sort((a, b) => {
        return b[method[0]] - a[method[0]]
      })
    }

  } else {
    if (method[1] === 'up') {
      return data.flat().sort((a, b) => {
        if (a[method[0]] > b[method[0]]) {
          return 1;
        }
        if (a[method[0]] < b[method[0]]) {
          return -1;
        }
        return 0;
      })
    } else return data.flat().sort((a, b) => {
      if (a[method[0]] < b[method[0]]) {
        return 1;
      }
      if (a[method[0]] > b[method[0]]) {
        return -1;
      }
      return 0;
    })
  }
}
