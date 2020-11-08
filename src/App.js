import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import View from "@vkontakte/vkui/dist/components/View/View";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import "@vkontakte/vkui/dist/vkui.css";
import {
  PanelHeader,
  Epic,
  TabbarItem,
  Tabbar,
  Panel,
  Title,
  Group,
  Card,
  CardGrid,
} from "@vkontakte/vkui";
import Icon28HomeOutline from "@vkontakte/icons/dist/28/home_outline";
import Icon28SettingsOutline from "@vkontakte/icons/dist/28/settings_outline";
import Icon28MessageOutline from "@vkontakte/icons/dist/28/message_outline";
import Icon28UserCircleOutline from "@vkontakte/icons/dist/28/user_circle_outline";
import Conversations from "./panels/Conversations";
import Profile from "./panels/Profile";
import AdminPanel from "./panels/AdminPanel";
import ModerPanel from "./panels/ModerPanel";

import { getUsers } from "./components/Requests";

const App = () => {
  const [fetchedUser, setUser] = useState(null);
  const [modal, setModalPage] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const [isUser, setIsUser] = useState(false);
  const [state, setState] = useState("home");

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      await getUsers(user.id, setIsUser);
      setPopout(null);
    }
    fetchData();
  }, []);

  const onStoryChange = (e) => {
    setState(e.currentTarget.dataset.story);
  };

  return (
    <Epic
      activeStory={state}
      tabbar={
        <Tabbar>
          <TabbarItem
            onClick={onStoryChange}
            selected={state === "home"}
            data-story="home"
            text="Домой"
          >
            <Icon28HomeOutline />
          </TabbarItem>
          {isUser && isUser[0].status !== "null" ? (
            isUser[0].type === "1" ? (
              <TabbarItem
                onClick={onStoryChange}
                selected={state === "admin"}
                data-story="admin"
                text="Админ-панель"
              >
                <Icon28SettingsOutline />
              </TabbarItem>
            ) : null
          ) : null}
          {isUser && isUser[0].status !== "null" ? (
            isUser[0].type === "2" ? (
              <TabbarItem
                onClick={onStoryChange}
                selected={state === "moder"}
                data-story="moder"
                text="Панель старосты"
              >
                <Icon28SettingsOutline />
              </TabbarItem>
            ) : null
          ) : null}
          {isUser && isUser[0].status !== "null" ? (
            <TabbarItem
              onClick={onStoryChange}
              selected={state === "messages"}
              data-story="messages"
              text="Беседы"
            >
              <Icon28MessageOutline />
            </TabbarItem>
          ) : null}
          {isUser && isUser[0].status !== "null" ? (
            <TabbarItem
              onClick={onStoryChange}
              selected={state === "profile"}
              data-story="profile"
              text="Профиль"
            >
              <Icon28UserCircleOutline />
            </TabbarItem>
          ) : null}
        </Tabbar>
      }
    >
      <View popout={popout} id="home" activePanel="home">
        <Panel id="home">
          <PanelHeader>Домашняя страница</PanelHeader>
          {isUser && isUser[0].status !== "null" ? (
            <Group separator="hide">
              <img
                style={{
                  height: 120,
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                src="https://sun9-17.userapi.com/impg/IWj3QHJpF63JuZnGOca7Y2a_AkEYujt3r6QdMw/X06v_fLrL5c.jpg?size=842x843&quality=96&proxy=1&sign=643cf3fdfee36db4889c42035c5c3c10"
                alt=""
              />
              <br />
              <CardGrid>
                <Card size="l" mode="shadow">
                  <div>
                    <Title
                      style={{
                        marginLeft: 16,
                        marginTop: 16,
                        marginLeft: 16,
                        marginBottom: 16,
                      }}
                    >
                      Образовательный центр Easy School: <br />
                      - школа иностранных языков для детей и взрослых
                      (английский, китайский, немецкий, французский, испанский,
                      японский)
                      <br />
                      <br />
                      - центр подготовки к ЕГЭ и ОГЭ (русский язык, математика,
                      обществознание, история, физика, химия, биология,
                      литература, английский язык) <br />
                      <br />
                      - школа фотографии и дизайна от 14 лет (графический
                      дизайн, основы фотографии, портретная съёмка,
                      фотопрогулки)
                      <br />
                      <br />
                      - школа программирования от 14 лет (web программирование,
                      программирование на питон)
                      <br />
                      <br />
                      - школа робототехники от 8 до 17 лет (для школьников,
                      спортивные группы, группы электроники (Arduino), начни
                      карьеру программиста)
                      <br />
                      <br />
                      - центр раннего развития от 1 до 6 лет (раннее развитие
                      детей, маленький <br />
                      билингв, подготовка к школе, интенсивный курс раннего
                      развития, английский язык, арт-студия, красивый почерк)
                      <br />
                      <br />
                      - бизнес-школа для подростков
                      <br />
                      <br />- билингвальный детский сад от 2 до 7 лет
                      <br />
                      <br />
                      - арт-сад от 5 до 7 лет
                      <br />
                      <br />
                      - начальная школа 1-4 классы
                      <br />
                      <br />
                      www.e-a-s-y.ru
                      <br />
                      Единый телефон школ: 707- 207
                      <br />
                      Наши центры:
                      <br />- Центр - ул. Дзержинского 24а (ТЦ Альянс, 3 этаж)
                      <br />
                      - Байкальская - ул. Байкальская, 188/3 (1 этаж)
                      <br />
                      - Советская - ул. Советская, 79 (1 этаж)
                      <br />
                      - МНТК - ул. Белобородова 8/1 (цокольный этаж)
                      <br />
                      - Политех - ул. Лермонтова, 90/1 (ДЦ Лермонтов, 4 этаж)
                      <br />
                      - Академгородок - ул. Лермонтова, 331 (млад. школа 24, 2
                      этаж)
                      <br />
                      - Ново-Ленино - ул. Баумана, 233/3 (1 этаж)
                      <br />
                      - Ново-Ленино - ул. Летописца Нита Романова, 23 (школа
                      №69)
                      <br />
                      - Ангарск - 177 квартал, д.13 (1 этаж)
                      <br />
                      - Начальная школа - ул. Коммунистическая, 51
                      <br />
                      - Детский сад - ул. Звездная, 5<br />- Центры раннего
                      развития - ул. Белобородова, 8/1 (ост. Институт
                      микрохирургии глаза), ул. Байкальская, 244/5 (ост. Лисиха)
                    </Title>
                  </div>
                </Card>
              </CardGrid>
              <br />
            </Group>
          ) : (
            <Title weight="medium" style={{ marginBottom: 16 }}>
              Привет, если ты видишь этот, то тебя нет в системе! Попроси
              Администрацию EasySchool или Твоего старосту добавить тебя в
              систему
            </Title>
          )}
        </Panel>
      </View>
      <View popout={popout} id="admin" activePanel="admin" modal={modal}>
        <AdminPanel
          id="admin"
          fetchedUser={fetchedUser}
          setModal={setModalPage}
        />
      </View>
      <View popout={popout} id="moder" activePanel="moder" modal={modal}>
        <ModerPanel
          id="moder"
          fetchedUser={fetchedUser}
          setModal={setModalPage}
        />
      </View>
      <View popout={popout} id="messages" activePanel="messages" modal={modal}>
        <Conversations
          id="messages"
          fetchedUser={fetchedUser}
          setModal={setModalPage}
        />
      </View>
      <View popout={popout} id="profile" activePanel="profile">
        <Profile id="profile" fetchedUser={fetchedUser} />
      </View>
    </Epic>
  );
};

export default App;
