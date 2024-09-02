class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setup();
  }
  THRID_PANEL_TABS = [
    ['объявления', ''],
    ['вакансии', ''],
    ['ПОИСК', ''],
    ['соискатели', ''],
    ['отклики', ''],
    ['фио', ''],
    ['Адреса', ''],
    ['Компании', ''],
    ['Учебные заведения', ''],
    ['вакансии объединённые', ''],
    ['СОКРАЩЕННЫЕ ЮРИДИЧЕСКИЕ⠀ФОРМЫ', ''],
    ['Альтернативные учебные⠀заведения', ''],
    ['Филиалы учебных⠀заведений', ''],
    // ["Квалификации", ""],
    ['Квалификации Специальности', ''],
    ['Телефонные коды', ''],
    ['Администраторы', ''],
    ['email рассылка', ''],
    ['КАК БЫЛО КАК НАДО', ''],
    ['ПРЕФИКСЫ СЧЕТОВ', ''],
    ['БАНКИ', ''],
    ['РУБРИКАТОР', ''],
  ];
  THIRD_PANEL_TAB_TEMPLATE = (
    tabName,
    icon,
    { classes, id, tabNameClasses } = {
      classes: '',
      id: '',
      tabNameClasses: '',
    }
  ) => {
    return /*html*/ `
        <div class="third-panel__tab" ${id ? `id=${id.trim()}` : ''} data-value="${tabName}">
            ${
              icon
                ? `<span class="third-panel__tab-icon icon ads-icon in-panel ${classes}">${icon}</span>`
                : ''
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
                .navbar-top-panel {
                    background-color: #414f51;
                    color: white;
                    height: 40px;
                    display:flex;
                    justify-content: flex-end;
                    align-items: center;
                    .icon {
                    font-size: 25px;
                    padding-right: 1.5px;
                    }
                    a {
                      font-size: 18px;
                      color: white;
                      text-decoration: none;
                      cursor: pointer;
                      display: flex;
                      align-items: flex-end;
                      
                    }
                }
                navbar-elem{
                    width: 100%;
                }
                .panels__panel {
                    box-sizing: border-box;
                    width: 100%;
                    display: grid;
                    grid-template-columns: repeat(9, 1fr);
                    height: min-content;
                    
                    justify-items: center;
                }
                #navbar {
                    display: flex;
                    flex-direction: column;
                }
                .second-panel__tab {
                    display: flex;
                    width: 100%;
                    flex: 1;
                    justify-content: center;
                    height: 60px;
                    box-sizing: border-box;
                    font-size: 20px;
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
                    background-color: var(--blue);
                    align-items: start;
                    padding: 25px 10px 20px 10px;
                }
                
                .third-panel__tab {
                  padding: 0px 4px;
                    box-sizing: border-box;
                    font-weight: 100;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                }
                .third-panel__tab_active{
                    color: var(--yellow);
                    font-weight: 600;
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
                        font-weight: 600;
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
                        height: 50px;
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
                        font-size: 15px;
                    }
                    .third-panel__tab-text {
                        font-size: 15px;
                    }
                }
            </style>
        `;
    this.innerHTML = /*html*/ `
        ${STYLE}
            <div class="navbar-top-panel">
                <a href="#" class="navbar-top__link"><span class="icon"></span><span>Войти</span></a>
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
                        <p>Ключи Пароли</p>
                    </div>
                    <div class="tab second-panel__tab">
                        <p>Разное</p>
                    </div>
                </div>

                <div class="third-panel journals panels__panel">
                    ${(() => {
                      let markup = '';
                      for (const tab of this.THRID_PANEL_TABS.slice(0, 8)) {
                        if (tab[0] == 'вакансии объед') {
                          markup += this.THIRD_PANEL_TAB_TEMPLATE(tab[0], tab[1], {
                            tabNameClasses: 'no-white',
                          });
                          continue;
                        }
                        markup += this.THIRD_PANEL_TAB_TEMPLATE(tab[0], tab[1]);
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
                          let markup = '';
                          for (const [index, tab] of this.THRID_PANEL_TABS.slice(8).entries()) {
                            if (index == 8) {
                              markup += `<div class="third-panel__tab more"></div>`;
                            }
                            markup += this.THIRD_PANEL_TAB_TEMPLATE(tab[0], tab[1]);
                          }
                          return markup;
                        })()}
                    </div>
                </div>
            </div>
        `;
  }

  setup() {
    this.querySelectorAll('.second-panel__tab').forEach((el) => {
      this.querySelectorAll('.third-panel__tab').forEach((el) => {
        el.offsetWidth > 150 ? el.classList.add('panel__tab_long') : undefined;
        el.classList.remove('third-panel__tab_active');
        if (el.innerHTML.includes('Альтернативные')) {
          el.classList.add('third-panel__tab_active');
        }
      });
      el.addEventListener('click', () => {
        if (el.getAttribute('id') == 'journals_tab') {
          thirdPanel.setAttribute('style', 'display:grid;');
          this.querySelectorAll('.third-panel__tab').forEach((el) => {
            el.classList.remove('third-panel__tab_active');
            if (el.innerHTML.includes('Альтернативные')) {
              el.classList.add('third-panel__tab_active');
            }
          });
        } else {
          thirdPanel.setAttribute('style', 'display:none;');
        }
        el.classList.add('tab_active');
      });
      document.addEventListener('click', (event) => {
        const isAnotherTabClicked = Array.from(
          document.querySelectorAll('.second-panel__tab')
        ).filter((el) => {
          return el.contains(event.target);
        }).length;

        if (!el.contains(event.target) && isAnotherTabClicked) {
          el.classList.remove('tab_active');
        }
      });
    });

    const moreTab = this.querySelector('.third-panel__tab.more');
    moreTab.onclick = () => {
      this.querySelectorAll('.second-panel__tab').forEach((el) => {
        this.querySelectorAll('.third-panel__tab').forEach((el) => {
          el.offsetWidth > 162 ? el.classList.add('panel__tab_long') : undefined;

          const otherTabs = this.querySelector('.other-tabs');
          if (otherTabs.classList.contains('other-tabs_active')) {
            otherTabs.classList.remove('other-tabs_active');
            moreTab.querySelector('p').querySelector('span.icon').classList.add('reversed');
          } else {
            otherTabs.classList.add('other-tabs_active');
            moreTab.querySelector('p').querySelector('span.icon').classList.remove('reversed');
          }
        });
      });
    };

    this.querySelectorAll('.third-panel__tab:not(.more)').forEach((el, index) => {
      el.onclick = (event) => {
        this.querySelectorAll('.third-panel__tab').forEach((el) => {
          el.classList.remove('third-panel__tab_active');
        });
        el.classList.add('third-panel__tab_active');
      };
      // if (index == 1) {
      //   el.classList.add("third-panel__tab_active");
      // }
    });
    document.querySelector('.icon.burger').onclick = () => {
      const menu = document.querySelector('#navbar');
      if (menu.classList.contains('mobile-menu-wrapper_active')) {
        menu.classList.remove('mobile-menu-wrapper_active');
      } else {
        menu.classList.add('mobile-menu-wrapper_active');
      }
    };
    document.querySelector('.third-panel__tab_active').addEventListener('click', () => {
      const menu = document.querySelector('#navbar');
      menu.classList.remove('mobile-menu-wrapper_active');
    });
    document.querySelector('.tab_active').addEventListener('click', () => {
      const menu = document.querySelector('#navbar');
      menu.classList.remove('mobile-menu-wrapper_active');
    });
  }
}

customElements.define('navbar-elem', Navbar);
