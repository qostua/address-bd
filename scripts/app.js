import { data } from '../data/data.js';

class AddressPage {
  constructor(data) {
    this.data = data;
  }

  init() {
    this.initSelects();
    this.initSearch();
    this.initTable();
  }

  // ПОЛЕ СЕЛЕКТ

  initSelects() {
    const selectNodes = document.querySelectorAll('.main__select-wrapper');

    selectNodes.forEach((select) => {
      const selectInputNode = select.querySelector('.main__select');
      const selectOptionNodes = select.querySelectorAll('.filter-value');

      selectOptionNodes.forEach((option) => {
        option.addEventListener('mousedown', () => {
          this.setSelectValue(select, option.querySelector('label').textContent);
        })
      });

      selectInputNode.addEventListener(
        'mousedown',
        (event) => {
          event.preventDefault();
          if (selectInputNode === document.activeElement) {
            selectInputNode.blur();
          } else {
            selectInputNode.focus();
          }
        },
      );

      selectInputNode.addEventListener(
        'focus',
        () => this.openSelect(select),
      );

      selectInputNode.addEventListener(
        'blur',
        () => this.closeSelect(select),
      );

      this.initSelectReset(select);
      this.initSelectSearch(select);
    });
  }

  initSelectSearch(selectWrapperNode) {
    const inputNode = selectWrapperNode.querySelector('input');
    const selectOptionNodes = selectWrapperNode.querySelectorAll('.filter-value');

    inputNode.addEventListener('input', () => {
      const inputValue = inputNode.value.toLowerCase();

      selectOptionNodes.forEach((option) => {
        if (inputValue === '') {
          setTimeout(() => {
            option.style.display = 'block';
          }, 300)

          return;
        }

        const optionValue = option.querySelector('label').textContent.toLowerCase();

        if (optionValue.startsWith(inputValue)) {
          option.style.display = 'block';
        } else {
          option.style.display = 'none';
        }
      })
    })
  }

  initSelectReset(selectWrapperNode) {
    const selectInputNode = selectWrapperNode.querySelector('input');
    const selectResetNode = selectWrapperNode.querySelector('.btn-select-reset');

    selectInputNode.addEventListener('input', () => {
      if (selectInputNode.value !== '') {
        selectResetNode.style.display = 'block';
      } else {
        selectResetNode.style.display = 'none';
      }
    });

    selectResetNode.addEventListener('click', () => {
      this.setSelectValue(selectWrapperNode, '');
      selectResetNode.style.display = 'none';
    });
  }

  openSelect(selectWrapperNode) {
    selectWrapperNode
      .querySelectorAll('[data-active="close"]')
      .forEach((node) => {
        node.dataset.active = 'open';
      });

    this.createPopupBackground();
  }

  closeSelect(selectWrapperNode) {
    selectWrapperNode
      .querySelectorAll('[data-active="open"]')
      .forEach((node) => {
        node.dataset.active = 'close';
      });

    this.removePopupBackground();
  }

  setSelectValue(selectWrapperNode, value) {
    const inputNode = selectWrapperNode.querySelector('input');
    inputNode.value = value;
    inputNode.dispatchEvent(new Event('input', { bubbles: true }));
  }

  createPopupBackground(zIndex) {
    this.removePopupBackground();

    const background = document.createElement('div');

    background.style.position = 'fixed';
    background.style.left = '0';
    background.style.top = '0';
    background.style.width = '100%';
    background.style.height = '100%';
    background.style.background = 'rgba(0, 0, 0, 0.4)';
    background.style.zIndex = zIndex ? zIndex.toString() : 'auto';

    background.id = 'select-background'

    document.body.append(background);
  }

  removePopupBackground() {
    const backgroundNode = document.querySelector('#select-background');

    backgroundNode && backgroundNode.remove();
  }

  // ПОЛЕ ПОИСКА

  initSearch() {
    const searchNodes = document.querySelectorAll('.input-search');

    searchNodes.forEach((search) => {
      const searchWrapperNode = search.parentNode;
      const searchResultNode = searchWrapperNode.querySelector('.prompt-search');

      this.initSearchReset(searchWrapperNode);
      this.initSearchResult(searchWrapperNode);

      search.addEventListener('focus', () => {
        this.showSearchLoop(searchWrapperNode);
        this.updateSearchResult(searchWrapperNode);
      });

      search.addEventListener('blur', () => {
        this.hideSearchLoop(searchWrapperNode);
        this.hideSearchResult(searchResultNode);
      });

      search.addEventListener('input', () => {
        this.updateSearchResult(searchWrapperNode);
      });
    })
  }

  initSearchReset(searchWrapperNode) {
    const searchInputNode = searchWrapperNode.querySelector('input');
    const searchResetNode = searchWrapperNode.querySelector('.btn-reset-search');

    searchInputNode.addEventListener('input', () => {
      if (searchInputNode.value !== '') {
        searchResetNode.style.display = 'block';
      } else {
        searchResetNode.style.display = 'none';
      }
    });

    searchResetNode.addEventListener('click', () => {
      this.setSearchValue(searchWrapperNode, '');
      this.hideSearchLoop(searchWrapperNode);
      searchResetNode.style.display = 'none';
    });
  }

  initSearchResult(searchWrapperNode) {
    const searchInputNode = searchWrapperNode.querySelector('input');
    const searchResultNode = searchWrapperNode.querySelector('.prompt-search');

    searchInputNode.addEventListener('input', () => {
      if (searchInputNode.value !== '') {


        this.renderSearchResult(
          this.getSearchResultData(),
          searchInputNode.value,
          searchResultNode,
        );
      } else {
        searchResultNode.style.display = 'none';
      }
    });

    searchResultNode.addEventListener('mousedown', (event) => {
      const searchValueNode = event.target.closest('.search-value');

      if (!searchValueNode) {
        return;
      }

      searchInputNode.value = this.getSearchValueText(searchValueNode);

      searchInputNode.dispatchEvent(new Event('input', { bubbles: true }));
    })
  }

  updateSearchResult(searchWrapperNode) {
    const searchInputNode = searchWrapperNode.querySelector('input');
    const searchResultNode = searchWrapperNode.querySelector('.prompt-search');

    const dataSearchValue = searchInputNode.dataset.searchValue;
    const searchInputValue = searchInputNode.value;

    this.renderSearchResult(
      this.getSearchResultData(
        dataSearchValue,
        searchInputValue,
      ),
      searchInputNode.value,
      searchResultNode,
    );
  }

  showSearchResult(searchResultNode) {
    const tableCellNode = searchResultNode.closest('td');

    tableCellNode.classList.add('active');

    searchResultNode.style.display = 'block';

    this.createPopupBackground(2001);
  }

  hideSearchResult(searchResultNode) {
    const tableCellNode = searchResultNode.closest('td');

    tableCellNode.classList.remove('active');

    searchResultNode.style.display = 'none';

    this.removePopupBackground();
  }

  renderSearchResult(data, searchValue, searchResultNode) {
    if (data.length === 0) {
      this.hideSearchResult(searchResultNode);

      return;
    }

    searchResultNode.innerHTML = data.map((item) => {
      return `
        <div class="search-value">
          <span class="highlight">${item.slice(0, searchValue.length)}</span>${item.slice(searchValue.length)}
        </div>
      `;
    }).join('');

    this.showSearchResult(searchResultNode);
  }

  getSearchValueText(searchValueNode) {
    return searchValueNode.textContent.trim();
  }

  getSearchResultData(dataSearchValue, searchInputValue) {
    if (!searchInputValue) {
      return [];
    }

    const normalizeSearchInputValue = searchInputValue.toLowerCase();

    const data = this.getData().filter((item) => {
      const value = item[dataSearchValue];

      if (!value) {
        return;
      }

      const normalizeValue = value.toLowerCase();

      if (!normalizeValue.startsWith(normalizeSearchInputValue)) {
        return;
      }

      return true;
    }).map((item) => item[dataSearchValue]);

    return data;
  }

  showSearchLoop(searchWrapperNode) {
    const loopIconNode = searchWrapperNode.querySelector('.search-table');
    const searchInputNode = searchWrapperNode.querySelector('input');

    loopIconNode.style.display = 'none';
    searchInputNode.style.padding = '0px 43px 0px 11px';
  }

  hideSearchLoop(searchWrapperNode) {
    const loopIconNode = searchWrapperNode.querySelector('.search-table');
    const searchInputNode = searchWrapperNode.querySelector('input');

    if (searchInputNode.value !== '') {
      return;
    }

    loopIconNode.style.display = 'block';
    searchInputNode.style.padding = '0px 43px 0px 40px';
  }

  setSearchValue(searchWrapperNode, value) {
    const inputNode = searchWrapperNode.querySelector('input');
    inputNode.value = value;
    inputNode.dispatchEvent(new Event('input', { bubbles: true }));
  }

  // ТАБЛИЦА

  initTable() {
    this.renderTable();
  }

  renderTable() {
    const tableWrapper = document.querySelector('.tr-wrapper');

    tableWrapper.innerHTML = this.getData().map((item, index) => {
      return this.renderRow(
        item,
        index + 1,
      )
    }).join('');
  }

  renderRow(rowData, index) {
    return `
      <tr class="tr-school" data-value-id="${rowData.id}">
        <td data-prop="№">
          <div class="td-name">№</div>
          <p class="td-num">${index}</p>
          <p class="table__value__id">${rowData.id}</p>
        </td>
        
        <td class="td-wrapper-icon">
          <div class="table-icon edit-btn" data-value="Редактировать" data-value-id="${rowData.id}">
            <span class="icon control-edit edit"></span>
          </div>
        </td>
        
        <td class="td-wrapper-icon">
          <div class="table-icon del-btn" data-value="Удалить" data-value-id="${rowData.id}">
            <span class="icon control-edit delete"></span>
          </div>
        </td>
        
        ${this.renderCommonCell('Регион', 'region', rowData.region)}
        ${this.renderCommonCell('Тип региона', 'regionType', rowData.regionType)}
        ${this.renderCommonCell('Район региона', 'regionDistrict', rowData.regionDistrict)}
        ${this.renderCommonCell('Деревня региона', 'regionVillage', rowData.regionVillage)}
        ${this.renderCommonCell('Тип деревни', 'villageType', rowData.villageType)}
        ${this.renderCommonCell('Город', 'city', rowData.city)}
        ${this.renderCommonCell('Деревня в городе', 'villageInCity', rowData.villageInCity)}
        ${this.renderCommonCell('Тип деревни в городе', 'villageInCityType', rowData.villageInCityType)}
        ${this.renderCommonCell('Улица', 'street', rowData.street)}
        ${this.renderCommonCell('Тип улицы', 'streetType', rowData.streetType)}
        ${this.renderCommonCell('Районы города', 'districtsCity', rowData.districtsCity)}
        
        <td>
          <div class="td-name">
            № дома.
            Тип строения.
            Номер
            строения
          </div>
          <div class="td-info-wrapper">
            <p class="addressHouse">${rowData.addressHouse ? rowData.addressHouse : ''}</p>
            <p class="addressHouseType">${rowData.addressHouseType ? rowData.addressHouseType : ''}</p>
            <p class="addressStructure">${rowData.addressStructure ? rowData.addressStructure : ''}</p>
          </div>
        </td>
        
        ${this.renderCommonCell('Метро', 'subway', rowData.subway)}
        
        <td>
          <div class="td-name">
            Индекс,
            широта,
            долгота
          </div>
          <div class="td-info-wrapper">
            <p class="addressHouse">${rowData.index ? rowData.index : ''}</p>
            <p class="coordinatesX">${rowData.coordinatesX ? rowData.coordinatesX : ''}</p>
            <p class="coordinatesY">${rowData.coordinatesY ? rowData.coordinatesY : ''}</p>
          </div>
        </td>
      </tr>
    `
  }

  renderCommonCell(cellName, cellType, caption) {
    return `<td>
      <div class="td-name">${cellName}</div>
      <p class="${cellType}">${caption ? caption : ''}</p>
    </td>`;
  }

  getData() {
    return this.data.slice();
  }
}

const addressPage = new AddressPage(
  data
);

addressPage.init();
