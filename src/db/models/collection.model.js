class Collection {
  constructor(data = []) {
    this._data = data;
  }

  create(element) {
    this._data.push(element);
    return { ...element };
  }

  getAll(options = {}) {
    const { substr, limit, sortBy, searchBy } = options;
    let copy = [...this._data];
    if (substr && searchBy) {
      copy = copy.filter(el => el[searchBy].includes(substr));
    }
    if (sortBy) {
      copy.sort((a, b) => a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase()));
    }
    if (limit) {
      copy = copy.slice(0, +limit);
    }
    return copy;
  }

  getById(id) {
    const found = this._data.find((el) => String(el.id) === String(id));
    return found || null;
  }

  raw() {
    return this._data;
  }

  remove(id) {
    const found = this._data.find((el) => String(el.id) === String(id));
    if (found) {
      found.isDeleted = true;
    }
    return found;
  }

  update(id, override = {}) {
    const foundIndex = this._data.findIndex((el) => String(el.id) === String(id));
    let found = null;
    if (foundIndex !== -1) {
      this._data[foundIndex] = {
        ...this._data[foundIndex],
        ...override
      };
      found = { ...this._data[foundIndex] };
    }
    return found;
  }
}

module.exports = Collection;
