import { data } from '../data/data.js';
import { regions } from '../data/regions.js';

// variables
const inpRegion = document.querySelector('.js-select-region');
const inpTypeSchool = document.querySelector('.js-select-type-school');
const selectElArr = document.querySelectorAll('.main__select');
const selectArrowArr = document.querySelectorAll('.btn-select');
const selectResetArr = document.querySelectorAll('.btn-select-reset');
const promptArr = document.querySelectorAll('.prompt-filter');
const btnApply = document.querySelector('.btn-apply-filter');
const searchInput = document.querySelectorAll('.input-search');
const btnSearchResetArr = document.querySelectorAll('.btn-reset-search');
const exportBtnEl = document.querySelector('.js-popup-export');
const popupExport = document.querySelector('.export');
const popupEdit = document.querySelector('.popup-edit');
const delBtnArr = document.querySelectorAll('.del-btn');
const popupDel = document.querySelector('.popup-delete');
const schoolIdEl = document.querySelector('.school-id');
const schoolFullNameEl = document.querySelector('.school-name');
const filtersWrapper = document.querySelector('.js-region-filters__wrapper');
const promptSearchArr = document.querySelectorAll('.prompt-search');
const btnTotalEl = document.querySelector('.js-btn-total');
const fieldInTotalEl = document.querySelector('.js-total-value');
const loopIconsArr = document.querySelectorAll('.search-table');
const btnAddAltEl = document.querySelector('.btn-add-alt');
const newAltWrapper = document.querySelector('.wrap-forms-edit');
const btnSaveEdit = document.querySelector('.btn-save');
const importBtnEl = document.querySelector('.js-popup-import');
const popupImport = document.querySelector('.import');
const titlePage = document.querySelector('.title-page__wrapper');
const btnRegionArr = document.querySelectorAll('.filter-region');
const checkboxTypeSchoolArr = document.querySelectorAll('.js-checkbox-school-type');
const inputArr = document.querySelectorAll('input');
const main = document.querySelector('.main');
const inpExportEl = document.querySelector('.input-export');
const linkDownloadEl = document.querySelector('.link-download');
let inpFullName = document.querySelector('.edit-fullname');
let inpInn = document.querySelector('.edit-inn');

const pFileName = document.querySelector('.filename');
const inpImportEl = document.querySelector('.input-import');
let dataPrev = [];
let inputEditsHTML = '';
let inputEditsWrapper = [];
let regionValueInput;
let scrollPosition;
let dataSlice = data.slice(0);
let editBtnArr = document.querySelectorAll('.edit-btn');
let scroll = JSON.parse(localStorage.getItem('pos'));
let count = 0;
let matchingTr = [];
let n = 0;
let countAddALtClick = 1;
let newALtNameFormHTML = '';
let idTrTable = '';
let inpNewValues = document.querySelectorAll('.edit-inp');
let dataFilters = [];
let i = 0;
let j = 0;
let arrFiltersType = [];
let arrSchoolTypeSelect = '';
let countAllCheckbox = 0;
let renderTableHTML = '';

function checkUndef(prop) {
  if (prop === undefined) {
    return '';
  } else return prop;
}
// Scroll position
window.addEventListener('scroll', () => {
  scrollPosition = window.scrollY;
  localStorage.setItem('pos', scrollPosition);
});
window.onload = () => {
  window.scrollTo({ top: scroll });
};

//Render table
function tableRender(dataValue) {
  const tbodyWrapperEl = document.querySelector('.tr-wrapper');
  tbodyWrapperEl.innerHTML = '';
  renderTableHTML = '';

  dataValue.forEach((school, index) => {
    let trEl = document.createElement('tr');
    trEl.classList.add('tr-school');
    let htmlThead = `
        <td class="table_mobile-thead">
        <div class="thead-container"> 
         <div class="thead-mobile-name">${school.fullName}</div>
          <div class="icons-wrapper-thead">
            <div class="thead-icon">
              <div class="table-icon edit-btn" data-value="Редактировать" data-value-id="${school.id}">
                <span class="icon control-edit edit" ></span>
              </div>
            </div>
            <div class="thead-icon">
              <div class="table-icon del-btn" data-value="Удалить" data-value-id="${school.id}" data-full-name="${school.fullName}">
                <span class="icon control-edit delete"></span>
              </div>
            </div>
          </div>
        </div>
      </td>
    `;
    let htmlTdNum = `<td data-prop="№">
      <div class="td-name">№</div>
      <p class="td-num">${index + 1}</p>
      <p class="table__value__id">${school.id}</p>
      </td>
      <td class="td-wrapper-icon">
      <div class="table-icon edit-btn" data-value="Редактировать" data-value-id="${school.id}">
        <span class="icon control-edit edit" ></span>
      </div>
      </td>
      <td class="td-wrapper-icon" >
      <div class="table-icon del-btn" data-value="Удалить" data-value-id="${
        school.id
      }" data-full-name="${school.fullName}">
        <span class="icon control-edit delete"></span>
      </div>
      </td>`;
    let htmlTdInfoAndFullNames = `   
      <td>
      <div class="td-name">ИНН\nАббревиатура\nГод</div>
      <div class="td-info-wrapper">
      <p>${checkUndef(school.inn)}</p>
      <p class="fullname fullname-abbr">${school.fullName}</p>
      <p class="table__abbr">${checkUndef(school.abbr)}</p>
      <p class="table__year-name">${checkUndef(school.year)}</p>
      </div>
      </td>
      <td>
      <div class="td-name">Полное название</div>
      <p class="fullname"> ${school.fullName}</p>
      </td>
    `;
    let htmlTfoot = `
    <td class="table_mobile-tfoot">
    <div class="table-icon edit-btn" data-value="Редактировать" data-value-id="${school.id}">
      <span class="icon control-edit edit" ></span>
    </div>
    <div class="table-icon del-btn" data-value="Удалить" data-value-id="${school.id}" data-full-name="${school.fullName}">
      <span class="icon control-edit delete"></span>
    </div>
    </td>`;

    setTimeout(() => {
      let altName1 = document.createElement('td');
      altName1.classList.add('td-alt');
      let tdTitleMobile = document.createElement('div');
      tdTitleMobile.classList.add('td-name');
      tdTitleMobile.innerText = `Альтернативное\nназвание`;
      altName1.append(tdTitleMobile);
      let altNameValues = document.createElement('div');
      altName1.append(altNameValues);
      altNameValues.classList.add('alt-name');
      let pNameAlt = document.createElement('p');
      let pYearAlt = document.createElement('p');
      pYearAlt.dataset.prevValue = checkUndef(school.year);
      pYearAlt.classList.add('table__year');
      pNameAlt.innerText = `${checkUndef(school.alt1)}`;
      pYearAlt.innerText = `${checkUndef(school.year1)}`;
      altNameValues.append(pNameAlt);
      altNameValues.append(pYearAlt);
      trEl.append(altName1);
      let altName2 = document.createElement('td');
      altName2.classList.add('td-alt');
      let tdTitleMobile2 = document.createElement('div');
      tdTitleMobile2.classList.add('td-name');
      tdTitleMobile2.innerText = `Альтернативное\nназвание`;
      altName2.append(tdTitleMobile2);
      let altNameValues2 = document.createElement('div');
      altName2.append(altNameValues2);
      altNameValues2.classList.add('alt-name');
      let pNameAlt2 = document.createElement('p');
      let pYearAlt2 = document.createElement('p');
      pYearAlt2.classList.add('table__year');
      pNameAlt2.innerText = `${checkUndef(school.alt2)}`;
      pYearAlt2.innerText = `${checkUndef(school.year2)}`;
      pYearAlt2.dataset.prevValue = checkUndef(school.year1);
      altNameValues2.append(pNameAlt2);
      altNameValues2.append(pYearAlt2);
      trEl.append(altName2);
    }, 0);
    setTimeout(() => {
      let altName3 = document.createElement('td');
      altName3.classList.add('td-alt');
      let tdTitleMobile3 = document.createElement('div');
      tdTitleMobile3.classList.add('td-name');
      tdTitleMobile3.innerText = `Альтернативное\nназвание`;
      altName3.append(tdTitleMobile3);
      let altNameValues3 = document.createElement('div');
      altName3.append(altNameValues3);
      altNameValues3.classList.add('alt-name');
      let pNameAlt3 = document.createElement('p');
      let pYearAlt3 = document.createElement('p');
      pYearAlt3.dataset.prevValue = checkUndef(school.year2);
      pYearAlt3.classList.add('table__year');
      pNameAlt3.innerText = `${checkUndef(school.alt3)}`;
      pYearAlt3.innerText = `${checkUndef(school.year3)}`;
      altNameValues3.append(pNameAlt3);
      altNameValues3.append(pYearAlt3);
      trEl.append(altName3);
      let altName4 = document.createElement('td');
      altName4.classList.add('td-alt');
      let tdTitleMobile4 = document.createElement('div');
      tdTitleMobile4.classList.add('td-name');
      tdTitleMobile4.innerText = `Альтернативное\nназвание`;
      altName4.append(tdTitleMobile4);
      let altNameValues4 = document.createElement('div');
      altName4.append(altNameValues4);
      altNameValues4.classList.add('alt-name');
      let pNameAlt4 = document.createElement('p');
      let pYearAlt4 = document.createElement('p');
      pYearAlt4.classList.add('table__year');
      pNameAlt4.innerText = `${checkUndef(school.alt4)}`;
      pYearAlt4.innerText = `${checkUndef(school.year4)}`;
      pYearAlt4.dataset.prevValue = checkUndef(school.year3);
      altNameValues4.append(pNameAlt4);
      altNameValues4.append(pYearAlt4);
      trEl.append(altName4);
    }, 4);
    setTimeout(() => {
      let altName5 = document.createElement('td');
      altName5.classList.add('td-alt');
      let tdTitleMobile5 = document.createElement('div');
      tdTitleMobile5.classList.add('td-name');
      tdTitleMobile5.innerText = `Альтернативное\nназвание`;
      altName5.append(tdTitleMobile5);
      let altNameValues5 = document.createElement('div');
      altName5.append(altNameValues5);
      altNameValues5.classList.add('alt-name');
      let pNameAlt5 = document.createElement('p');
      let pYearAlt5 = document.createElement('p');
      pYearAlt5.classList.add('table__year');
      pNameAlt5.innerText = `${checkUndef(school.alt5)}`;
      pYearAlt5.innerText = `${checkUndef(school.year5)}`;
      pYearAlt5.dataset.prevValue = checkUndef(school.year4);
      altNameValues5.append(pNameAlt5);
      altNameValues5.append(pYearAlt5);
      trEl.append(altName5);
      let altName6 = document.createElement('td');
      altName6.classList.add('td-alt');
      let tdTitleMobile6 = document.createElement('div');
      tdTitleMobile6.classList.add('td-name');
      tdTitleMobile6.innerText = `Альтернативное\nназвание`;
      altName6.append(tdTitleMobile6);
      let altNameValues6 = document.createElement('div');
      altName6.append(altNameValues6);
      altNameValues6.classList.add('alt-name');
      let pNameAlt6 = document.createElement('p');
      let pYearAlt6 = document.createElement('p');
      pYearAlt6.classList.add('table__year');
      pNameAlt6.innerText = `${checkUndef(school.alt6)}`;
      pYearAlt6.innerText = `${checkUndef(school.year6)}`;
      pYearAlt6.dataset.prevValue = checkUndef(school.year5);
      altNameValues6.append(pNameAlt6);
      altNameValues6.append(pYearAlt6);
      trEl.append(altName6);
    }, 7);
    setTimeout(() => {
      document.querySelectorAll('.alt-name').forEach((el) => {
        el.innerText == '' ? el.parentNode.classList.add('empty') : false;
      });
    }, 8);

    trEl.setAttribute('data-value-id', school.id);
    trEl.insertAdjacentHTML('beforeend', htmlThead);
    trEl.insertAdjacentHTML('beforeend', htmlTdNum);
    trEl.insertAdjacentHTML('beforeend', htmlTdInfoAndFullNames);
    trEl.insertAdjacentHTML('beforeend', htmlTfoot);
    tbodyWrapperEl.append(trEl);
  });

  //Btn edit
  editBtnArr = document.querySelectorAll('.edit-btn');
  editBtnArr.forEach((edit) => {
    edit.addEventListener('click', () => {
      btnAddAltEl.disabled = false;
      idTrTable = edit.dataset.valueId;
      matchingTr = dataSlice.filter((el) => el.id == idTrTable);
      let valuesCount = +matchingTr.map((el) => Object.keys(el).length).join('');
      inputEditsWrapper = document.querySelector('.popup-edit-content-wrapper');
      matchingTr.forEach((trValue) => {
        if (valuesCount == 23) {
          countAddALtClick = 6;
        } else if (valuesCount == 8) {
          countAddALtClick == 1;
        } else if (valuesCount == 11) {
          countAddALtClick == 2;
        } else if (valuesCount == 14) {
          countAddALtClick == 3;
        } else if (valuesCount == 17) {
          countAddALtClick == 4;
        } else if (valuesCount == 20) {
          countAddALtClick == 5;
        }
        inputEditsHTML = `
        <div class="input__wrapper" style="flex-direction: column; align-items: flex-start">
       <label class="edit-label" data-edit-value="inn" pattern="[0-9]{10}"
         >ИНН
         <input class="edit-inp edit-inn" type="number" max="9999999999" placeholder="Введите ИНН" data-edit-value="inn" value="${
           trValue.inn
         }"
       /> <div class="prompt-edit">
         <span class="icon" style="color: #D11521"></span>
         <span class="prompt-edit-text">Уже есть в БД id<span class="js-edit-id"></span>, поэтому нельзя добавить в БД</spanclass>
           
       </div>
     </label>
       <label class="edit-label " data-edit-value="fullName"
         >Полное название
         <input type="text" class="edit-inp edit-fullname" placeholder="Введите полное название" data-edit-value="fullName" value="${
           trValue.fullName
         }"
       />
       <div class="prompt-edit">
         <span class="icon" style="color: #D11521"></span>
         <span class="prompt-edit-text">Уже есть в БД id<span class="js-edit-id"></span>, поэтому нельзя добавить в БД</spanclass>
       </div>
      </label>
      <div class="row-inputs">
     
          <label class="edit-label" data-edit-value="abbr"
            >Аббревиатура
            <input type="text" class="edit-inp" placeholder="Введите аббревиатуру" data-edit-value="abbr" value="${checkUndef(
              trValue.abbr
            )}"
          /></label>
          <label class="edit-label" data-edit-value="year"

            > <span>Год</span>
            <input
              type="number"
              class="edit-inp year-inp"
              maxlength="4"
              min="1800"
              max="2024"
              placeholder="Введите год"
              pattern="[0-9]{4}" data-edit-value="year" value="${checkUndef(trValue.year)}"
          /></label>
      </div>
     </div>
        `;
        matchingId = trValue.id;
      });
      inputEditsWrapper.innerHTML = inputEditsHTML;
      if (valuesCount == 23) {
        for (let k = 0; k < 6; k++) {
          newAltWrapper.insertAdjacentHTML(
            'beforeend',
            `<div class="popup-edit-content-wrapper" data-edit-form-id="${k + 1}">
                  <div
                    class="input__wrapper"
                    style="flex-direction: column; align-items: flex-start">
                    <div class="popup-value__title">
                      <h3>Альтернативное название №${k + 1}</h3>
                      <div
                        class="table-icon del-alt-name js-edit-btn-altDel"
                        data-value="Удалить"
                        data-edit-altDel="${k}">
                        <span class="icon control-edit delete"></span>
                      </div>
                    </div>
                         <label class="edit-label" data-edit-value="alt${
                           k + 1
                         }">Полное наименование <input class="edit-inp fullAlt" type="text" placeholder="Введите полное наименование №${
              k + 1
            }" data-edit-value="fullName${k + 1}" /></label>
                    <div class="row-inputs">
                      <label class="edit-label" data-edit-value="alt${
                        k + 1
                      }">Альтернативное название <input class="edit-inp" type="text" placeholder="Введите альтернативное название №${
              k + 1
            }" data-edit-value="alt${k + 1}" /></label>
                      <label class="edit-label" data-edit-value="year${
                        k + 1
                      }">Год <input type="number" class="edit-inp year-inp" data-edit-value="alt${
              k + 1
            } maxlength="4" min="1800" max="2400"placeholder="Введите год" /></label>
                    </div>
                  </div>
              </div>`
          );
        }
      } else if (valuesCount == 11) {
        for (let k = 0; k < 2; k++) {
          newAltWrapper.insertAdjacentHTML(
            'beforeend',
            `<div class="popup-edit-content-wrapper" data-edit-form-id="${k + 1}">
                  <div
                    class="input__wrapper"
                    style="flex-direction: column; align-items: flex-start">
                    <div class="popup-value__title">
                      <h3>Альтернативное название №${k + 1}</h3>
                      <div
                        class="table-icon del-alt-name js-edit-btn-altDel"
                        data-value="Удалить"
                        data-edit-altDel="${k + 1}">
                        <span class="icon control-edit delete"></span>
                      </div>
                    </div>
                         <label class="edit-label" data-edit-value="alt${
                           k + 1
                         }">Полное наименование <input class="edit-inp" type="text" placeholder="Введите полное наименование №${
              k + 1
            }" data-edit-value="fullName${k + 1}" /></label>
                    <div class="row-inputs">
                      <label class="edit-label" data-edit-value="alt${
                        k + 1
                      }">Альтернативное название <input class="edit-inp fullAlt" type="text" placeholder="Введите альтернативное название №${
              k + 1
            }" data-edit-value="alt${k + 1}" /></label>
                      <label class="edit-label" data-edit-value="year${
                        k + 1
                      }">Год <input type="number" 
                class="edit-inp year-inp" data-edit-value="alt${
                  k - 1
                } maxlength="4" min="1800" max="2400"placeholder="Введите год" /></label>
              </div>
                  </div>
                    </div>`
          );
        }
      } else if (valuesCount == 14) {
        for (let k = 0; k < 3; k++) {
          newAltWrapper.insertAdjacentHTML(
            'beforeend',
            `<div class="popup-edit-content-wrapper" data-edit-form-id="${k + 1}">
                <div
                  class="input__wrapper"
                  style="flex-direction: column; align-items: flex-start">
                  <div class="popup-value__title">
                    <h3>Альтернативное название №${k + 1}</h3>
                    <div
                      class="table-icon del-alt-name js-edit-btn-altDel"
                      data-value="Удалить"
                      data-edit-altDel="${k + 1}">
                      <span class="icon control-edit delete"></span>
                    </div>
                  </div>
                       <label class="edit-label" data-edit-value="alt${
                         k + 1
                       }">Полное наименование <input class="edit-inp fullAlt" type="text" placeholder="Введите полное наименование №${
              k + 1
            }" data-edit-value="fullName${k + 1}" /></label>
                  <div class="row-inputs">
                    <label class="edit-label" data-edit-value="alt${
                      k + 1
                    }">Альтернативное название <input class="edit-inp" type="text" placeholder="Введите альтернативное название №${
              k + 1
            }" data-edit-value="alt${k + 1}" /></label>
                    <label class="edit-label" data-edit-value="year${
                      k + 1
                    }">Год <input type="number" 
              class="edit-inp year-inp" data-edit-value="alt${
                k - 1
              } maxlength="4" min="1800" max="2400"placeholder="Введите год" /></label>
              </div>
                </div>
                  </div>`
          );
        }
      } else if (valuesCount == 17) {
        for (let k = 0; k < 4; k++) {
          newAltWrapper.insertAdjacentHTML(
            'beforeend',
            `<div class="popup-edit-content-wrapper" data-edit-form-id="${k + 1}">
                <div
                  class="input__wrapper"
                  style="flex-direction: column; align-items: flex-start">
                  <div class="popup-value__title">
                    <h3>Альтернативное название №${k + 1}</h3>
                    <div
                      class="table-icon del-alt-name js-edit-btn-altDel"
                      data-value="Удалить"
                      data-edit-altDel="${k + 1}">
                      <span class="icon control-edit delete"></span>
                    </div>
                  </div>
                       <label class="edit-label" data-edit-value="alt${
                         k + 1
                       }">Полное наименование <input class="edit-inp fullAlt" type="text" placeholder="Введите полное наименование №${
              k + 1
            }" data-edit-value="fullName${k + 1}" /></label>
                  <div class="row-inputs">
                    <label class="edit-label" data-edit-value="alt${
                      k + 1
                    }">Альтернативное название <input class="edit-inp" type="text" placeholder="Введите альтернативное название №${
              k + 1
            }" data-edit-value="alt${k + 1}" /></label>
                    <label class="edit-label" data-edit-value="year${
                      k + 1
                    }">Год <input type="number" 
              class="edit-inp year-inp" data-edit-value="alt${
                k - 1
              } maxlength="4" min="1800" max="2400"placeholder="Введите год" /></label>
            </div>
                </div>
                  </div>`
          );
        }
      } else if (valuesCount == 20) {
        for (let k = 0; k < 5; k++) {
          newAltWrapper.insertAdjacentHTML(
            'beforeend',
            `<div class="popup-edit-content-wrapper" data-edit-form-id="${k + 1}">
                <div
                  class="input__wrapper"
                  style="flex-direction: column; align-items: flex-start">
                  <div class="popup-value__title">
                    <h3>Альтернативное название №${k + 1}</h3>
                    <div
                      class="table-icon del-alt-name js-edit-btn-altDel"
                      data-value="Удалить"
                      data-edit-altDel="${k + 1}">
                      <span class="icon control-edit delete"></span>
                    </div>
                  </div>
                   <label class="edit-label" data-edit-value="alt${
                     k + 1
                   }">Полное наименование <input class="edit-inp fullAlt" type="text" placeholder="Введите полное наименование №${
              k + 1
            }" data-edit-value="fullName${k + 1}" /></label>
                  <div class="row-inputs">
                    <label class="edit-label" data-edit-value="alt${
                      k + 1
                    }">Альтернативное название <input class="edit-inp" type="text" placeholder="Введите альтернативное название №${
              k + 1
            }" data-edit-value="alt${k + 1}" /></label>
                    <label class="edit-label" data-edit-value="year${
                      k + 1
                    }">Год <input type="number" 
              class="edit-inp year-inp" data-edit-value="alt${
                k - 1
              } maxlength="4" min="1800" max="2400"placeholder="Введите год" /></label>
              </div>
                </div>
                  </div>`
          );
        }
      } else if (valuesCount == 8) {
        for (let k = 0; k < 1; k++) {
          newAltWrapper.insertAdjacentHTML(
            'beforeend',
            `<div class="popup-edit-content-wrapper" data-edit-form-id="${k + 1}">
                <div
                  class="input__wrapper"
                  style="flex-direction: column; align-items: flex-start">
                  <div class="popup-value__title">
                    <h3>Альтернативное название №${k + 1}</h3>
                    <div
                      class="table-icon del-alt-name js-edit-btn-altDel"
                      data-value="Удалить"
                      data-edit-altDel="${k + 1}">
                      <span class="icon control-edit delete"></span>
                    </div>
                  </div>
                   <label class="edit-label" data-edit-value="alt${
                     k + 1
                   }">Полное наименование <input class="edit-inp fullAlt" type="text" placeholder="Введите полное наименование №${
              k + 1
            }" data-edit-value="fullName${k + 1}" /></label>
                  <div class="row-inputs">
                    <label class="edit-label" data-edit-value="alt${
                      k + 1
                    }">Альтернативное название <input class="edit-inp" type="text" placeholder="Введите альтернативное название №${
              k + 1
            }" data-edit-value="alt${k}" /></label>
                    <label class="edit-label" data-edit-value="year${
                      k + 1
                    }">Год <input type="number" 
              class="edit-inp year-inp" data-edit-value="alt${
                k - 1
              } maxlength="4" min="1800" max="2400"placeholder="Введите год" /></label>
              </div>
                </div>
                  </div>`
          );
        }
      }
      countAddALtClick == 6 ? (btnAddAltEl.disabled = true) : (btnAddAltEl.disabled = false);

      let inpNewValues = document.querySelectorAll('.edit-inp');
      matchingTr.forEach((el) => {
        if (inpNewValues.length > 5) {
          inpNewValues[4].value = el.fullName1;
          inpNewValues[5].value = el.alt1;
          el.year1 === undefined
            ? (inpNewValues[6].value = el.year)
            : (inpNewValues[6].value = el.year1);
        }
        if (inpNewValues.length > 11) {
          inpNewValues[7].value = el.fullname2;
          inpNewValues[8].value = el.alt2;
          el.year2 === undefined
            ? (inpNewValues[9].value = el.year1)
            : (inpNewValues[9].value = el.year2);
        }
        if (inpNewValues.length > 14) {
          inpNewValues[10].value = el.fullName3;
          inpNewValues[11].value = el.alt3;
          el.year3 === undefined
            ? (inpNewValues[12].value = el.year1)
            : (inpNewValues[12].value = el.year2);
        }
        if (inpNewValues.length > 17) {
          inpNewValues[13].value = el.fullName4;
          inpNewValues[14].value = el.alt4;
          el.year4 === undefined
            ? (inpNewValues[15].value = el.year3)
            : (inpNewValues[15].value = el.year4);
        }
        if (inpNewValues.length > 19) {
          inpNewValues[16].value = el.fullName5;
          inpNewValues[17].value = el.alt5;
          el.year5 === undefined
            ? (inpNewValues[18].value = el.year4)
            : (inpNewValues[18].value = el.year5);
        }
        if (inpNewValues.length > 21) {
          inpNewValues[19].value = el.fullName6;
          inpNewValues[20].value = el.alt6;
          inpNewValues[21].value = el.year5;
        }
      });

      popupEdit.style.display = '';
      const closeBtn = document.querySelectorAll('.popup-close');
      inpFullName = document.querySelector('.edit-fullname');
      inpInn = document.querySelector('.edit-inn');
      const promptSpanIdArr = document.querySelectorAll('.js-edit-id');
      const promptEditArr = document.querySelectorAll('.prompt-edit');
      inpFullName.addEventListener('input', () => {
        let checkVar = dataSlice
          .filter((el) => el.id != idTrTable)
          .some((el) => el.fullName == inpFullName.value);
        if (checkVar == false) {
          inpFullName.dataset.invalid = 'false';
          btnSaveEdit.disabled = false;
          promptEditArr[1].style.display = 'none';
        } else {
          inpFullName.dataset.invalid = 'true';
          btnSaveEdit.disabled = true;
          promptSpanIdArr[1].innerText = dataSlice.find(
            (el) => el.fullName == inpFullName.value
          ).id;
          promptEditArr[1].style.display = 'block';
        }
      });
      inpInn.addEventListener('input', () => {
        let checkVar = dataSlice
          .filter((el) => el.id != idTrTable)
          .some((el) => el.inn == inpInn.value);
        if (checkVar == false) {
          inpInn.dataset.invalid = 'false';
          btnSaveEdit.disabled = false;
          promptEditArr[0].style.display = 'none';
        } else {
          inpInn.dataset.invalid = 'true';
          btnSaveEdit.disabled = true;
          promptSpanIdArr[0].innerText = dataSlice.find((el) => el.inn == inpInn.value).id;
          promptEditArr[0].style.display = 'block';
        }
      });
      inpNewValues.length !== Array.from(inpNewValues).filter((el) => el.value !== '').length
        ? (btnSaveEdit.disabled = true)
        : (btnSaveEdit.disabled = false);
      inpNewValues.forEach((inp) => {
        inp.addEventListener('input', () => {
          inpNewValues.length !== Array.from(inpNewValues).filter((el) => el.value !== '').length
            ? (btnSaveEdit.disabled = true)
            : (btnSaveEdit.disabled = false);
        });
        closeBtn.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            inpNewValues.forEach((inp) => (inp.value = ''));
            popupEdit.style.display = 'none';
            const dataFormEl = document.querySelectorAll('.popup-edit-content-wrapper');
            dataFormEl.forEach((formEl, index) => {
              countAddALtClick = 1;
              index != 0 ? formEl.remove() : false;
            });
          });
        });
        const dataFormEl = document.querySelectorAll('.popup-edit-content-wrapper');
        const delNewAlt = document.querySelectorAll('.js-edit-btn-altDel');
        delNewAlt.forEach((del, indexDel) => {
          dataFormEl.forEach((formEl, indexForm) => {
            del.addEventListener('click', () => {
              countAddALtClick = indexDel;
              countAddALtClick == 6
                ? (btnAddAltEl.disabled = true)
                : (btnAddAltEl.disabled = false);
              indexDel + 1 == indexForm ? formEl.remove() : false;
            });
          });
        });
      });
    });
  });
  //Save edit change
  const btnSaveEdit = document.querySelector('.btn-save');
  btnSaveEdit.addEventListener('click', (e) => {
    e.preventDefault();
    let editElement = dataSlice.find((el) => el.id == idTrTable);
    inpNewValues = document.querySelectorAll('.edit-inp');
    editElement.inn = inpNewValues[0].value;
    editElement.fullName = inpNewValues[1].value;
    editElement.abbr = inpNewValues[2].value;
    editElement.year = inpNewValues[3].value;
    if (inpNewValues.length > 5) {
      editElement.fullName1 = inpNewValues[4].value;
      editElement.alt1 = inpNewValues[5].value;
      editElement.year1 = inpNewValues[6].value;
    }
    if (inpNewValues.length > 11) {
      editElement.fullname2 = inpNewValues[7].value;
      editElement.alt2 = inpNewValues[8].value;
      editElement.year2 = inpNewValues[9].value;
    }
    if (inpNewValues.length > 14) {
      editElement.fullName3 = inpNewValues[10].value;
      editElement.alt3 = inpNewValues[11].value;
      editElement.year3 = inpNewValues[12].value;
    }
    if (inpNewValues.length > 17) {
      editElement.fullName4 = inpNewValues[13].value;
      editElement.alt4 = inpNewValues[14].value;
      editElement.year4 = inpNewValues[15].value;
    }
    if (inpNewValues.length > 19) {
      editElement.fullName5 = inpNewValues[16].value;
      editElement.alt5 = inpNewValues[17].value;
      editElement.year5 = inpNewValues[18].value;
    }
    if (inpNewValues.length > 20) {
      editElement.fullName6 = inpNewValues[19].value;
      editElement.alt6 = inpNewValues[20].value;
      editElement.year5 = inpNewValues[21].value;
    }

    if (n == 1 || i == 1 || j == 1) {
      dataFilters.splice(idTrTable - 201, 1, editElement);
      tableRender(dataFilters);
    } else {
      dataSlice.splice(idTrTable - 201, 1, editElement);
      tableRender(dataSlice);
    }
    popupEdit.style.display = 'none';
    const dataFormEl = document.querySelectorAll('.popup-edit-content-wrapper');
    dataFormEl.forEach((formEl, index) => {
      countAddALtClick = 1;
      index != 0 ? formEl.remove() : false;
    });
  });

  //In total
  btnTotalEl.dataset.value = `нашлось: ${dataValue.length}`;
  fieldInTotalEl.innerText = dataValue.length;

  //Btn Delete table
  const delBtnArr = document.querySelectorAll('.del-btn');
  delBtnArr.forEach((del) => {
    del.addEventListener('click', () => {
      schoolIdEl.textContent = `id${del.dataset.valueId}`;
      schoolFullNameEl.textContent = del.dataset.fullName;
      btnDeleteTr.dataset.valueId = del.dataset.valueId;
      popupDel.style.display = '';
      const closeBtn = document.querySelectorAll('.popup-close');
      closeBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          popupDel.style.display = 'none';
        });
      });
    });
  });

  //Delete td
  const btnDeleteTr = document.querySelector('.btn-delete');
  let matchingId;
  const schoolTrElArr = document.querySelectorAll('.tr-school');
  btnDeleteTr.addEventListener('click', () => {
    schoolTrElArr.forEach((tr) => {
      if (tr.dataset.valueId == btnDeleteTr.dataset.valueId) {
        matchingId = tr.dataset.valueId;
      }
      popupDel.style.display = 'none';
    });
    if (i == 1 || j == 1 || n == 1) {
      dataFilters = dataFilters.filter((el) => el.id != matchingId);
      tableRender(dataFilters.filter((el) => el.id != matchingId));
    } else {
      dataSlice = dataSlice.filter((el) => el.id != matchingId);
      tableRender(dataSlice.filter((el) => el.id != matchingId));
    }
  });
}
tableRender(dataSlice);

//Add new inputs in edit popup
btnAddAltEl.addEventListener('click', (e) => {
  e.preventDefault();
  countAddALtClick++;
  newALtNameFormHTML = ` 
    <div class="popup-edit-content-wrapper" data-edit-form-id="${countAddALtClick}">
        <div
          class="input__wrapper"
          style="flex-direction: column; align-items: flex-start">
          <div class="popup-value__title">
            <h3>Альтернативное название №${countAddALtClick}</h3>
            <div
              class="table-icon del-alt-name js-edit-btn-altDel"
              data-value="Удалить"
              data-edit-altDel="${countAddALtClick}">
              <span class="icon control-edit delete"></span>
            </div>
          </div>
                <label class="edit-label" data-edit-value="alt${countAddALtClick}">Полное наименование <input class="edit-inp fullAlt" type="text" placeholder="Введите полное наименование №${countAddALtClick}" data-edit-value="fullName${countAddALtClick}" /></label>
          <div class="row-inputs">
            <label class="edit-label" data-edit-value="alt${countAddALtClick}">Альтернативное название <input class="edit-inp" type="text" placeholder="Введите альтернативное название №${countAddALtClick}" data-edit-value="alt${countAddALtClick}" /></label>
            <label class="edit-label" data-edit-value="year${countAddALtClick}">Год <input type="number" class="edit-inp year-inp" data-edit-value="alt${countAddALtClick} maxlength="4" min="1800" max="2400"placeholder="Введите год" /></label>
          </div>
        </div>
    </div>`;
  newAltWrapper.insertAdjacentHTML('beforeend', newALtNameFormHTML);
  let inpNewValues = document.querySelectorAll('.edit-inp');
  inpNewValues.length !== Array.from(inpNewValues).filter((el) => el.value !== '').length
    ? (btnSaveEdit.disabled = true)
    : (btnSaveEdit.disabled = false);
  const delNewAlt = document.querySelectorAll('.js-edit-btn-altDel');
  countAddALtClick == 6 ? (btnAddAltEl.disabled = true) : (btnAddAltEl.disabled = false);

  inpNewValues.forEach((inp) => {
    inp.addEventListener('input', () => {
      inpNewValues.length !== Array.from(inpNewValues).filter((el) => el.value !== '').length
        ? (btnSaveEdit.disabled = true)
        : (btnSaveEdit.disabled = false);
    });
  });
  const dataFormEl = document.querySelectorAll('.popup-edit-content-wrapper');
  delNewAlt.forEach((del, indexDel) => {
    dataFormEl.forEach((formEl, indexForm) => {
      del.addEventListener('click', () => {
        countAddALtClick = indexDel;
        countAddALtClick == 6 ? (btnAddAltEl.disabled = true) : (btnAddAltEl.disabled = false);
        indexDel + 1 == indexForm ? formEl.remove() : false;
      });
    });
  });
});

//Btn delete
delBtnArr.forEach((del) => {
  del.addEventListener('click', () => {
    schoolIdEl.textContent = `id${del.dataset.valueId}`;
    schoolFullNameEl.textContent = del.dataset.fullName;
    btnDeleteTr.dataset.valueId = del.dataset.valueId;
    popupDel.style.display = '';
    const closeBtn = document.querySelectorAll('.popup-close');
    closeBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        popupDel.style.display = 'none';
      });
    });
  });
});

//Apply select
btnApply.addEventListener('click', () => {
  j = 1;
  arrFiltersType = [];
  arrSchoolTypeSelect = '';
  checkboxTypeSchoolArr.forEach((checkbox) => {
    checkbox.checked ? arrFiltersType.push(checkbox.dataset.typeFilter) : false;
    checkbox.checked ? (arrSchoolTypeSelect = checkbox.dataset.typeSelect) : false;
  });

  arrFiltersType.length == 4 ? arrFiltersType.shift() : false;
  if (arrFiltersType.length == 0) {
    inpTypeSchool.value = '';
  } else if (arrFiltersType.length == 1) {
    selectResetArr[0].style.display = 'block';
    inpTypeSchool.value = `${arrSchoolTypeSelect}`;
  } else {
    selectResetArr[0].style.display = 'block';
    inpTypeSchool.value = `Тип учебного заведения (выбрано ${arrFiltersType.length})`;
  }
  if (arrFiltersType.length >= 3) {
    true;
  } else {
    let regTypeSchool = new RegExp(arrFiltersType.join('').replaceAll(', ', '|'), 'gi');
    i == 1 || n == 1
      ? (dataPrev = dataFilters.filter((school) => school.fullName.match(regTypeSchool)))
      : (dataPrev = dataSlice.filter((school) => school.fullName.match(regTypeSchool)));

    i == 1 || n == 1
      ? tableRender(dataFilters.filter((school) => school.fullName.match(regTypeSchool)))
      : tableRender(dataSlice.filter((school) => school.fullName.match(regTypeSchool)));
    i !== 1 || n !== 1
      ? (dataFilters = dataSlice.filter((school) => school.fullName.match(regTypeSchool)))
      : (dataFilters = dataFilters.filter((school) => school.fullName.match(regTypeSchool)));
  }
});

//Select Reset
selectResetArr.forEach((reset) => {
  reset.addEventListener('click', () => {
    i = 0;
    j = 0;
    n = 0;
    btnSearchResetArr.forEach((btn) => (btn.style.display = 'none'));
    selectResetArr.forEach((reset) => (reset.style.display = 'none'));
    document.querySelectorAll('input').forEach((inp) => (inp.value = ''));
    selectElArr.forEach((select) => {
      select.value = '';
    });
    tableRender(dataSlice);
  });
});
btnApply.onmousedown = function (e) {
  if (document.activeElement === selectElArr[0]) {
    e.preventDefault();
  }
};
document.querySelectorAll('.js-type-school-value').forEach(
  (el) =>
    (el.onmousedown = function (e) {
      if (document.activeElement === selectElArr[0]) {
        e.preventDefault();
      }
    })
);
// Select settings
selectElArr.forEach((select, indexSelect) => {
  selectResetArr.forEach((reset, indexReset) => {
    if (indexReset == indexSelect) {
      select.addEventListener('input', () => {
        reset.style.display = 'block';
      });
    }
  });
  let countArrowClick = 0;
  promptArr.forEach((promptEl, indexPrompt) => {
    selectArrowArr.forEach((arrow, indexArrow) => {
      if (indexArrow == indexSelect && indexSelect == indexPrompt) {
        btnApply.addEventListener('click', () => {
          select.dataset.active = 'close';
          arrow.dataset.active = 'close';
          promptEl.dataset.active = 'close';
          checkboxTypeSchoolArr.forEach((el) => (el.checked = false));
        });
        arrow.addEventListener('click', () => {
          countArrowClick++;
          if (countArrowClick % 2) {
            select.dataset.active = 'open';
            arrow.dataset.active = 'open';
            promptEl.dataset.active = 'open';
          } else {
            select.dataset.active = 'close';
            arrow.dataset.active = 'close';
            promptEl.dataset.active = 'close';
            checkboxTypeSchoolArr.forEach((el) => (el.checked = false));
          }
        });
        select.addEventListener('click', () => {
          select.dataset.active = 'open';
          arrow.dataset.active = 'open';
          promptEl.dataset.active = 'open';
        });
        select.addEventListener('blur', (e) => {
          select.dataset.active = 'close';
          arrow.dataset.active = 'close';
          promptEl.dataset.active = 'close';
          checkboxTypeSchoolArr.forEach((el) => (el.checked = false));
        });
      }
    });
  });
});

//Clear search
searchInput.forEach((inp, indexInp) => {
  btnSearchResetArr.forEach((btn, indexBtn) => {
    if (indexInp == indexBtn) {
      inp.addEventListener('input', () => {
        indexBtn == indexInp && inp.value == '' ? (btn.style.display = 'none') : false;
        indexBtn == indexInp && inp.value !== '' ? (btn.style.display = 'block') : false;
      });
    }
  });
});

//Btn deselect
document.querySelector('.js-btn-deselect').addEventListener('click', () => {
  inputArr.forEach((inp) => {
    inp.value = '';
    checkboxTypeSchoolArr.forEach((checkbox) => (checkbox.checked = false));
    dataFilters = [];
    dataPrev = [];
    dataSlice = data.slice(0);
    i = 0;
    j = 0;
    n = 0;
    selectResetArr.forEach((reset) => (reset.style.display = 'none'));
    btnSearchResetArr.forEach((reset) => (reset.style.display = 'none'));
  });
  tableRender(dataSlice);
});

//Sort
function bySort(sortPar) {
  return (a, b) => (a[sortPar] > b[sortPar] ? 1 : -1);
}
function bySortRev(sortPar) {
  return (a, b) => (a[sortPar] < b[sortPar] ? 1 : -1);
}
document.querySelectorAll('.sort-table').forEach((sort) => {
  sort.addEventListener('click', () => {
    let sortValues = sort.dataset.sortValue;
    let sortData;
    count++;
    if (count % 2) {
      i == 1 || j == 1 || n == 1
        ? (sortData = dataFilters.sort(bySort(sortValues)))
        : (sortData = dataSlice.sort(bySort(sortValues)));
      tableRender(sortData);
    } else {
      i == 1 || j == 1 || n == 1
        ? (sortData = dataFilters.sort(bySortRev(sortValues)))
        : (sortData = dataSlice.sort(bySortRev(sortValues)));
      tableRender(sortData);
    }
  });
});

//Check page
document.querySelectorAll('.mobile-control__tab-name').forEach((tab) => {
  tab.addEventListener('click', () => {
    tab.innerText !== 'АЛЬТЕРНАТИВНЫЕ УЧЕБНЫЕ ЗАВЕДЕНИЯ'
      ? (main.style.display = 'none')
      : (main.style.display = 'block');
  });
});
document.querySelectorAll('.third-panel__tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    tab.innerText.includes('Альтер') || tab.classList.contains('more')
      ? (main.style.display = 'block')
      : (main.style.display = 'none');
  });
});
// Render tabName
document.querySelectorAll('.third-panel__tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    tab.classList.contains('third-panel__tab_active')
      ? (titlePage.innerText = `Журнал: ${tab.textContent
          .trim()
          .replace(/\s+/g, ' ')
          .slice(1)
          .toUpperCase()}`)
      : false;
  });
});

//Filter Types school
checkboxTypeSchoolArr[0].addEventListener('click', () => {
  countAllCheckbox++;
  countAllCheckbox % 2
    ? checkboxTypeSchoolArr.forEach((el) => (el.checked = true))
    : checkboxTypeSchoolArr.forEach((el) => (el.checked = false));
});
checkboxTypeSchoolArr.forEach((el) => {
  el.addEventListener('click', () => {
    inpTypeSchool.focus();
    promptArr[0].dataset.active = 'open';
  });
});

//Filter Region
inpRegion.addEventListener('input', () => {
  regionValueInput = inpRegion.value;
  let myReg = new RegExp('^' + regionValueInput, 'gi');
  let filtersValuesHTML = '';
  let regionsFind = regions.filter((el) => el.match(myReg));
  regionsFind.slice(0, 10).forEach((region) => {
    filtersValuesHTML += `
    <div class="filter-value filter-region">
      <label>${region}</label>
    </div>`;
  });
  filtersWrapper.innerHTML = filtersValuesHTML;
  const btnRegionArr = document.querySelectorAll('.filter-region');
  selectResetArr[1].addEventListener('click', () => {
    filtersWrapper.innerHTML = `
      <div class="filter-value filter-region">
        <label>Нижний Новгород</label>
      </div>
      <div class="filter-value filter-region">
        <label>Нижегородская область</label>
      </div>
      <div class="filter-value filter-region">
        <label>Арзамас</label>
      </div>
      <div class="filter-value filter-region">
        <label>Балахна</label>
      </div>
      <div class="filter-value filter-region">
        <label>Богородск</label>
      </div>
      <div class="filter-value filter-region">
        <label>Бор</label>
      </div>
      <div class="filter-value filter-region">
        <label>Выкса</label>
      </div>
      <div class="filter-value filter-region">
        <label>Дзержинск</label>
      </div>
      <div class="filter-value filter-region">
        <label>Кстово</label>
      </div>
      <div class="filter-value filter-region">
        <label>Павлово</label>
      </div>`;
    const btnRegionArr = document.querySelectorAll('.filter-region');
    checkboxTypeSchoolArr.forEach((checkbox) => (checkbox.checked = false));
    btnRegionArr.forEach((btn) => {
      btn.addEventListener('click', () => {
        i = 1;
        inpRegion.value = btn.innerText;
        regionValueInput = inpRegion.value;
        selectResetArr[1].style.display = 'block';
        j == 1 || n == 1
          ? tableRender(dataFilters.filter((school) => school.address.match(regionValueInput)))
          : tableRender(dataSlice.filter((school) => school.address.match(regionValueInput)));
        j !== 1 || n !== 1
          ? (dataFilters = dataSlice.filter((school) => school.address.match(regionValueInput)))
          : (dataFilters = dataFilters.filter((school) => school.address.match(regionValueInput)));
      });
    });
  });
  btnRegionArr.forEach((btn) => {
    btn.addEventListener('click', () => {
      i = 1;
      inpRegion.value = btn.innerText;
      regionValueInput = inpRegion.value;
      selectResetArr[1].style.display = 'block';
      j == 1 || n == 1
        ? (dataPrev = dataFilters.filter((school) => school.address.match(regionValueInput)))
        : dataPrev.filter((school) => school.address.match(regionValueInput));

      j == 1 || n == 1
        ? tableRender(dataFilters.filter((school) => school.address.match(regionValueInput)))
        : tableRender(dataSlice.filter((school) => school.address.match(regionValueInput)));
      j !== 1 || n !== 1
        ? (dataFilters = dataSlice.filter((school) => school.address.match(regionValueInput)))
        : (dataFilters = dataFilters.filter((school) => school.address.match(regionValueInput)));
    });
  });
});
btnRegionArr.forEach((btn) => {
  btn.addEventListener('click', () => {
    i = 1;
    inpRegion.value = btn.innerText;
    regionValueInput = inpRegion.value;
    selectResetArr[1].style.display = 'block';
    j == 1 || n == 1
      ? tableRender(dataFilters.filter((school) => school.address.match(regionValueInput)))
      : tableRender(dataSlice.filter((school) => school.address.match(regionValueInput)));
    j !== 1 || n !== 1
      ? (dataFilters = dataSlice.filter((school) => school.address.match(regionValueInput)))
      : (dataFilters = dataFilters.filter((school) => school.address.match(regionValueInput)));
  });
});

//Search
btnSearchResetArr.forEach((reset) => {
  reset.addEventListener('click', () => {
    tableRender(dataSlice);
  });
});

searchInput.forEach((inp, indexInp) => {
  btnSearchResetArr.forEach((reset, indexReset) => {
    reset.addEventListener('click', () => {
      dataFilters = dataSlice;
      n = 0;
      selectResetArr.forEach((el) => (el.style.display = 'none'));
      btnSearchResetArr.forEach((el) => (el.style.display = 'none'));
      loopIconsArr.forEach((icon) => (icon.style.display = 'block'));
      document.querySelectorAll('input').forEach((inp) => (inp.value = ''));
      inp.style.padding = '0px 43px 0px 40px';
    });
    indexReset == indexInp && inp.value == '' ? (reset.style.display = 'none') : false;
  });
});
promptSearchArr.forEach((promptEl) => {
  btnSearchResetArr.forEach((reset) => {
    reset.addEventListener('click', () => {
      promptEl.style.display = 'none';
    });
  });
});
searchInput.forEach((inp, indexInp) => {
  loopIconsArr.forEach((icon, iconIndex) => {
    inp.addEventListener('blur', () => {
      if (iconIndex == indexInp && inp.value == '') {
        icon.style.display = 'block';
      }
    });
    inp.addEventListener('click', () => {
      if (iconIndex == indexInp) {
        icon.style.display = 'none';
        inp.style.padding = '0px 43px 0px 11px';
      }
    });
    inp.addEventListener('input', () => {
      inp.value == '' ? (inp.style.padding = '0px 43px 0px 40px') : false;
      if (iconIndex == indexInp && inp.value != '') {
        icon.style.display = 'none';
        inp.style.padding = '0px 43px 0px 11px';
      }
    });
  });
  promptSearchArr.forEach((promptEl, promptIndex) => {
    inp.addEventListener('blur', () => {
      if (indexInp == promptIndex) {
        setTimeout(() => {
          promptEl.style.display = 'none';
        }, 100);
      }
    });
    inp.addEventListener('click', () => {
      if (indexInp == promptIndex) {
        promptEl.style.display = 'block';
      }
    });

    inp.addEventListener('input', () => {
      if (indexInp == promptIndex) {
        promptEl.style.display = 'block';
        inp.value == '' ? inp.blur() : false;
        let searchId = inp.dataset.searchValue;
        let valueInput = '';
        inp.value !== ''
          ? (valueInput =
              inp.value[0].replace(inp.value[0], inp.value[0].toUpperCase()) + inp.value.slice(1))
          : (valueInput = '');
        valueInput == '*' ? (valueInput = undefined) : false;
        let valuesSearchHTML = '';
        let regSearch = new RegExp('^' + valueInput, 'gi');
        let regHighlight = new RegExp(valueInput, 'gi');
        searchId == 'fullName' ? (regHighlight = new RegExp(valueInput, 'g')) : false;
        if (i == 1 || j == 1 || n == 1) {
          let textHighlight = '';
          let textOriginal = '';
          let replaceText = '';
          if (valueInput == '' || inp.value === undefined) {
            searchInput.forEach((el) => (el.value = ''));
            btnSearchResetArr.forEach((reset) => (reset.style.display = 'none'));
            loopIconsArr.forEach((icon) => (icon.style.display = 'block'));
            promptEl.style.display = 'none';
            inp.blur();
            n = 0;
            if (j == 1 || i == 1) {
              tableRender(dataPrev);
            } else tableRender(dataSlice);
          } else {
            let currentData = dataFilters;
            currentData
              .filter((el) => String(el[searchId]).match(regSearch))
              .slice(0, 6)
              .forEach((el) => {
                textHighlight = String(el[searchId]).match(regHighlight).join('');
                textOriginal = String(el[searchId]).toLowerCase();
                replaceText = textOriginal
                  .replace(
                    textHighlight.toLowerCase(),
                    `<span class="highlight">${String(el[searchId]).match(regHighlight)}</span>`
                  )
                  .replaceAll(',', '');
                valuesSearchHTML += `<div class="search-value">${replaceText}</div>`;
                promptEl.innerHTML = valuesSearchHTML;
              });
            document.querySelectorAll('.search-value').forEach((el) => {
              el.innerText.includes('UNDEFINED') ? (el.style.color = 'rgba(0, 0, 0, 0)') : false;
              el.addEventListener('click', () => {
                n = 1;
                inp.value = el.textContent;
                valueInput = el.textContent;
                regSearch = new RegExp('^' + valueInput, 'gi');
                inp.value == 'undefined' ? (inp.style.color = 'rgba(0, 0, 0, 0)') : false;
                promptEl.style.display = 'none';
                tableRender(dataFilters.filter((el) => String(el[searchId]).match(regSearch)));
              });
            });
            valueInput == '' ? tableRender(dataFilters) : false;
          }
        } else {
          let textHighlight = '';
          let textOriginal = '';
          let replaceText = '';
          dataSlice
            .filter((el) => String(el[searchId]).match(regSearch))
            .slice(0, 6)
            .forEach((el) => {
              textHighlight = String(el[searchId]).match(regHighlight).join('');
              textOriginal = String(el[searchId]).toLowerCase();
              replaceText = textOriginal
                .replace(
                  textHighlight.toLowerCase(),
                  `<span class="highlight">${String(el[searchId]).match(regHighlight)}</span>`
                )
                .replaceAll(',', '');
              valuesSearchHTML += `<div class="search-value">${replaceText}</div>`;
              promptEl.innerHTML = valuesSearchHTML;
            });
          if (valueInput == '') {
            promptEl.style.display = 'none';
            tableRender(dataSlice);
          }
          document.querySelectorAll('.search-value').forEach((el) => {
            el.innerText.includes('UNDEFINED') ? (el.style.color = 'rgba(0, 0, 0, 0)') : false;
            el.addEventListener('click', () => {
              n = 1;
              inp.value = el.textContent;
              valueInput = el.textContent;
              inp.value == 'undefined' ? (inp.style.color = 'rgba(0, 0, 0, 0)') : false;
              regSearch = new RegExp('^' + valueInput, 'gi');
              promptEl.style.display = 'none';
              dataFilters = dataSlice.filter((el) => String(el[searchId]).match(regSearch));
              tableRender(dataSlice.filter((el) => String(el[searchId]).match(regSearch)));
            });
          });
          tableRender(dataSlice.filter((el) => String(el[searchId]).match(regSearch)));
          valueInput == '' ? tableRender(dataSlice) : false;
        }
      }
    });
  });
});

//POPUPS
//export
exportBtnEl.addEventListener('click', () => {
  popupExport.style.display = '';
  const closeBtn = document.querySelectorAll('.popup-close');
  let date = new Date();
  let month = date.getMonth();
  function monthFixed(month) {
    return String(month).length == 1 ? '0' + (month + 1) : month + 1;
  }
  let yearDate = date.getFullYear();
  let time = String(date).slice(15, 24).replaceAll(':', '_');
  let str = `Альтернативные названия учебных заведений ${date.getDate()}.${monthFixed(
    month
  )}.${yearDate} ${time}.xlsx`;
  inpExportEl.value = str;
  let idInterval = setInterval(() => {
    let date = new Date();
    let month = date.getMonth();
    function monthFixed(month) {
      return String(month).length == 1 ? '0' + (month + 1) : month + 1;
    }
    let yearDate = date.getFullYear();
    let time = String(date).slice(15, 24).replaceAll(':', '_');
    let str = `Альтернативные названия учебных заведений ${date.getDate()}.${monthFixed(
      month
    )}.${yearDate} ${time}.xlsx`;
    inpExportEl.value = str;
  }, 5000);
  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      popupExport.style.display = 'none';
      clearInterval(idInterval);
    });
  });
});

linkDownloadEl.addEventListener('click', () => {
  let nameFile = inpExportEl.value;
  linkDownloadEl.setAttribute('download', nameFile);
  inpExportEl.value = '';
});

// import
inpImportEl.addEventListener('change', (e) => {
  pFileName.innerText = e.target.files[0].name;
  document.querySelector('.placeholder').style.display = 'none';
});
importBtnEl.addEventListener('click', () => {
  popupImport.style.display = '';
  const closeBtn = document.querySelectorAll('.popup-close');
  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      popupImport.style.display = 'none';
    });
  });
});
