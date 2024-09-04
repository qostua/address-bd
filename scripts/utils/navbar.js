
let page2 = 'поиск'
let page = 'поиск'

const THRID_PANEL_TABS = [
  ["Объявления", "", "объявления", "id1"],
  ["Вакансии", "", "вакансии", "id2"],
  ["Поиск", "", "поиск", "id3"],
  ["Соискатели", "", "соискатели", "id4"],
  ["Отклики", "", "отклики", "id5"],
  ["ФИО", "", "фио", "id6"],
  ["Адреса", "", "адреса", "id7"],
  ["Компании", "", "компании", "id8"],
  ["Учебные заведения", "", "учебные заведения", "id9"],
  ["Вакансии объединённые", "", "вакансии объединённые", "id10"],
  ["Сокращённые юридические формы", "", "сокращенные юридические формы", "id19", true],
  ["Альтернативные учебные⠀заведения", "", "Альтернативные учебные заведения", "id11"],
  ["Филиалы учебных заведений", "", "филиалы", "id12"],
  // ["Квалификации", "", "квалификации"], // Этот элемент закомментирован
  ["Квалификации Специальности", "", "Квалификации Специальности", "id13"],
  ["Телефонные коды", "", "телефонные коды", "id14"],
  ["Администраторы", "", "администраторы", "id15"],
  ["email рассылка", "", "email рассылка", "id16"],
  ["Как было как надо", "", "КАК БЫЛО КАК НАДО", "id17"],
  ["Префиксы счетов", "", "префиксы счетов", "id18"],

  ["Банки", "", "банки", "id20"],
  ["Рубрикатор", "", "рубрикатор", "id21"],
];


class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setup();
  }







  THIRD_PANEL_TAB_TEMPLATE = (
    tabName,
    icon,
    content,
    { classes = "", id = "", tabNameClasses = "" } = {}
  ) => {
    return /*html*/ `
        <div class="third-panel__tab tab${id}" ${id ? `id="${id.trim()}"` : ""}>
            ${icon
      ? `<span class="third-panel__tab-icon icon ads-icon in-panel ${classes}">${icon}</span>`
      : ""
    }
            <p class="third-panel__tab-text ${tabNameClasses}">${tabName}</p>
        </div>
    `;
  };


  render() {
    const STYLE = /*html*/ `
            <style>
                .no-white{
                    white-space: nowrap !important;
                }
                .reversed{
                    display: inline-block !important;
                    transform: rotate(180deg);
                }
                .navbar-top-panel{
                    background-color: #414f51;
                    color: white;
                    height: 40px;
                    padding: 0 20px;
                    display:flex;
                    justify-content: flex-end;
                    align-items: center;
                    
                    a{
                        color: white;
                        text-decoration: none;
                        cursor: pointer;
                        display:flex !important;
                        align-items: center;
                    }
                }
                navbar-elem{
                    width: 100%;
                }
                .panels__panel {
                    box-sizing: border-box;
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                    height: min-content;
                }
                #navbar {
                    display: flex;
                    flex-direction: column;
                }
                .second-panel__tab {
                    display: flex;
                    flex: 1;
                    justify-content: center;
                    height: 60px;
                    box-sizing: border-box;
                    font-size: 18px;
                    text-transform: capitalize;
                }
                .second-panel__tab > p {
                    font-size: inherit;
                }
                .second-panel .tab > span.icon {
                    font-size: 35px;
                }
                .second-panel .tab:hover > span.icon {
                    color: white;
                }
                .second-panel .tab:hover {
                    background-color: var(--blue);
                    color: white;
                }
                .second-panel .tab {
                    display: flex;
                    align-items: center;
                }
                .third-panel{
                    align-items: center;
                    row-gap: 20px;
                    box-sizing: border-box;
                    padding: 25px 10px 20px 10px;
                    background-color: var(--blue);
                    align-items: start;
                }
                
                .third-panel__tab {
                    padding-left: 15px;
                    padding-right: 15px;
                    box-sizing: border-box;
                    font-weight: 100;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    overflow: hidden;
                }
                .third-panel__tab_active{
                    color: var(--yellow);
                    font-weight: 900;
                    font-family: 'Inter-Bold'
                }
                span.third-panel__tab-icon {
                    font-weight: normal;
                    color: inherit;
                    font-size: 30px;
                    margin-bottom: 6px;
                }
                .third-panel__tab-text {
                    font-weight: inherit;
                    font-family: inherit;
                    color: inherit;
                    font-size: inherit;
                    text-transform: uppercase;
                    text-align: center;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: wrap;
                }
                .panels {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .other-tabs{
                    display: none;
                }
                .other-tabs_active{
                    display: contents;
                }
                .third-panel__tab.more{
                    align-self: end;
                }
                .third-panel__tab.more > p.third-panel__tab-text{
                    text-align: center;
                }
                .third-panel__tab.more > p.third-panel__tab-text > span{
                    position: absolute;
                }
                @media (width <= 880px) {
                    p.third-panel__tab-text{
                        font-size: 18px;
                    }
                    div#navbar {
                        display: none;
                        grid-template-columns: 2fr 5fr;
                        padding: 0;
                    }
                    .panels {
                        display: grid;
                        width: 100%;
                        grid-template-rows: 1fr;
                    }
                    .second-panel{
                        grid-auto-flow: row;
                    }
                    .third-panel__tab.more{
                        display: none;
                    }

                    .panels__panel{
                        grid-template-columns: none;
                    }
                    div.third-panel{
                        align-items: center;
                        column-gap: 10px;
                        row-gap: 0;
                        padding: 0;
                        padding-right: 25px;
                        padding-left: 15px;
                        box-sizing: border-box;
                        grid-template-columns: 1fr 1fr !important;
                        grid-template-rows: repeat(11, minmax(50px, auto));
                    }
                    .other-tabs{
                        display: contents;
                    }
                    .second-panel__tab {
                        height: 50px;
                        background-color: white;
                        color: var(--blue);
                    }
                    .tab_active {
                        background-color: var(--blue);
                        color: var(--yellow);
                    }
                    .tab_active > p {
                        color: var(--yellow);
                    }
                    div.second-panel__tab > p {
                        font-size: 18px;
                        text-align: left;
                        width: 100%;
                        padding-left: 25px;
                    }
                    .third-panel__tab > span.icon{
                        height: auto;
                        font-size: 20px;
                    }
                    p.third-panel__tab-text {
                        box-sizing: border-box;
                        padding-left: 10px;
                        width: fit-content;
                        text-align: end;
                        font-size: 18px;
                        text-transform: uppercase;
                        white-space: nowrap;
                    }
                    .third-panel__tab-icon.icon {
                        display: block;
                        font-size: 26px;
                    }
                    .third-panel__tab {
                        width: 100%;
                        overflow: hidden;
                        display: flex;
                        flex-direction: row;
                        justify-content: start;
                        /* color: white; */
                        cursor: pointer;
                    }
                    div.control-panel {
                        margin-top: 20px;
                    }
                    .third-panel__content-wrapper {
                        background-color: white;
                    }
                }
                @media (width <= 1560px) {
                    .third-panel__tab {
                        flex: 1;
                        text-align: center;
                    }
                }
                @media (width <= 1250px) {
                    .third-panel__tab-text {
                        font-size: 18px;
                    }
                }
                @media (width <= 1150px) {
                    .second-panel__tab {
                        font-size: 16px;
                    }
                    .third-panel__tab-text {
                        font-size: 16px;
                    }
                }
            </style>
        `;
    this.innerHTML = /*html*/ `
        ${STYLE}
            <div class="navbar-top-panel">
                <a href="#" class="navbar-top__link"><svg width="20" height="33" viewBox="0 0 32 33" class="svg-red" fill="red" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9997 3.09912H23.9997C25.4663 3.09912 26.6663 4.29912 26.6663 5.76579V27.0991C26.6663 28.5658 25.4663 29.7658 23.9997 29.7658H11.9997C10.533 29.7658 9.33301 28.5658 9.33301 27.0991V24.4325H11.9997V27.0991H23.9997V5.76579H11.9997V8.43245H9.33301V5.76579C9.33301 4.29912 10.533 3.09912 11.9997 3.09912Z" fill="white"/>
<path d="M13.4533 21.2194L15.3333 23.0994L22 16.4328L15.3333 9.76611L13.4533 11.6461L16.8933 15.0994H4V17.7661H16.8933L13.4533 21.2194Z" fill="white"/>
</svg>
 Войти</a>
            </div>
            <div class="mobile-control__menu-button">
                <p>Меню</p>
                <span class="icon burger"></span>
            </div>
            <div id="navbar">
                <div class="panels__panel second-panel ">
                    <div class="tab second-panel__tab" id="interface_tab">
                        <p>Интерфейс</p>
                    </div>
                    <div class="tab second-panel__tab" id="social_tab">
                        <p>Соц. сети</p>
                    </div>
                    <div class = "tab second-panel__tab tab_active" id="journals_tab" >
                        <p>Журналы</p>
                    </div>
                    <div class="tab second-panel__tab" id="import_tab">
                        <p>Импорт</p>
                    </div>
                    <div class="tab second-panel__tab" id="export_tab">
                        <p>Экспорт</p>
                    </div>

                    <div class="tab second-panel__tab" id="users_tab">
                        <p>Пользователи</p>
                    </div>
                    <div class="tab second-panel__tab" id="emails_tab">
                        <p>Email ящики</p>
                    </div>
                    <div class="tab second-panel__tab">
                        <p>Ключи.Пароли</p>
                    </div>
                    <div class="tab second-panel__tab">
                        <p>Разное</p>
                    </div>
                </div>
                <div class="third-panel journals panels__panel">
                    ${(() => {
      let markup = "";
      for (let index = 0; index < THRID_PANEL_TABS.slice(0, 8).length; index++) {
        const [tabName, icon, content, id] = THRID_PANEL_TABS[index];
        if (!tabName || !icon) continue; // Проверяем, что данные существуют

        markup += this.THIRD_PANEL_TAB_TEMPLATE(
          tabName,
          icon,
          content,
          { id, tabNameClasses: tabName === "вакансии объед" ? "no-white" : "" }
        );

        setTimeout(() => {
          // console.log(document.querySelector(`.tab${id}`).lastElementChild.offsetWidth);
          // console.log(document.querySelector(`.tab${id}`).lastElementChild.scrollWidth);
          if (document.querySelector(`.tab${id}`).lastElementChild.offsetWidth < document.querySelector(`.tab${id}`).lastElementChild.scrollWidth) {
            console.log(true);


            // tippy(`.tab${id}`, {
            //   content: content,
            //   placement: 'bottom',
            //   arrow: false,
            //   theme: 'customTip',
            //   maxWidth: 'none'
            // });
          } else {
            console.log(false);
          }
        }, 500);

      }


      return markup;
    })()}
                    <div class="third-panel__tab more">
                        <p class="third-panel__tab-text">
                            <span style="width: 100%; text-align: center; position: static;">Все 21</span>
                            <br> журнала <span class="icon reversed" style="padding-left: 5px;"></span></p>
                    </div>
                    <div class="other-tabs">
                        ${(() => {
      let markup = "";
      for (const [
        index,
        tab,
      ] of THRID_PANEL_TABS.slice(8).entries()) {
        if (index == 8) {
          markup += `<div class="third-panel__tab more"></div>`;
        }
        const [tabName, icon, content, id] = THRID_PANEL_TABS[index + 8];
        markup += this.THIRD_PANEL_TAB_TEMPLATE(
          tabName,
          icon,
          content,
          { id, tabNameClasses: tabName === "вакансии объед" ? "no-white" : "" }
        );

        // setTimeout(() => {
        //   // console.log(document.querySelector(`.tab${id}`).lastElementChild);
        //   // console.log(document.querySelector(`.tab${id}`).lastElementChild);

        //   if (document.querySelector(`.tab${id}`).lastElementChild.offsetWidth < document.querySelector(`.tab${id}`).lastElementChild.scrollWidth) {
        //     tippy(`.tab${id}`, {
        //       content: content,
        //       placement: 'bottom',
        //       arrow: false,
        //       theme: 'customTip',
        //       maxWidth: 'none'
        //     });
        //   }
        // }, 500);

      }
      return markup;
    })()}
                    </div>
                </div>


         
  

            </div>

         
        `;
  }




  setup() {
    const thirdPanel = this.querySelector(".third-panel")
    this.querySelectorAll(".second-panel__tab").forEach((el) => {
      this.querySelectorAll(".third-panel__tab").forEach((el) => {
        el.classList.remove("third-panel__tab_active");
        if (el.innerHTML.includes('Адреса')) {
          el.classList.add('third-panel__tab_active')
        }
      })
      el.addEventListener("click", () => {
        if (el.getAttribute("id") == "journals_tab") {
          thirdPanel.setAttribute('style', 'display:grid;')
          this.querySelectorAll(".third-panel__tab").forEach((el) => {
            el.classList.remove("third-panel__tab_active");
            if (el.innerHTML.includes('Адреса')) {
              el.classList.add('third-panel__tab_active')
            }
          });
        } else {
          thirdPanel.setAttribute('style', 'display:none;')
        }
        el.classList.add("tab_active");
      });
      document.addEventListener("click", (event) => {
        const isAnotherTabClicked = Array.from(
          document.querySelectorAll(".second-panel__tab")
        ).filter((el) => {
          return el.contains(event.target);
        }).length;

        if (!el.contains(event.target) && isAnotherTabClicked) {
          el.classList.remove("tab_active");
        }
      });
    });

    const moreTab = this.querySelector(".third-panel__tab.more");
    moreTab.onclick = () => {

      const otherTabs = this.querySelector(".other-tabs");
      if (otherTabs.classList.contains("other-tabs_active")) {
        otherTabs.classList.remove("other-tabs_active");
        moreTab
          .querySelector("p")
          .querySelector("span.icon")
          .classList.add("reversed");
      } else {
        otherTabs.classList.add("other-tabs_active");
        moreTab
          .querySelector("p")
          .querySelector("span.icon")
          .classList.remove("reversed");
      }




      detectedOverflow()
    };

    this.querySelectorAll(".third-panel__tab:not(.more)").forEach(
      (el, index) => {
        el.onclick = (event) => {
          page2 = findTab(el.querySelector('p').innerHTML.toLowerCase())
          page = el.querySelector('p').innerHTML.toLowerCase()
          document.title = page.toUpperCase()
          checkPagePC()
          this.querySelectorAll(".third-panel__tab").forEach((el) => {


            el.classList.remove("third-panel__tab_active");
          });

          el.classList.add("third-panel__tab_active");
        };
        // if (index == 1) {
        //   el.classList.add("third-panel__tab_active");
        // }
      }
    );
    document.querySelector(".icon.burger").onclick = () => {
      const menu = document.querySelector("#navbar");
      if (menu.classList.contains("mobile-menu-wrapper_active")) {
        menu.classList.remove("mobile-menu-wrapper_active");
      } else {
        menu.classList.add("mobile-menu-wrapper_active");
      }
    };
    window.addEventListener("resize", () => {
      const menu = document.querySelector("#navbar");
      if (window.innerWidth <= 640) {
        menu.classList.remove("mobile-menu-wrapper_active");
      } else if (window.innerWidth >= 880) {
        menu.classList.add("mobile-menu-wrapper_active");
      }
    });
  }
}

customElements.define("navbar-elem", Navbar);





function removeWhitespace(text) {
  return text.replace(/\s+/g, '');
}


function checkPagePC() {
  // const searchMenu = document.querySelector('.search-menu')
  const bt = document.querySelector('.big-title')
  const btMB = document.querySelector('.brad-crumb__item__text')
  const btPC = document.querySelector('.big-title-pc')

  bt.innerHTML = 'Журнал: ' + page2.toUpperCase()
  btMB.innerHTML = 'Журнал: ' + page2.toUpperCase()
  btPC.innerHTML = page2.toUpperCase()
  // if (page2 == 'поиск') {
  //   searchMenu.style.display = 'block'
  // } else {
  //   searchMenu.style.display = 'none'
  // }
}

function isEllipsisActive(e) {
  console.log(e.offsetWidth < e.scrollWidth);

  return (e.offsetWidth < e.scrollWidth);
}



function detectedOverflow() {
  for (let index = 0; index < THRID_PANEL_TABS.length; index++) {
    const [tabName, icon, content, id, kvota] = THRID_PANEL_TABS[index];
    if (!tabName || !icon) continue; // Проверяем, что данные существуют

    const tabSelector = `.tab${id}`;
    const tabElement = document.querySelector(tabSelector);

    if (tabElement) {
      const lastChild = tabElement.lastElementChild;
      const offW = lastChild.offsetWidth;
      const scrollW = lastChild.scrollWidth;

      // Проверяем, существует ли уже Tippy-инстанция
      if (tabElement._tippy) {
        tabElement._tippy.destroy(); // Уничтожаем существующую Tippy-инстанцию
      }

      if (offW < scrollW || kvota) {
        document.querySelector(tabSelector).lastElementChild.style.textAlign = 'left';
        tippy(tabSelector, {
          content: content,
          placement: 'bottom',
          arrow: false,
          theme: 'customTip',
          maxWidth: 'none'
        });
      }
    }
  }
}


window.onresize = () => {
  detectedOverflow()
}


setTimeout(() => {
  detectedOverflow();
}, 500);


function findTab(text) {
  for (let k = 0; k < THRID_PANEL_TABS.length; k++) {
    const item = THRID_PANEL_TABS[k];
    // Проверяем, является ли элемент строкой
    let inddex = item.findIndex(e =>
      typeof e === 'string' && e.toLowerCase() === text.toLowerCase()
    );

    // Если совпадение найдено, возвращаем индекс
    if (inddex !== -1) {
      return THRID_PANEL_TABS[k][inddex+2];
    }
  }
  // Если совпадение не найдено, возвращаем -1
  return 'Undefined';
}
